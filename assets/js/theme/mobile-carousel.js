import $ from 'jquery';
import isElementInViewport from './components/Inview';

export default class MobileCarousel {

  constructor(carousel) {
    this.$el = $('.carousel');
    this.$images = this.$el.find('.carousel-item-image');
    this.$nav = this.$el.find('.carousel-navigation');
    this.carouselObject = carousel;
  }

  setNavPosition() {
    const imageHeight = this.$images.eq(0).height();

    if ($('body').css('content') === 'mobile') {
      this.$nav.css('top', (imageHeight ? imageHeight/2 - 20 : '140px'));
    } else {
      this.$nav.css('top', '');
    }
  }

  pausePlayCarousel() {
    if ($('body').css('content') === 'mobile') {
      if (isElementInViewport(this.$el[0])) {
        this._playSlider(this.carouselObject);
      } else {
        this._pauseSlider(this.carouselObject);
      }
    }
  }

  _pauseSlider(carousel) {
    carousel.pause();
  }

  _playSlider(carousel) {
    carousel.play();
  }
}
