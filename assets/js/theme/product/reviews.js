import $ from 'jquery';
import FormValidator from '../utils/FormValidator';

export default class Reviews {
  constructor(context) {
    this.context = context;
    this.Validator = new FormValidator(this.context);
    this._bindEvents();
  }

  _toggleReviewForm(e) {
    e.preventDefault();
    $('.reviews-leave-review').addClass('hidden');
    $('.reviews-form-wrapper').revealer();
  }

  _bindEvents() {
    $('.reviews-leave-review').on('click', (e) => {
      this._toggleReviewForm(e);
    });
  }
}
