import $ from 'jquery';

export default class CurrencySelector {
  constructor(el) {
    this.$el = $(el);
    this.currencySelector = this.$el.find('select');

    this._bindEvents();
  }

  _bindEvents() {
    this.currencySelector.on('change', (event) => {
      this._updateCurrency(event);
    });
  }

  _updateCurrency(event) {
    let newCurrency = event.currentTarget.value;
    window.location = newCurrency;
  }
}
