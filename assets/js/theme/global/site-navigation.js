import $ from 'jquery';
import debounce from '../utils/debouncer';

export default class Navigation {
  constructor() {
    this.$body = $(document.body);
    this.$el = $('.main-menu');
    this.$hasDropdown = this.$el.find('.nav-menu > .has-dropdown');
    this.$parentMenu = $('[data-dropdown-parent-menu]', this.$hasDropdown);
    this.$dropdownArrow = $('.nav-arrow-icon', this.$hasDropdown);
    this.$dropdownLink = $('> a', this.$hasDropdown);
    this.$shopLink = $('[data-shop-link]', this.$el);
    this.$dropDown = this.$el.find('.nav-submenu');
    this.$firstDropDown = this.$el.find('.nav-menu-item > .nav-submenu');
    this.$navItemMore = this.$el.find('.nav-menu-item.more');
    this.$mobileNavToggle = $('.nav-menu-toggle');
    this.$mainHeader = $('.main-header');
    this.$searchToggle = $('.search-toggle');
    this.$navToggle = this.$el.find('.nav-menu-toggle');
    this.$navSubmenuArrow = this.$el.find('.nav-submenu-arrow');

    this._bindEvents();
    this._overflowMenu();
  }

  _bindEvents() {
    this.$dropdownLink.on('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._toggleDropdown($(e.currentTarget));
    });

    this.$dropdownArrow.on('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._toggleDropdown($(e.currentTarget).siblings('a'));
    });

    this.$shopLink.on('click', (e) => {
      e.stopPropagation();
   });

    this.$body.on('click', () => {
      if (this.$parentMenu.find('.visible')) {
        this._closeAllDropdowns();
      }
    });

    this.$mobileNavToggle.on('click', (e) => {
      e.preventDefault();
      this._toggleMobileNav(e);
    });

    $(window).on('resize', debounce(() => {
      this._overflowMenu();
      $('.nav-submenu').removeClass('visible');
    }, 150));

    this.$body.on('keyup', (e) => {
      if (e.keyCode == 27) {
        this._closeAllDropdowns();
      }
    });
  }

  _toggleMobileNav(e) {
    this.$body.animate({scrollTop: this.$mainHeader.offset().top }, 250, ()=> {
      this.$el.revealer();
      $(e.currentTarget).toggleClass('active');
      this.$body.toggleClass('scroll-locked-medium');
    });
  }

  _toggleDropdown($dropdownLink) {
    if (!$dropdownLink.parent().find(this.$dropDown).hasClass('visible')) {
      this._closeAllDropdowns();
    }

    const $menu = $dropdownLink.parent().children('.nav-submenu');
    const $menuParent = $menu.parent();
    const diff = ($(window).width() - this.$dropDown.outerWidth()) / 2;
    const offset = $menuParent.offset();
    const width = $menuParent.outerWidth();
    const centerX = offset.left + width / 2;
    const position = (centerX - diff) - 15 + 'px';

    this._setDropdownHeight($dropdownLink);

    if ($(window).width() < 760) {
      $menu.css({'visibility': 'visible', 'top': '', 'left': ''}).revealer();
      return;
    }

    if ($menuParent.hasClass('has-shop-link') && this.$mainHeader.hasClass('expanded-nav')) {
      this.$navSubmenuArrow.css('left', position);

      $menu.revealer().one('revealer-animating', () => {
        const navMenuOffsetTop = $('.nav-menu').offset().top;
        const primaryNavOffsetBottom = $('.primary-navigation').offset().top + $('.primary-navigation').height();
        const topPos = primaryNavOffsetBottom - navMenuOffsetTop + 5;
        $menu.css({'top': topPos, 'visibility': 'visible'});
      });
    } else {
      $menu.revealer().one('revealer-animating', () => {
        $('.nav-menu-item > .nav-submenu').css({'visibility': 'hidden', 'left': ''});

        const menuOffset = $menu.offset().left;
        const menuOffsetPlus = $menu.offset().left + $menu.outerWidth();
        const windowWidth = $('body').innerWidth();
        const leftPos = menuOffsetPlus - windowWidth;

        if (menuOffsetPlus > windowWidth) {
          $menu.css({
            'left': 'calc(50% - ' + leftPos + 'px)',
            'visibility': 'visible',
            'top': $menuParent.height() + 20
          });
          $menu.children('.nav-submenu-arrow').css('left', 'calc(50% + ' + leftPos + 'px)');
        } else if (menuOffset < 0) {
          $menu.css({
            'left': 'calc(50% + ' + Math.abs(menuOffset) + 'px)',
            'visibility': 'visible',
            'top': $menuParent.height() + 20
          });
          $menu.children('.nav-submenu-arrow').css('left', 'calc(50% - ' + Math.abs(menuOffset) + 'px)');
        } else {
          $menu.css({'visibility': 'visible', 'left': '', 'top': $menuParent.height() + 20});
          $menu.children('.nav-submenu-arrow').css('left', '');
        }
      });

    }

  }

  _showSearchForm() {
    this.$searchForm.revealer('show');
    this.$shoppingTools.revealer('hide');
  }

  _closeAllDropdowns() {
    this.$dropDown.revealer('hide');
    $('.nav-menu-item > .nav-submenu').css({'visibility': 'hidden', 'left': ''});
  }

  _overflowMenu() {
    this.$navItemMore.before($('.overflow > li'));
    $('.nav-menu > .nav-submenu-item').removeClass('nav-submenu-item').addClass('nav-menu-item');
    if ($(window).outerWidth() <= 759) {
      this.$navItemMore.hide();
      $('.nav-menu').addClass('show-menu');
      return;
    }
    // if basic menu we're creating the "more" menu if there are more than 5 items
    if (this.$mainHeader.hasClass('split-menu')) {
      let $navItems = $('.nav-menu-item:not(.more)');

      this.$navItemMore.css('display', $navItems.length > 4 ? 'inline-block' : 'none');

      if ( $navItems.length > 4) {
        while ($navItems.length > 3) {
          $navItems.last().removeClass('nav-menu-item').addClass('nav-submenu-item').prependTo('.overflow');
          $navItems.splice(-1,1);
        }
      }
    //expanded-nav "more" menu only shows up if the top level elements need to wrap
    } else {
      const allowedWidth = $(window).width() - 400;
      let navItemWidth   = this.$navItemMore.width();
      let $navItems = $('.nav-menu-item:not(.more)');

      $navItems.each((i, el) => {
        navItemWidth += $(el).width();
      });

      this.$navItemMore.css('display', navItemWidth > allowedWidth ? 'inline-block' : 'none');

      navItemWidth > allowedWidth ? this.$navItemMore.css('display', 'inline-block') : this.$navItemMore.css('display', 'none');

      while(navItemWidth > allowedWidth) {
        navItemWidth -= $navItems.last().width();
        $navItems.last().removeClass('nav-menu-item').addClass('nav-submenu-item').prependTo('.overflow');
        $navItems.splice(-1,1);
      }
    }
    $('.nav-menu').addClass('show-menu');
  }

  _setDropdownHeight($dropdownLink) {
    //only run on desktop

    const $dropdown = $dropdownLink.parent().find(this.$firstDropDown);
    const $overflow = $dropdownLink.parent().find('.nav-overflow');

    if (this.$navToggle.is(":visible") || ! $dropdown.parent().hasClass('has-shop-link') || this.$mainHeader.hasClass('basic-nav')) { return; }

    const $window = $(window);
    const scrollTop = $window.scrollTop();
    const dropdownOffset = $dropdownLink.offset().top + 110;
    const maxHeight = $window.height() - (dropdownOffset - scrollTop);

    $overflow.css('max-height', maxHeight);
  }
}
