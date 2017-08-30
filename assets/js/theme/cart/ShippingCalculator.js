import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';
import SelectWrapper from '../global/select-wrapper';

export default class ShippingCalculator {
  constructor(options = {}) {
    this.options = $.extend({
      $scope: $('[data-cart-totals]'),
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.options.$scope.on('click', '[data-shipping-calculator-toggle]', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.options.$scope.on('submit', '[data-shipping-calculator] form', (event) => {
      event.preventDefault();
      this._calculateShipping();
    });

    this.options.$scope.on('change', 'select[name="shipping-country"]', (event) => {
      this._updateStates(event);
    });
  }

  _toggle() {
    $('[data-shipping-calculator]', this.options.$scope).toggleClass(this.options.visibleClass);
  }

  _updateStates(event) {
    const $target = $(event.currentTarget);
    const country = $target.val();
    const $stateInputWrap = $('[name="shipping-state"]').closest('.form-field-control');

    utils.api.country.getByName(country, (err, response) => {
      if (response.data.states.length) {

        const stateArray = [];
        stateArray.push(`<option value="">${response.data.prefix}</option>`);
        $.each(response.data.states, (i, state) => {
          stateArray.push(`<option value="${state.id}">${state.name}</option>`);
        });

        $stateInputWrap.html(`
          <span class="form-select-wrapper">
            <select class="form-select" id="shipping-state" name="shipping-state" data-field-type="State">
              ${stateArray.join(' ')}
            </select>
          </span>
        `);

        new SelectWrapper($stateInputWrap.find('select'));
      } else {
        $stateInputWrap.html('<input class="form-input" type="text" id="shipping-state" name="shipping-state" data-field-type="State">');
      }
    });
  }

  _calculateShipping() {
    this.callbacks.willUpdate();

    const params = {
      country_id: $('[name="shipping-country"]', this.options.$scope).val(),
      state_id: $('[name="shipping-state"]', this.options.$scope).val(),
      zip_code: $('[name="shipping-zip"]', this.options.$scope).val(),
    };

    utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
      const $shippingQuotes = $('[data-shipping-quotes]', this.options.$scope);
      this.shippingAlerts = new Alert($('[data-shipping-errors]'));
      if (response.data.quotes) {
        this.shippingAlerts.clear();
        $shippingQuotes.html(response.content);
      } else {
        $shippingQuotes.empty();
        this.shippingAlerts.clear();
        this.shippingAlerts.error(response.data.errors.join('\n'), true);
      }

      this.callbacks.didUpdate();

      // bind the select button
      $shippingQuotes.find('.button').on('click', (event) => {
        event.preventDefault();

        this.callbacks.willUpdate();

        const quoteId = $('[data-shipping-quote]:checked').val();

        utils.api.cart.submitShippingQuote(quoteId, (response) => {
          refreshContent(this.callbacks.didUpdate);
        });
      });
    });
  }
}
