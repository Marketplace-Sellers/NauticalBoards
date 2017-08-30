import $ from 'jquery';
import PageManager from '../PageManager';
import CartUtils from './cart/CartUtils';
import ShippingCalculator from './cart/ShippingCalculator';
import CouponCodes from './cart/CouponCodes';
import GiftCertificates from './cart/GiftCertificates';
import GiftWrapping from './cart/GiftWrapping';
import Loading from 'bc-loading';
import QuantityWidget from './components/QuantityWidget';


export default class Cart extends PageManager {
  loaded(next) {
    const context = this.context;
    new QuantityWidget({scope: $('[data-cart-content]')});

    const loadingOptions = {
      loadingMarkup: '<div class="loading"></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    this.loader = new Loading(loadingOptions, true, $('.main-content'));

    new GiftWrapping({scope: '[data-cart-content]', context});
    const cartContentOverlay = new Loading(loadingOptions, true, '[data-cart-content]');
    const cartTotalsOverlay = new Loading(loadingOptions, true, '[data-cart-totals]');

    this.ShippingCalculator = new ShippingCalculator({
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => {
          this.loader.show();
        },
        didUpdate: () => {
          this.loader.hide();
        },
      },
    });

    this.CouponCodes = new CouponCodes({
      context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => {
          this.loader.show();
        },
        didUpdate: () => {
          this.loader.hide();
        },
      },
    });

    this.GiftCertificates = new GiftCertificates({
      context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => {
          this.loader.show();
        },
        didUpdate: () => {
          this.loader.hide();
        },
      },
    });

    this.CartUtils = new CartUtils({
      callbacks: {
        willUpdate: () => {
          this.loader.show();
        },
        didUpdate: () => {
          this.loader.hide();
        },
      },
    });

    // brute-force apple-pay bodyclass in local environment
    if (window.ApplePaySession && $('.dev-environment').length) {
      $(document.body).addClass('apple-pay-supported');
    }
    next();
  }
}
