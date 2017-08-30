import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import Tabs from 'bc-tabs';
import Loading from 'bc-loading';
import Alert from '../components/Alert';
import 'vanilla-fitvids/jquery.fitvids'

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.productId = this.$el.find('[data-product-id]').val();
    this.$productDetails = this.$el.find('[data-product-details]');

    this.options = $.extend({
      tabSelector: '.product-tab-link',
      tabDropdown: '.product-tabs-select'
    }, options);

    const loadingOptions = {
      loadingMarkup: '<div class="loading"></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    this.loader = new Loading(loadingOptions, true, this.$productDetails);

    // class to add or remove from cart-add button depending on variation availability
    this.buttonDisabledClass = 'disabled';

    // two alert locations based on action
    this.cartAddAlert = new Alert(this.$el.find('[data-product-cart-message]'));
    this.cartOptionAlert = new Alert(this.$el.find('[data-product-option-message]'));

    // review alerts
    this.reviewAlert = new Alert(this.$el.find('[data-review-messages]'));

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
      switchImage: () => console.log('Image switch attempted.'),
    }, options.callbacks);

    this.fitVidsInitialized = false;

    this.tabs = new Tabs({
      moduleSelector: this.$el.find('[data-tabs]'),
      titleSelector: this.$el.find('.product-tab-title'),
      afterSetup: (tabId) => {
        this._initVids(tabId);
      },
      afterChange: (tabId) => {
        this._initVids(tabId);
      },
    });

    this._bindEvents();
  }

  init(context) {
    this.context = context;

    this._updateAttributes(window.BCData.product_attributes);

    this._bindProductOptionChange();
    this._bindCartAdd();

    if (this.$el.hasClass('single-product')) {
      // run initial attr update if we're on a single product page
      this._updateAttributes(window.BCData.product_attributes);
    } else {
      // otherwise emit our option change event (this happens in the quickshop)
      utils.hooks.emit('product-option-change');
    }
    // Trigger the event emitter once in case the original variant is not available
    $('[data-product-option-change]').trigger('change');

    this.$el.on('click', '[data-button-purchase]', (event) => {
      const $quantityInput = $('[name="qty[]"]', this.$el);
      if($quantityInput.length && parseInt($quantityInput.val(), 10) === 0){
        event.preventDefault();
      }
    });
  }

  _bindEvents() {
    this.$el.on('click', this.options.tabSelector, (event) => {
      event.preventDefault();
      this.tabs.displayTabContent($(event.currentTarget).attr('href'));
    });

    this.$el.on('change', this.options.tabDropdown, (event) => {
      event.preventDefault();
      this.tabs.displayTabContent($(event.currentTarget).find("option:selected").val());
    });

    this.$el.on('click', '[data-product-quantity-change]', (event) => {
      this._updateQuantity(event);
    });

    this.$el.on('click', '.product-bulk-pricing-toggle', (event) => {
      event.preventDefault();
      this._toggleBulkPricing(event);
    });

    this.$el.find(this.options.tabDropdown).click();
  }

  _getViewModel($el) {
    return {
      $price: $('[data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('[data-product-price-wrapper="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
      $imagePreview: $('[data-variation-preview]', $el)
    }
  }

  _updateQuantity(event) {
    const $target = $(event.currentTarget);
    const $quantity = $target.closest('[data-product-quantity]').find('[data-product-quantity-input]');
    const min = parseInt($quantity.prop('min'), 10);
    const max = parseInt($quantity.prop('max'), 10);
    let newQuantity = parseInt($quantity.val(), 10);

    this.cartAddAlert.clear();
    this.cartOptionAlert.clear();

    if ($target.is('[data-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    $quantity.val(newQuantity);
  }

  /**
   * Bind product options changes.
   */
  _bindProductOptionChange() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = $changedOption.parents('form');

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        const viewModel = this._getViewModel(this.$el);
        const data = response ? response.data : {};

        this._updateAttributes(data);

        // If our form data doesn't include the product-options-count with a positive value, return
        if (!$form.data('product-options-count') && !$form.data('product-options-count')) {
          return;
        }

        this.cartAddAlert.clear();

        // updating price
        if (viewModel.$price.length) {
          const priceStrings = {
            price: data.price,
            excludingTax: this.context.productExcludingTax,
          };
          viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
        }

        if (viewModel.$priceWithTax.length) {
          const priceStrings = {
            price: data.price,
            includingTax: this.context.productIncludingTax,
          };
          viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
        }

        if (viewModel.$saved.length) {
          const priceStrings = {
            price: data.price,
            savedString: '',
          };

          if(data.price.saved){
            priceStrings.savedString = this.context.productYouSave.replace('{amount}', data.price.saved.formatted);
          }

          viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
        }

        // update sku if exists
        if (viewModel.$sku.length) {
          viewModel.$sku.html(data.sku);
        }

        // update weight if exists
        if (viewModel.$weight.length) {
          viewModel.$weight.html(data.weight.formatted);
        }

        // handle product variant image if exists
        if (data.image) {
          const mainImageUrl = utils.tools.image.getSrc(
            data.image.data,
            this.context.themeImageSizes.large
          );

          const thumbImageUrl = utils.tools.image.getSrc(
            data.image.data,
            this.context.themeImageSizes.thumbnail
          );

          this.callbacks.switchImage(mainImageUrl, thumbImageUrl, data.image.alt);
        }

        this.cartOptionAlert.clear();

        // update submit button state
        if (!data.purchasable || !data.instock) {
          this.cartOptionAlert.error(data.purchasing_message, true);
          viewModel.$addToCart
            .addClass(this.buttonDisabledClass)
            .prop('disabled', true);
        } else {
          viewModel.$addToCart
            .removeClass(this.buttonDisabledClass)
            .prop('disabled', false);
        }
      });
    });
  }

  /**
   * Add a product to cart
   */
  _bindCartAdd() {
    utils.hooks.on('cart-item-add', (event, form) => {
      // Do not do AJAX if browser doesn't support FormData
      if (window.FormData === undefined) { return; }

      // Make sure we don't fire this twice when we're in a quick-view
      const productId = $(form).find('[data-product-id]').val();

      if (this.productId !== productId) { return; }

      event.preventDefault();

      this.loader.show();
      this.callbacks.willUpdate($(form));

      // Add item to cart
      utils.api.cart.itemAdd(new FormData(form), (err, response) => {
        let isError = false;

        if (err || response.data.error) {
          isError = true;
          response = err || response.data.error;
        }

        this._updateMessage(isError, response);
        this.callbacks.didUpdate(isError, response, $(form));
      });
    });
  }

  /**
   * interpret and display cart-add response message
   */
  _updateMessage(isError, response) {
    let message = '';

    if (isError) {
      message = response;
    } else {
      message = this.context.addSuccess;
      // message = message.replace('*product*', this.$el.find('[data-product-details]').data('product-title'));
      message = message
                  .replace('*product*', this.$el.find('[data-product-details]').data('product-title'))
                  .replace('*cart_link*', `<a href=${this.context.urlsCart}>${this.context.cartLink}</a>`)
                  .replace('*continue_link*', `<a href='/'>${this.context.homeLink}</a>`)
                  .replace('*checkout_link*', `<a href=${this.context.urlsCheckout}>${this.context.checkoutLink}</a>`)
                  ;
    }

    this.cartAddAlert.message(message, (isError ? 'error' : 'success'), true);

    this.loader.hide();
  }

  _updateAttributes(data) {
    if (data === undefined) { return; }

    const behavior = data.out_of_stock_behavior;
    const inStockIds = data.in_stock_attributes;
    const outOfStockMessage = ` (${data.out_of_stock_message})`;

    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }

    $('[data-product-attribute-value]', this.$el).each((i, attribute) => {
      const $attribute = $(attribute);
      const attrId = parseInt($attribute.data('product-attribute-value'), 10);

      if (inStockIds.indexOf(attrId) !== -1) {
        this._enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        this._disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }

  _disableAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.attr('disabled', 'disabled').hide();
    } else {
      if (this._getAttributeType($attribute) === 'set-select') {
        $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
      } else {
        $attribute.addClass('option-unavailable');
      }
    }
  }

  _enableAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.removeAttr('disabled').show();
    } else {
      if (this._getAttributeType($attribute) === 'set-select') {
        $attribute.html($attribute.html().replace(outOfStockMessage, ''));
      } else {
        $attribute.removeClass('option-unavailable');
      }
    }
  }

  _getAttributeType($attribute) {
    const $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  // Toggle bulk pricing
  _toggleBulkPricing() {
    $('.product-bulk-pricing-modal').revealer();
  }

  // if page loads with tabs hidden, we need to wait until the proper tab is clicked before running fitVids.
  _initVids(tabId) {
    if (tabId === '#videos' && !this.fitVidsInitialized) {
      $('.product-video-wrapper').fitVids();
      this.fitVidsInitialized = true;
    }
  }
}
