import $ from 'jquery';

/*
 * Prepends a span containing the currently selected text value to matching select elements
 * and updates that span's text on input change.
 *
 * Requires for the <select> to have a direct parent .form-select-wrapper element.
 */
export default class SelectWrapper {
  constructor(el) {
    this.$el = $(el);
    this.$parent = this.$el.parent('.form-select-wrapper');
    this.$prefix = this.$parent.data('selected-prefix');

    // only run if wrapper is in place AND it's not the currency selector
    if (this.$parent.length) {
      this._init();
    } else {
      this._bindEvents();
    }
  }

  _init() {
    if(!this.$el.prev('.form-selected-text').length){
      let $selected = this.$el.find('option:selected').text();
      const $prefix = this._getPrefix();

      if(!$selected){
        $selected = this.$el.find('option:first').text();
      }

      this.$el.before(`<span class="form-selected-text">${$prefix}${$selected}</span>`);

    } else {
      const text = this.$el.prev('.form-selected-text').text();
      this._setText(text);
    }

    this._bindEvents();
  }

  _getPrefix(){
    return (this.$prefix ? `<span class="form-selected-text-prefix">${this.$prefix}</span>` : '');
  }

  _setText(text){
    const $prefix = this._getPrefix();
    this.$el.siblings('.form-selected-text').html($prefix + text);
  }

  _bindEvents() {
    this.$el.on('change', () => {
      this.updateSelectText();
    });

    this.$el.on('focus', (event) => {
      this.$parent.addClass('is-focused');
    });

    this.$el.on('blur', (event) => {
      this.$parent.removeClass('is-focused');
    });
  }

  updateSelectText(option) {
    const newOption = option ? option : this.$el.find('option:selected').text();
    this._setText(newOption);
  }
}
