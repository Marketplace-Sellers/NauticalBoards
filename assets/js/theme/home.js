import $ from 'jquery';
import _ from 'lodash';
import PageManager from '../pageManager';
import Carousel from 'bc-carousel';
import MobileCarousel from './mobile-carousel';

export default class Home extends PageManager {
  constructor() {
    super();
  }

  loaded(next) {
    const $carousel = $('.carousel');
    this.myCarousel = new Carousel({
      el: $carousel,
      delay: this.context.carouselDelay
    });

    this.mobileCarousel = new MobileCarousel(this.myCarousel);

    $carousel.on('carousel-resized', () => {
      this.mobileCarousel.setNavPosition();
    });

    $(window).on('scroll', _.debounce(() => {
      this.mobileCarousel.pausePlayCarousel(this.myCarousel);
    }, 200));
    next();
  }
}
