import $ from 'jquery';
import initAlertDismissable from './alertDismissable';
import initDownloadGallery from './downloadGallery';
import updateState from './updateState';

export default class Account {
  constructor() {
    this._bindEvents();
  }

  _bindEvents() {
    initAlertDismissable();
    initDownloadGallery();

    updateState(false, this.selectWrapCallback);

    // Toggle - a simple way to toggle elements
    $(document.body).on('click', '[data-account-toggle]', (event) => {
      const $el = $(event.currentTarget);
      const $target = $($el.data('account-toggle'));
      $target.toggle();
    });
  }

  /**
   * Optional callback fired when a fresh state <select> element is added to the DOM
   */
  selectWrapCallback($selectEl) {} //eslint-disable-line no-unused-vars

  // backwards compatibility for Page Manager
  loaded() {}
  before() {}
  after() {}
}
