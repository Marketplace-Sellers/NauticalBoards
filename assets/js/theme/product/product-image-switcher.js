import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
import trend from 'jquery-trend';

export default class ProductImageSwitcher {
  constructor(el) {
    this.$el = $(el);

    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('click', '.product-thumbnail', (event) => {
      event.preventDefault();
      this._switchMainImage(event);
    });
  }


  _switchMainImage(event) {
    const $target = $(event.currentTarget);
    const $slides = this.$el.find('.product-slide');
    const slideNum = $target.data('thumb-num');

    $target
      .addClass('active')
      .siblings().removeClass('active');

    $slides.removeClass('active');
    this.$el.find('[data-slide-num="' + slideNum + '"]').addClass('active');
  }
}
