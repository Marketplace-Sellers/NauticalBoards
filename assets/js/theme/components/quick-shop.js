import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import baguetteBox from 'baguettebox.js';
import ProductUtils from '../product/ProductUtils';
import productViewTemplates from '../product/productViewTemplates';
import QuantityWidget from './QuantityWidget';
import SelectWrapper from '../global/select-wrapper';
import Modal from 'bc-modal';
import ProductImageSwitcher from '../product/product-image-switcher';
import VariationImage from '../product/variationImage';
import imagesLoaded from 'imagesloaded';

export default class QuickShop {
  constructor(context) {
    this.context = context;
    this.product;
    this.id = null;
    this.spinner = $('<span class="loading"></span>');

    this.QuickShopModal = new Modal({
      el: $('<div id="quick-shop-modal">'),
      modalClass: 'quick-shop-modal',
      afterShow: ($modal) => {
        this._modalLoadingState($modal);
        this._fetchProduct($modal, this.id);
      },
    });

    this._bindEvents();
  }

  /**
   * Show spinner
   */
  _modalLoadingState($modal) {
    $modal.append(this.spinner);
  }

  /**
   * Launch quickshop modal on click and set up id variable
   */
  _bindEvents() {
    $('body').on('click', '[data-quick-shop]', (event) => {
      event.preventDefault();
      this.id = $(event.currentTarget).data('product-id');

      if (!this.id) { return; }

      this.QuickShopModal.open();
    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {integer} id - product id
   */
  _fetchProduct($modal, id) {
    utils.api.product.getById(id, { template: 'products/quick-shop' }, (err, response) => {
      $modal.find('.modal-content').append(response);

      // set up product utils (adding to cart, options)
      this.product = new ProductUtils($modal.find('[data-quick-shop-product]'), {
        priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
        priceWithTaxTemplate: productViewTemplates.priceWithTax,
        priceSavedTemplate: productViewTemplates.priceSaved,
        callbacks: {
          didUpdate: (isError, response) => {},
          willUpdate: (isError, response) => {},
          switchImage: VariationImage,
        },
      });

      this.product.init(this.context);

      const $select = $modal.find('select');
      if ($select.length) {
        $select.each((i, el) => {
          new SelectWrapper(el);
        });
      }

      imagesLoaded($modal[0], () => {
        this.QuickShopModal.position();
        new ProductImageSwitcher($modal);
        new QuantityWidget({scope: $modal});
        $modal.addClass('loaded');
        baguetteBox.run('.product-main-image');
      });

    });
  }
}
