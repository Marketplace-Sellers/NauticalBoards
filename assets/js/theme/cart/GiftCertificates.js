import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class GiftCertificates {
  constructor(options) {
    this.options = $.extend({
      $scope: $('[data-cart-totals]'),
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.certificateAlerts = new Alert($('[data-gift-certificate-errors]', this.options.$scope));

    this._bindEvents();
  }

  _bindEvents() {
    this.options.$scope.on('click', '[data-gift-certificate-toggle]', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.options.$scope.on('submit', '[data-gift-certificate-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  // Todo: remove toggle if it is truly gone!
  _toggle() {
    $('[data-gift-certificate-form]', this.options.$scope).toggleClass(this.options.visibleClass);
  }

  _addCode() {
    const $input = $('[data-gift-certificate-input]', this.options.$scope);
    const code = $input.val();

    this.callbacks.willUpdate();

    if (! this._isValidCode(code)) {
      this.certificateAlerts.error(this.options.context.giftCertificateInputEmpty);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyGiftCertificate(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.certificateAlerts.error(response.data.errors.join('\n'));
        this.callbacks.didUpdate();
      }
    });
  }

  _isValidCode(code) {
    if (typeof code !== 'string') {
      return false;
    }

    return /^[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/.exec(code);
  }
}
