import $ from 'jquery';
import 'jquery-trend';
import 'jquery-revealer';

import PageManager from '../pageManager';
import quickSearch from './global/quick-search';
import CurrencySelector from './global/currency-selector';
import Navigation from './global/site-navigation';
import headerTools from './global/header-tools';
import ProductImageSwitcher from './product/product-image-switcher';
import SelectWrapper from './global/select-wrapper';
import initFormSwatchFields from './core/formSelectedValue';
import CartPreview from './global/cart-preview';
import QuickShop from './components/quick-shop';
import initAlertDismissable from './core/alertDismissable';

// global scope jQuery plugins
/* eslint-disable no-unused-vars */
import validetta from 'validetta';
import imagesLoaded from 'imagesloaded';

export default class Global extends PageManager {
  constructor() {
    super();

    this.navigation = new Navigation();
    this.headerTools = new headerTools();
    new CurrencySelector($('.currency-selector-wrapper'));

    const $select = $('select');
    if ($select.length) {
      $select.each((i, el) => {
        new SelectWrapper(el);
      });
    }
  }

  /**
  * You can wrap the execution in this method with an asynchronous function map using the async library
  * if your global modules need async callback handling.
  * @param next
  */
  loaded(next) {
    initFormSwatchFields();
    initAlertDismissable();
    quickSearch();
    new CartPreview();

    if ($('[data-quick-shop]').length) {
      new QuickShop(this.context);
    }
    next();
  }
}
