# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.14.0] - 2017-07-13

### Added
- Unsubscribe page for when users remove themselves from mailing lists (fixes THEME-1269)

## [1.13.5] - 2017-06-29

### Fixed
- Removed reference to default image that was blocking product thumbnails from displaying

## [1.13.4] - 2017-06-15

### Added
- product Delivery/Event Date Field (THEME-1283)

### Changed
- Fixed path to no image image so it displays
- Support links updated
- Date range in date field now shows if date range is within one year (fixes THEME-1331)

### Fixed
- Corrected display of pattern swatch hover image (THEME-1275)

### [1.13.3] - 2017-06-01

### Added
- Added "Show more" button for faceted search (THEME-1244)

### [1.13.2] - 2017-05-25

### Changed
- Removed unused text in lang file

### [1.13.1] - 2017-05-19

### Changed
- Reference in config.json for checkout updated to customized_checkout from optimized_checkout

## [1.13.0] - 2017-05-18

### Added
- Markup and theme settings to support Optimized Checkout

## [1.12.1] - 2017-04-27

### Changed
- Product pick list now defaults to none if default is set to none (theme-1279)
- Product pick list doesn't show none if it's required (theme-1267)
- Updated reference to @bigcommerce/stencil utils to 1.0.7


## [1.12.0] - 2017-04-06

### Changed
- now using recaptcha 2

## [1.11.0] - 2017-03-16

### Added
- Add option to hide copyright in footer
- Add option to show brands in the footer
- Add option to show "As low as" pricing message

### Changed
- Re-organize theme settings for the menu
- Split out nav type from header layout settings

### Fixed
- set product options to disabled, when they are unavailable (addresses THEME-1215)
- Added cart item discounts to cart page (fixes THEME-1217)
- used vanilla fitvids instead of fitvids, the js was breaking down and causing the nav not to display


## [1.10.0] - 2017-02-02

### Changed
- bumped to version 1.10.0 to match other themes using NPM/Webpack

### Fixed
- Some screen reader text showing up where it shouldn't


## [1.6.1] - 2017-01-17

### Fixed
- Improved the webpack build system so local development works on Windows systems


## [1.6.0] - 2017-01-12

### Changed
- Converted build system from using JSPM/SystemJS to NPM/Webpack


## [1.5.0] - 2016-12-15

### Fixed
- Fixed a vulnerability in how search terms are rendered on the search page

### Added
- Pagination to Brands Page
- Option to show category image on a category page
- Option to limit brands displayed on the Brands page

### Changed
- Moved option show category description to collections section of the theme editor


## [1.4.0] - 2016-12-01

### Added
- Option show Apple Pay Icon in footer
- `lang` attribute to <html> tag
- Option to pick how many products per row in collections pages
- Option to pick how many products in collections pages

### Fixed
- Required checkboxes not validating properly
- Bug needing two clicks on the product details dropdown
- Bug hiding product details dropdown if reviews are off
- Weird product variation issue when toggling swatches

## [1.3.0] - 2016-11-10

### Changed
- Add Cart Discount Label
- Add option for Category Description

### Added
- Added Apple Pay Button


## [1.2.4] - 2016-10-26

### Changed
- Fixed product reviews using throttler, now they will display, fixes THEME-1103
- Removed Gift certificate from cart when disabled in control panel, fixes THEME-1127.
- Fixed display of gift certificate on cart page using an SVG.

## [1.2.3] - 2016-08-16

### Added

- Added Show All link to Sitemap for categories and brands, fixes THEME-1092

### Changed

- Fixed videos not display on product pages, fixes THEME-1093

## [1.2.2] - 2016-08-11

### Changed

- Added nofollow attribute to faceted search links

## [1.2.1] - 2016-07-21

### Added

- Added nofollow attribute to BC footer credits (fixed theme_972)


## [1.2.0] - 2016-06-30

### Added

- Option to display the logo to the left or the right
- Option for an expanded nav and mega-nav for the "Shop" menu
- Gift Certificates to footer menu


## [1.1.0] - 2016-06-22

### Changed

- Add option to show/hide product dimensions
- Show height as part of product details
- Show units of measurements for product dimensions
- Add copyright to footer [THEME-1053]
- Stop shopping tools from overlapping menu when user is logged in
- Add classes to additional product info and custom fields
- Remove whitespace from slides on mobile when they have no text

## [1.0.13] - 2016-06-16

### Changed

- Hide newsletter signup when option is turned off [THEME-1044]
- Show "Call for Pricing" message if enabled [THEME-1030]
- Fix ie11 display issue with the quantity box
- FF, IE faceted search display bug

## [1.0.12] - 2016-06-02

### Changed

- Fix bug where hover of menu item turned white if it was a light color

## [1.0.11] - 2016-05-26

### Fixed

- Added swatch zoom on hover for desktop, hidden on mobile (fixes THEME-1029)

### Changed

- Using baguettebox allow user to see full size images [THEME-900]
- Stop horizontal scrolling on mobile screens lower than 360px
- Make sure logo stays the same size on checkout [THEME-1012]

## [1.0.9] - 2016-05-12

### Changed

- Don't allow 0 when adding a product to cart [THEME-887]
- Fix ie11 display issue when comparing products[THEME-886]

### [1.0.8] - 2016-05-05

### Changed

- Show proper swatches on products [THEME-998]
- Fixed an issue with Braintree payments not handling user info correctly (fixes THEME-975)

### [1.0.7] - 2016-04-21

### Added
- Add Option for background color

### Changed

- Only show account links when setting is on [THEME-951]
- Show syndicated RSS feed [THEME-982]
- Show UPS shipping method [PXU-30]
- Fixed an issue where the newsletter button color was not editable

### [1.0.6] - 2016-4-7

### Added
- Display of Facebook like button [THEME-932]
- Display of Pinterest button [THEME-943]

### Changed

- The way reviews are showed, an option for how many reviews to show [THEME-952]
- No longer show pagination arrows if there is no page to link to [THEME-894]
- Only show currency menu if needed [THEME-892]

### [1.0.5] - 2016-3-16

### Added
- Product options enable/disable based on SKU availability [THEME-908]


### [1.0.4] - 2016-2-17

### Added
- Add sitemap to footer with an option to hide it [THEME-883]

### Changed
- Paypal button displayed properly [THEME-905]
- Shipping calculator errors are displayed [THEME-888]
- Properly sized images are displayed decreasing load times [THEME-890]
- Create account page shows a dropdown for the State field [THEME-903]
- 'Add to Wishlist' is hidden when it is disabled in store settings [THEME-881]
- Logo on the checkout page is now the same size as the rest of the site [THEME-893]
- Checkout page no longer throws a 500 error for missing CSS [THEME-899]
- Sort by works when search filtering is off [THEME-877] [THEME-889] [THEME-902]
- Missing translation added to wishlist page [THEME-897]


### [1.0.3] - 2016-2-5

### Added
- New theme author metadata

### Changed
- Footer theme credits


### [1.0.2] - 2016-1-26

### Added
- Cart-preview remove button

### Changed
- Fixed issue with the quantity clicker where if used on multiple quick-viewed
items from one page it'd increase erratically
- Fixed issue where items removed from cart preview popup wouldn't refresh cart
page
- Fixed an issue with image overflow on the carousel
- Fixed an issue where alerts from quick-viewed products would show up on the
single product page's product


### [1.0.1] - 2016-1-22

### Added
- URLs to theme demos in config

### Changed
- Sale badge is round



### [1.0.0] - 2016-1-21

### Changed
- Final design tweaks
- Add screenshots and metadata



### [0.1.4] - 2016-1-21

### Changed
- Adjusted compare pop up styling
- Fixed z-index issues with modal
- Styled review form
- Removed cart count from header when it's 0
- Search results say what the query was
- Email icon is aligned in "share this"
- Newsletter input aligned vertically
- Adjust alert stylings
- Change symbol for cart quantity minus
- Variant product images will no longer duplicate



### [0.1.3] - 2016-1-20

### Added
- Missing social media icons
- Missing snippets

### Changed
- Hide buttons and alerts on unpurchasable products



### [0.1.2] - 2016-1-19

### Added
- Option for a 'shop' link in the main navigation that shows a dropdown with
every category in the shop
- Captcha to review form
- Missing snippet tags
- Generic error page

### Changed
- Display product grid in 4 columns when there's no sidebar
- Dropdown styles fixed
- Various margins changed
- Price, footer, and 'share this' stylings changed



### [0.1.1] - 2016-1-18

### Changed
- Removed masonry from the home page



### [0.1.0] - 2016-1-16

### Changed
- Pagination on brand page fixed. All large grids limited to 12 items
- Fixed bug where the home page grid looked bad on load
- Quickshop works from the compare page
- Fixed various bugs in the single product page
- Updated product form elements
- Pricing styles are updated
- Alerts are dismissable and display inline where appropriate
- Users can get more than one shipping estimate

### Added
- Payment Icons to footer
- Sale badges to the product grid
- Cart page shows product options
- Carousel animation and color options
- Maintenance and hibernation pages
- Shipping messages to home, cart, product pages
- Loading is shown more often
- Product variation images are now available from product page and quickshop



### [0.0.18] - 2016-1-4

### Changed
- Removed special characters (quotes) from descriptions
- Styled account pages
- Fixed bug with quick shop

### Added
- Contact page
- Sitemap
- RSS



### [0.0.17] - 2015-12-23

### Added
- Contact page
- Sitemap
- RSS
- Account page

### Changed
- Fixed shipping calculator
- Fixed bug with quick shop items not saying sold out
- Fixed bug when a banner is above the mobile nav



### [0.0.16] - 2015-12-22

### Added
- Theme Editor



### [0.0.15] - 2015-12-22

### Added
- Theme variations are added



### [0.0.14] - 2015-12-22

### Added
- Account and gift certificate pages



### [0.0.13] - 2015-12-22

### Changed
- Updated styles to cart page
- Reworked quick view modal so it will match other modals

### Added
- Gift wrap, gift certificate, coupon codes



### [0.0.12] - 2015-12-21

### Changed
- Switched from bc-accounts to bc-core
- Fixed mosaic swatch

### Added
- Added alerts for product reviews
- Hooked up Bulk Pricing toggle



### [0.0.11] - 2015-12-18

### Changed
- Icon fonts will work on production



### [0.0.10] - 2015-12-18

### Added
- Placeholders for theme variants

### Changed
- Fonts pull from google now
- Images are sized properly



### [0.0.9] - 2015-10-28

### Changed
- Fixed a bug that was breaking layouts when prices with taxes were toggled
off in the dashboard
- Fixed some invalid HTML



### [0.0.8] - 2015-10-23

#### Added
- Secondary (mobile) currency selector now works
- Product forms are all styled. Prices display showing with/without tax
- Proper feedback and error handling for product and quick view ajax
add-to-cart
- Product details added (warranty, condition, custom fields, etc)

### Changed
- Mobile header fixed
- Form elements have better hover states



### [0.0.7] - 2015-10-16

#### Added
- Currency switcher now works
- User can buy add a product to their cart from the compare pages
- Quickview is accessible added throughout the theme (search results, category,
  related products, etc)
- Default image placeholders for products without images have been added.

### Changed
- Theme renamed to Chelsea
- Glitchy scrollbars should be gone from the Quick Cart
- Quick Cart will work in Safari



### [0.0.6] - 2015-10-09

#### Added
- Banner support: user can select if banners are displayed at the top or bottom
- Thanks for subscribing page added with email validation error reporting
issue the the dependency
- 403, 404, 500 error pages
- Quickview! Users can add products to their carts from the quickview modal

### Changed
- More loading spinners



### [0.0.5] - 2015-10-05

#### Added
- Content pages display text properly from the Rich Text Editor
- Account pages have been added, although you can't create an account due to an
issue the the dependency
- Brand and Brands templates
- Category template
- Search Results template
- User can filter results on Brand, Category, and Search Results templates

### Changed
- Check boxes are fixed for Firefox
- jQuery history is fixed for Firefox



### [0.0.4] - 2015-10-01

#### Added
- User can compare products from the category/collection pages
- The cart page has been added. User can update product quantities from there.
- Blog has been added, including: blog index, tag pages, post page.
- Users can now share blog posts and products

### Changed
- More than one product can be added to the cart at once from the product
details page



### [0.0.3] - 2015-09-24

#### Added
- Collection pages display products-related
- Faceted search will filter products on collection pages using the sidebar
- Products on collection pages can be sorted by the user

### Changed
- Some form styling was Changed
- BC-loading is now being used to handle loading overlays



### [0.0.2] - 2015-09-22

#### Added
- User can submit a product Review
- Product savings are shown on the product details page
- Radio boxes will be displayed for product variants

### Changed
- Sale prices are shown with the original price crossed out
- Cart preview will automatically hide when the users decreases their browser
past the small/medium device breakpoint
- 'Leave a Review' button is on its own line when there are no reviews



### [0.0.1] - 2015-09-18

#### Added
Everything: Inital release for QA.
- Home Page
- Product Page
- Cart Preview functionality
