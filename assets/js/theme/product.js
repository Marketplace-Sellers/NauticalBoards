import $ from 'jquery';
import baguetteBox from 'baguettebox.js';
import PageManager from '../PageManager';
import Alert from './components/Alert';
import ProductUtils from './product/ProductUtils';
import QuantityWidget from './components/QuantityWidget';
import productViewTemplates from './product/productViewTemplates';
import ProductReviews from './product/reviews';
import ProductImageSwitcher from './product/product-image-switcher';
import VariationImage from './product/variationImage';

export default class Product extends PageManager {
  constructor() {
    super();

    this.el = '[data-product-container]';
    this.$el = $(this.el);

    this.productImages = this.$el.find('.product-images');
  }

  loaded() {
    new QuantityWidget({
      scope: $('[data-cart-item-add]', this.$el),
      context: this.context,
    });

    new ProductReviews(this.context);

    this.ProductUtils = new ProductUtils(this.el, {
      priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
      priceWithTaxTemplate: productViewTemplates.priceWithTax,
      priceSavedTemplate: productViewTemplates.priceSaved,
      tabSelector: '.tab-link',
      callbacks: {
        didUpdate: (isError, response) => {},
        willUpdate: (isError, response) => {},
        switchImage: VariationImage,
      },
    }).init(this.context);

    new ProductImageSwitcher(this.productImages);

    $(document.body).on('click', '[data-toggle-extra-reviews]', (event) => {
      this._toggleExtraReviews(event);
    });

    baguetteBox.run('.product-main-image');
  }

  // show/hide reviews beyond the ones initially visible
  _toggleExtraReviews(event) {
    const $button = $(event.currentTarget);
    const buttonText = $button.text();
    const toggleText = $button.data('toggle-text');

    $('.reviews').toggleClass('all-reviews-visible');

    $button
      .text(toggleText)
      .data('toggle-text', buttonText);
  }
}
