import 'babel-polyfill';
import $ from 'jquery';
import async from 'async';
import account from './theme/account';
import auth from './theme/auth';
import blog from './theme/blog';
import brand from './theme/brand';
import cart from './theme/Cart';
import category from './theme/category';
import contactUs from './theme/contact-us';
import compare from './theme/compare';
import errors from './theme/errors';
import giftCertificate from './theme/gift-certificate';
import global from './theme/global';
import home from './theme/home';
import orderComplete from './theme/order-complete';
import page from './theme/page';
import product from './theme/product';
import search from './theme/search';
import sitemap from './theme/sitemap';
import subscribe from './theme/subscribe';
import wishlist from './theme/wishlist';

let PageClasses = {
  mapping: {
    'pages/account/orders/all': account,
    'pages/account/orders/details': account,
    'pages/account/addresses': account,
    'pages/account/add-address': account,
    'pages/account/add-return': account,
    'pages/account/add-wishlist': wishlist,
    'pages/account/recent-items': account,
    'pages/account/download-item': account,
    'pages/account/edit': account,
    'pages/account/inbox': account,
    'pages/account/return-saved': account,
    'pages/account/returns': account,
    'pages/auth/login': auth,
    'pages/auth/account-created': auth,
    'pages/auth/create-account': auth,
    'pages/auth/new-password': auth,
    'pages/auth/forgot-password': auth,
    'pages/blog': blog,
    'pages/blog-post': blog,
    'pages/brand': brand,
    'pages/brands': brand,
    'pages/cart': cart,
    'pages/contact-us': contactUs,
    'pages/category': category,
    'pages/compare': compare,
    "pages/errors/403": errors,
    "pages/errors/404": errors,
    "pages/errors/500": errors,
    'pages/gift-certificate/purchase': giftCertificate,
    'pages/gift-certificate/balance': giftCertificate,
    'pages/gift-certificate/redeem': giftCertificate,
    'global': global,
    'pages/home': home,
    'pages/order-complete': orderComplete,
    'pages/page': page,
    'pages/product': product,
    'pages/search': search,
    'pages/sitemap': sitemap,
    'pages/subscribed': subscribe,
    'pages/account/wishlist-details': wishlist,
    'pages/account/wishlists': wishlist
  },
  /**
   * Getter method to ensure a good page type is accessed.
   * @param page
   * @returns {*}
   */
  get: function(page) {
    if (this.mapping[page]) {
      return this.mapping[page];
    }
    return false;
  }
};

/**
 *
 * @param {Object} pageObj
 */
function series(pageObj) {
  async.series([
    pageObj.before.bind(pageObj), // Executed first after constructor()
    pageObj.loaded.bind(pageObj), // Main module logic
    pageObj.after.bind(pageObj) // Clean up method that can be overridden for cleanup.
  ], function(err) {
    if (err) {
      throw new Error(err);
    }
  });
}

/**
 * Loads the global module that gets executed on every page load.
 * Code that you want to run on every page goes in the global module.
 * @param {object} pages
 * @returns {*}
 */
function loadGlobal(pages) {
  let Global = pages.get('global');

  return new Global;
}

/**
 *
 * @param {function} pageFunc
 * @param {} pages
 */
function loader(pageFunc, pages) {
  if (pages.get('global')) {
    let globalPageManager = loadGlobal(pages);
    globalPageManager.context = pageFunc.context;

    series(globalPageManager);
  }
  series(pageFunc);
}

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param templateFile String
 * @param context
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(templateFile, context) {
  let pages = PageClasses;

  context = context || '{}';
  context = JSON.parse(context);

  return {
    load() {
      $(() => {

        // manually attach jQuery to window object
        window.$ = $;

        let PageTypeFn = pages.get(templateFile); // Finds the appropriate module from the pageType object and store the result as a function.
        if (PageTypeFn) {
          let pageType = new PageTypeFn();
          pageType.context = context;
          return loader(pageType, pages);
        }
        throw new Error(templateFile + ' Module not found');
      });
    }
  };
};
