import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import SelectWrapper from '../global/select-wrapper';

export default function(didUpdate, remove) {
  const $cartTotals = $('[data-cart-totals]');
  const $cartContent = $('[data-cart-content]');
  const $cartItem = $('[data-cart-item]', $cartContent);
  const options = {
    template: {
      content: 'cart/content',
      totals: 'cart/totals',
    },
  };

  // Remove last item from cart? Reload
  if (remove && $cartItem.length === 1) {
    return window.location.reload();
  }

  utils.api.cart.getContent(options, (err, response) => {
    // TODO: Scope the call to this function by area that needs updating
    $cartContent.html(response.content);
    $cartTotals.html(response.totals);

    // Remove this if you're not using SelectWrapper
    if ($('[data-shipping-calculator] select').length) {
      const $select = $('[data-shipping-calculator] select');
      $select.each((i, el) => {
        new SelectWrapper(el);
      });
    }

    // TODO: If the loading overlay is scoped to an area that is replaced
    // it does not fade out, but is removed abrubtly (due to being a
    // part of that area's content).
    didUpdate();
  });
}
