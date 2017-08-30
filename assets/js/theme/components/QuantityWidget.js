import $ from 'jquery';
import Alert from '../components/Alert';

export default class QuantityWidget {
  constructor(options = {}) {
    this.options = $.extend({
      el: '[data-quantity-control]',
      cntrl: '[data-quantity-control-action]',
      scope: $('body'),
      context: {},
    }, options);

    this.context = this.options.context;

    // Bind Control Actions
    this.options.scope.on('click', this.options.cntrl, (event) => {
      event.preventDefault(); //in case we use <button>/<a> instead of <span>'s
      const $target = $(event.target);
      const action = $target.data('quantity-control-action');

      const $quantityInput = $target.siblings('input');
      const min = $quantityInput.attr('min') ? parseInt($quantityInput.attr('min'),10) : 0;
      const max = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'),10) : Infinity;
      const baseValue = (!isNaN(parseInt($quantityInput.val(), 10)) ? parseInt($quantityInput.val(), 10) : 0);
      const value = (baseValue < min ? min : baseValue);

      if (action === 'increment' && value < max) {
        $quantityInput.val(value + 1).trigger('change');
      } else if (action === 'decrement' && value > 0 && value > min) {
        $quantityInput.val(value - 1).trigger('change');
      }
    });

    // Simple input validation (keep input within min/max range)
    // Feel free to remove and replace with another form of validation
    this.options.scope.on('change', 'input', (event) => {
      const $target = $(event.target);
      const value = parseInt($target.val(),10);
      const min = $target.attr('min') ? parseInt($target.attr('min'),10) : 1;
      const max = $target.attr('max') ? parseInt($target.attr('max'),10) : Infinity;

      if (value > max) {
        const errorMessage = this.context.quantityAlertMoreThan.replace('{value}', value).replace('{max}', max);
        console.log(errorMessage);
        $target.val($target.attr('value'));
      } if (value < min) {
        const errorMessage = this.context.quantityAlertLessThan.replace('{value}', value).replace('{min}', min);
        console.log(errorMessage);
        $target.val($target.attr('value'));
      }
    });
  }
}
