(function($){

  /* Для проверки resize, т.к. на мобильном Хроме при скролле срабывает resize (без изменения ширины) */
  var screenWidth = $(window).width();

  /* Инициализация wow */
  wow = new WOW({mobile: false})
  wow.init();

  /* Нужно для IE и некоторых других браузеров, чтобы понимал svg спрайты во внешних файлах */
  svg4everybody();

  /* полифил для object-fit */
  objectFitImages($('[data-object-fit-cover],[data-object-fit-contain]'), {watchMQ: true});

  /* инициализация fancybox */
  $(".fancybox").fancybox({
    padding: 0,
    scrolling: 'auto'
  });

  /* инициализация кастомного скроллбара */
  $(window).on("load",function(){
    $(".categories__content").mCustomScrollbar({
      theme: "dark",
      scrollInertia: 1000,
      // documentTouchScroll: false,
    });
  });

  /* Плавный скролл к якорю для всех ссылок с классом "inner-link" */
  $(function(){
    $('.inner-link[href^="#"]').click(function(){
      var _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top - 20 +'px'});
      return false;
    });
  });

  /* Плавный скролл "вверх" */
  $('a[href^="#page_wr"]').click(function(event){
    event.preventDefault;
    var _href = $(this).attr('href');
    $('html, body').animate({scrollTop: '0px'});
    return false;
  });

  $('.burger').click(function() {
    $(this).toggleClass('active');
    $('.header__menu-wrap').toggleClass('active');
  });

  /* Открытие / закрытие модалок (кроме карты) */
  $('a.open-modal').click(function(event){
    event.preventDefault();
    var _href = $(this).attr('href');
    if ( $(_href).length > 0 ) {
      $(_href).addClass('active');
      $(_href + ' .modal__content').addClass('visible');
    }
  });

  function closeModal() {
    var activeCount = $('.modal.active').length;
    if ( activeCount > 1 ) {
      $($('.modal.active')[activeCount - 1]).removeClass('active');
      $('.modal__callback2 .modal__content').removeClass('visible');
    } else {
      $('.modal').removeClass('active');
      $('.modal__content').removeClass('visible');
    }
  }

  $(document).mouseup(function (e) {
    var container = $(".modal .modal__content");
    if (container.has(e.target).length === 0){
      closeModal();
    }
  });

  $('.modal .close').click(function(){
    closeModal();
  });

  $(document).keydown(function(eventObject){
    if( eventObject.which == 27 ){
      closeModal();
    }
  });

  // маска поля tel
  $(".wpcf7-tel").mask("+7 (999) 999-99-99");

  // Секции по типу "Вопрос - ответ"
  function toggleHidden(xParent,hideOther) {
    $(xParent + ' .top').click(function() {
      $(this).parent().toggleClass('active');
      $(this).siblings().slideToggle();
      if (hideOther) {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.hidden').slideUp();
      }
    });
  }

  toggleHidden('.scr_serv',true);

  // фиксированные шапка
  $(window).on("scroll", function() {
    var fromTop = $(document).scrollTop();
    $(".header").toggleClass("fixed", (fromTop > 10));
    $(".to-top").toggleClass("fixed", (fromTop > 600));
  });

  // Табы
  $('.js-blog__nav a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.blog__tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });

  $('.js-map__nav a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.map__tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });

  $('.js-scr_serv__nav a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.scr_serv__tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });

  $('.js-portfolio__nav a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.portfolio__tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });

  $('img').on('dragstart', function (event) {
    event.preventDefault();
  });


  /* СЛАЙДЕРЫ */

  var scr1__feat = new Swiper('#scr1__feat', {
    slidesPerView: 1,
    watchSlidesProgress: true,
    pagination: {
      el: '.scr1__feat-btns .swiper-dots',
    },
    breakpoints: {
      850: {
        slidesPerView: 3,
      },
      575: {
        slidesPerView: 2,
      },
    },
  });

  var categories__slider = new Swiper('#categories__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesProgress: true,
    pagination: {
      el: '.categories__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.categories__slider-btns .swiper-button-next',
      prevEl: '.categories__slider-btns .swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 40,
      },
      991: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 20,
      },
      650: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 20,
      },
    },
  });

  var brands__slider = new Swiper('#brands__slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    watchSlidesProgress: true,
    pagination: {
      el: '.brands__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.brands__slider-btns .swiper-button-next',
      prevEl: '.brands__slider-btns .swiper-button-prev',
    },
    breakpoints: {
      1170: {
        slidesPerView: 4,
        spaceBetween: 46,
      },
      575: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
  });

  var objectsSlider = new Swiper('#objects__slider', {
    slidesPerView: 2,
    spaceBetween: 8,
    watchSlidesProgress: true,
    pagination: {
      el: '.objects__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.objects__slider-btns .swiper-button-next',
      prevEl: '.objects__slider-btns .swiper-button-prev',
    },
    breakpoints: {
      1170: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  var certsSlider = new Swiper('#certs__slider', {
    slidesPerView: 2,
    spaceBetween: 8,
    watchSlidesProgress: true,
    pagination: {
      el: '.certs__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.certs__slider-btns .swiper-button-next',
      prevEl: '.certs__slider-btns .swiper-button-prev',
    },
    breakpoints: {
      900: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      450: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
  });

  $('.scr_serv__slider').each(function(xi,xel) {
    var xId = '#' + $(xel).attr('id');
    var xBtns = $(xel).parents('.scr_serv__slider-wrap').find('.scr_serv__slider-btns');
    var xTabs = false;
    var scrServSlider = new Swiper(xId, {
      slidesPerView: 2,
      spaceBetween: 8,
      watchSlidesProgress: true,
      watchOverflow: true,
      navigation: {
        nextEl: xBtns.find('.swiper-button-next'),
        prevEl: xBtns.find('.swiper-button-prev'),
      },
      pagination: {
        el: xBtns.find('.swiper-dots'),
      },
      breakpoints: {
        1070: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      },
    });
  });


  $('.portfolio__tab').each(function(xi,xel) {

    var _thumbs = $(xel).find('.portfolio__thumbs');
    var _thumbsBtns = _thumbs.parent().find('.portfolio__thumbs-btns');

    var _gallery = $(xel).find('.portfolio__gallery');
    var _galleryBtns = _gallery.parent().find('.portfolio__gallery-btns');

    var _slider = $(xel).find('.portfolio__slider');

    var galleryThumbs = new Swiper(_thumbs, {
      slidesPerView: 2,
      spaceBetween: 8,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: _thumbsBtns.find('.swiper-button-next'),
        prevEl: _thumbsBtns.find('.swiper-button-prev'),
      },
      breakpoints: {
        1070: {
          slidesPerView: 3,
          spaceBetween: 24,
          direction: "vertical",
        },
        850: {
          slidesPerView: 2,
          spaceBetween: 24,
          direction: "vertical",
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      },
    });

    var portfolioGallery = new Swiper(_gallery, {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      watchOverflow: true,
      navigation: {
        nextEl: _galleryBtns.find('.swiper-button-next'),
        prevEl: _galleryBtns.find('.swiper-button-prev'),
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });

    var portfolioSlider = new Swiper(_slider, {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      watchOverflow: true,
      effect: 'fade',
      allowTouchMove: false,
    });

    portfolioGallery.controller.control = portfolioSlider;
  });

  $('.portfolio__tab:not(:first-of-type)').hide();

  $('.scr_serv__item:not(:first-of-type) .hidden').hide();
  $('.scr_serv__item:first-of-type').addClass('active');
  $('.scr_serv__tab:not(:first-of-type)').hide();

  if (window.matchMedia('(max-width: 767px)').matches) {
    var profit__slider = new Swiper('#profit__slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      watchSlidesProgress: true,
      pagination: {
        el: '.profit__slider-btns .swiper-dots',
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }


  /* NEW JS */ 
  $('#equipment-slider').slick({
    slidesToShow: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        }
      }
    ]
  });
  $('#persons-slider').slick({
    slidesToShow: 2,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          arrows: true,
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
        }
      }
    ]
  });
})(jQuery);
