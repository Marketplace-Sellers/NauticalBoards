import $ from 'jquery';
import _ from 'lodash';

export default class headerTools {
  constructor() {
    this.$body = $(document.body);
    this.$el = $('.header-tools');
    this.$header = this.$body.find('.main-header');
    this.$searchToggle = $('.search-toggle');
    this.$searchForm = $('.search-form-wrapper');
    this.$searchClose = $('.search-close');
    this.$searchToggle = $('.search-toggle');
    this.$searchInput = $('.search-input');
    this.$shoppingTools = $('.shopping-tools');
    this.$shoppingTools.revealer('show', true);
    this.$cartTrigger = $('.cart-preview-trigger');
    this.$cartPreviewWrap = $('.cart-preview-wrap');
    this.$mainHeader = $('.main-header');
    this.$navMenu = this.$header.find('.nav-menu');

    this._bindEvents();
  }

  _bindEvents() {
    this.$searchToggle.on('click', (e) => {
      this._showSearchForm();
    });

    this.$searchClose.on('click', (e) => {
      this._hideSearchForm();
    });

    this.$cartTrigger.on('click', (e) => {
      this._toggleCartPreview(e);
    });

    this.$body.on('keyup', (e) => {
      if (e.keyCode == 27) {
        this._hideCartPreview();
      }
    });

    this.$shoppingTools.on('click', (e) => {
      e.stopPropagation();
    });

    this.$body.on('click', () => {
      this._hideCartPreview();
    });

    $(window).on('resize', _.debounce(this._moveHeaderToolsUp.bind(this), 200));
    this._moveHeaderToolsUp();
  }

  _showSearchForm() {
    let leftPosition;

    if (this.$mainHeader.hasClass('expanded-nav') &&
        this.$mainHeader.hasClass('logo-right')) {
        if (this.$searchForm.hasClass('account-links-enabled')) {
          leftPosition = this.$searchToggle[0].getBoundingClientRect().left - 240;
        } else {
          leftPosition = this.$searchToggle[0].getBoundingClientRect().left - 10;
        }

        this.$searchForm.css('left', leftPosition);
    }

    this.$searchForm.revealer('show');
    this.$shoppingTools.revealer('hide');
  }

  _hideSearchForm() {
    this.$searchForm.revealer('hide');
    this.$shoppingTools.revealer('show');
  }

  _toggleCartPreview(e) {
    if (this.$searchToggle.is(':visible')) {
      e.preventDefault();
      this.$cartTrigger.toggleClass('active');
      this.$cartPreviewWrap.revealer();
    }
  }

  _hideCartPreview(e) {
    if ($(window).width() >= 760) {
      this.$cartTrigger.removeClass('active');
      this.$cartPreviewWrap.revealer('hide');
    }
  }

  _moveHeaderToolsUp() {
    // if shopping tools overlap the menu put it on the top line at all screen sizes

    const $window = $(window);
    // used scrollWidth because there is potential for overflow in the main nav
    const navRightOffset = ($window.width() - (this.$navMenu.offset().left + this.$navMenu[0].scrollWidth));
    const shoppingToolsWidth = this.$shoppingTools.width();

    if (shoppingToolsWidth > navRightOffset) {
      this.$header.addClass('shopping-tools-top');
     } else {
      this.$header.removeClass('shopping-tools-top');
    }
  }
}
