import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import SelectWrapper from '../global/select-wrapper';

export default class GiftWrapping {
  constructor(options = {}) {
    this.options = $.extend({
      scope: '[data-cart-content]',
      trigger: '[data-item-giftwrap]',
      remove: '[data-giftwrap-remove]',
    }, options);

    this.$cartContent = $(this.options.scope);
    this.context = options.context;

    this._initialize();
  }

  _initialize() {
    this.itemId; // later assigned the id of the current product

    this.GiftWrapModal = new Modal({
      modalClass: 'giftwrap-modal',
      afterShow: ($modal) => {
        this._getForm($modal);
      },
    });

    this._bindPageEvents();
  }

  // Bind functionality to giftwrap links.
  _bindPageEvents() {
    this.$cartContent.on('click', this.options.trigger, (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      this.itemId = $target.data('item-giftwrap');

      this.GiftWrapModal.open();
    });
    this.$cartContent.on('click', this.options.remove, (event) => {
      if(!confirm(this.context.removeGiftWrap)) {event.preventDefault()};
    });

  }

  // Run once the modal has been opened..
  _getForm($modal) {
    const options = { template: 'cart/giftwrap-form' };

    utils.api.cart.getItemGiftWrappingOptions(this.itemId, options, (err, response) => {
      if (response) {
        $modal.find('.modal-content').append(response.content);
        this._bindModalEvents($modal);

        // Wrap selects within the modal
        const $select = $modal.find('select')
        if ($select.length) {
          $select.each((i, el) => {
            new SelectWrapper(el);
          });
        }

        // reposition modal with content
        this.GiftWrapModal.position();

        // Class added to display the modal once content is available
        $modal.addClass('loaded');

      } else {
        this.GiftWrapModal.close();
      }
    });
  }

  _bindModalEvents($modal) {
    $modal.on('change', () => {
      this.GiftWrapModal.position();
    });

    // Select giftwrapping individually or together
    $modal.find('[data-giftwrap-type]').on('change', (event) => {
      this._toggleSingleMultiple($modal, event.currentTarget.value);
    });

    // Select the type of gift wrapping for a particular item
    $('[data-giftwrap-select]').change((event) => {
      const $select = $(event.target);
      const index = $select.data('index');
      const id = $select.val();

      if (!id) { return; }
      const allowMessage = $select.find(`option[value=${id}]`).data('allow-message');

      $(`[data-giftwrap-image-${index}]`).addClass('hidden');
      $(`[data-giftwrap-image-${index}="${id}"]`).removeClass('hidden');

      if (allowMessage) {
        $(`[data-giftwrap-message-${index}]`).removeClass('hidden');
      } else {
        $(`[data-giftwrap-message-${index}]`).addClass('hidden');
      }
    });

    $('[data-giftwrap-select]').trigger('change');
  }

  // Toggles displaying single / multiple wrap options
  _toggleSingleMultiple($modal, value) {
    const $singleForm = $modal.find('[data-giftwrap-single]');
    const $multiForm  = $modal.find('[data-giftwrap-multiple]');

    if (value === 'different') {
      $singleForm.addClass('hidden');
      $multiForm.removeClass('hidden');
    }  else {
      $singleForm.removeClass('hidden');
      $multiForm.addClass('hidden');
    }
  }
}
