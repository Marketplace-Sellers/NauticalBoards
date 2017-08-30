import $ from 'jquery';
import PageManager from '../pageManager';
import FacetedSearch from './components/faceted-search';
import Loading from 'bc-loading';
import compareToggle from "./global/compare-toggles";

export default class Brand extends PageManager {
  constructor() {
    super();
    compareToggle();

    const loadingOptions = {
      loadingMarkup: '<div class="loading"></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
      this.sidebarOverlay = new Loading(loadingOptions, true, '[data-category-sidebar]');
    }
  }

  _initializeFacetedSearch() {
    const facetedSearchOptions = {
      config: {
        category: {
          shop_by_price: true,
        },
      },
      template: {
        productListing: 'brand/product-listing',
        sidebar: 'brand/sidebar',
      },
      showMore: 'brand/show-more'
    };

    const facetedSearch = new FacetedSearch(facetedSearchOptions, {
      willUpdate: () => this.sidebarOverlay.show(),
      didUpdate: () => this.sidebarOverlay.hide(),
    });
  }
}
