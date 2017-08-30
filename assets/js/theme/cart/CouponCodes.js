import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class CouponCodes {
  constructor(options) {
    this.options = $.extend({
      $scope: $('[data-cart-totals]'),
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.couponAlerts = new Alert($('[data-coupon-errors]', this.$scope));

    this._bindEvents();
  }

  _bindEvents() {
    this.options.$scope.on('submit', '[data-coupon-code-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  _addCode() {
    const $input = $('[data-coupon-code-input]', this.options.$scope);
    const code = $input.val();

    this.couponAlerts.clear();
    this.callbacks.willUpdate();

    if (!code) {
      this.couponAlerts.error(this.options.context.couponCodeEmptyInput, true);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyCode(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.couponAlerts.error(response.data.errors.join('\n'), true);
        this.callbacks.didUpdate();
      }
    });
  }
}
