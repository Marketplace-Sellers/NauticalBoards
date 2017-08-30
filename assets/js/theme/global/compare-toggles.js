import $ from 'jquery';

export default function (form = '.product-listing form', button = '.compare-button', count = '.compare-count') {
  const $compareButton = $(button);
  const $compareCount = $(count);
  const $productForm = $(form);
  let checkedItems = [];

  function toggleCompare(event) {

    // Only perform on the checkboxes (not via the IIFE below)
    const $target = event.currentTarget;
    if ($target) {

      if ($target.checked) {
        // Otherwise, item just became checked so add it to the array
        checkedItems.push($target);
        // And if our array is now larger than 3 items, drop the oldest
        if (checkedItems.length > 4) {
          $( checkedItems.shift() ).attr('checked', false);
        }
      } else {
        // Find the index within the checked array.
        let checkedNumber = $.inArray($target, checkedItems);
        // and remove it.
        checkedItems.splice(checkedNumber, 1);
      }
    }

    // Toggle compare button when more than one item selected.
    if (checkedItems.length > 1) {
      $compareButton.addClass('compare-button-visible');
      $compareCount.text(checkedItems.length);
    } else {
      $compareButton.removeClass('compare-button-visible');
      $compareCount.empty();
    }

    $compareButton.click(function(){
      $productForm.submit();
    });

  }

  $productForm.on('change','input[type="checkbox"]', toggleCompare );
  // Immediately execute function (in case document starts with items checked)
  $(toggleCompare);

}
