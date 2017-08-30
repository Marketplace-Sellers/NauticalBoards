import $ from 'jquery';
import ProductViewTemplates from './productViewTemplates';
import ProductImageSwitcher from './product-image-switcher';
import imagesLoaded from 'imagesloaded';

export default function variationImgPreview(main, thumb, alt) {
  const productImages = '.product-images';
  const thumbNum = $('.product-thumbnail').length;

  // Only append if image doesn't already exist.
  if (! $(`img[src="${thumb}"]`).length) {

    const newThumb = ProductViewTemplates.variationThumbnail({
      mainImageUrl: main,
      thumbImageUrl: thumb,
    });

    const $newThumb = $(newThumb).addClass('active').attr('data-thumb-num', thumbNum);

    imagesLoaded($newThumb[0], () => {
      $('.product-thumbnails').prepend($newThumb);
      $newThumb.siblings().removeClass('active');
      new ProductImageSwitcher(productImages);
    });
  }

  // Set main image and add active class to matching thumbnail
  if (! $(`img[src="${main}"]`).length) {
    const $newImage = $('.product-main-image').children().first().clone();
    $('.product-main-image').prepend($newImage);
    $newImage.addClass('active').children('img').attr('src', main);
    $newImage.attr('data-slide-num', thumbNum).siblings().removeClass('active');
    // Todo: make it so ProductImageSwitcher only needs to fire once
    new ProductImageSwitcher(productImages);
  } else {
    $(`img[src="${main}"]`).parent().addClass('active').siblings().removeClass('active');
  }
}
