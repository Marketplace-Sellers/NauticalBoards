import { hooks, api } from '@bigcommerce/stencil-utils';
import $ from 'jquery';
import Url from 'url';
import 'history.js/scripts/bundled-uncompressed/html4+html5/jquery.history';

export default class FacetedSearch {
  constructor(options, overlayCallbacks, callback) {
    this.callback = callback;
    this.$body = $(document.body);

    this.options = $.extend({
      config: {
        category: {
          shop_by_price: true
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      filterToggle: '[data-facet-toggle]',
      moreToggle: '[data-facet-more]',
    }, options);

    this.overlayCallbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, overlayCallbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$body.on('click', this.options.filterToggle, (event) => {
      this._toggleFilter(event);
    });

    this.$body.on('click', this.options.moreToggle, (event) => {
      this._showAdditionalFilters(event);
    });

    $(window).on('statechange', this._onStateChange.bind(this));
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }

  _showAdditionalFilters(event) {
    event.preventDefault();

    const $toggle = $(event.currentTarget);
    const facet = $toggle.find('button').data('additional-facets');
    const $navList = $(`[data-facet-name="${facet}"]`);
    const facetUrl = History.getState().url;

    const options = {
      template: this.options.showMore,
      params: {
        list_all: facet,
      },
    };

    if (!$toggle.siblings('.collection-facet-list-additional').length) {
      api.getPage(facetUrl, options, (err, response) => {
        if (err) {
          throw new Error(err);
        }

        $(response).insertAfter($navList);
        $toggle.find('button').children().toggle();
        $navList.toggle();
      });
    } else {
      $toggle.siblings('.collection-facet-list-additional').toggle();
      $toggle.find('button').children().toggle();
      $navList.toggle();
    }
  }

  _toggleFilter(event) {
    const $target = $(event.currentTarget);
    $target
      .parents('[data-facet-filter]')
      .children('[data-facet-filter-wrapper]')
      .toggleClass('is-open');

    if ($target.hasClass('is-open')) {
      $target.text('-');
    } else {
      $target.text('+');
    }

    $target.toggleClass('is-open');
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');

    this._goToUrl(url);

    $target.toggleClass('checked');
  }

  _onRangeSubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href);
    let queryParams = $(event.currentTarget).serialize();

    if (this.$body.hasClass('search')) {
      const currentSearch = `search_query=${$('[data-faceted-search]').data('search-query')}` || '';
      queryParams = `${queryParams}&${currentSearch}`;
    }

    this._goToUrl(Url.format({ pathname: url.pathname, search: '?' + queryParams }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href, true);
    const queryParams = $(event.currentTarget).serialize().split('=');

    url.query[queryParams[0]] = queryParams[1];
    delete url.query['page'];

    this._goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange(event) {
    this.overlayCallbacks.willUpdate();

    api.getPage(History.getState().url, this.options, (err, content) => {
      if (err) {
        throw new Error(err);
        this.overlayCallbacks.didUpdate();
        return;
      }

      if (content) {
        $('[data-category]').html(content.productListing);
        $('[data-category-sidebar]').html(content.sidebar);
        this.overlayCallbacks.didUpdate();
      }
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
