(function ($) {
  ("use strict");

  $(".sidebar-button").on("click", function () {
    $(this).toggleClass("active");
  });

  const sidebarButton = document.querySelector(".sidebar-button");

  if (sidebarButton) {
    sidebarButton.addEventListener("click", () => {
      document.querySelector(".main-menu").classList.toggle("show-menu");
    });
  }

  $(".menu-close-btn, .ai-btn").on("click", function () {
    $(".main-menu").removeClass("show-menu");
  });

  
  jQuery(".dropdown-icon").on("click", function () {
    jQuery(this)
      .toggleClass("active")
      .next("ul, .mega-menu, .mega-menu2")
      .slideToggle();
    jQuery(this)
      .parent()
      .siblings()
      .children("ul, .mega-menu, .mega-menu2")
      .slideUp();
    jQuery(this).parent().siblings().children(".active").removeClass("active");
  });
  jQuery(".dropdown-icon2").on("click", function () {
    jQuery(this).toggleClass("active").next(".submenu-list").slideToggle();
    jQuery(this).parent().siblings().children(".submenu-list").slideUp();
    jQuery(this).parent().siblings().children(".active").removeClass("active");
  });

  // sticky header
  function updateStickyHeaderOffset() {
    const header = document.querySelector("header.header-area");
    if (header) {
      document.documentElement.style.setProperty(
        "--sticky-header-height",
        `${header.offsetHeight}px`,
      );
    }
  }

  updateStickyHeaderOffset();
  window.addEventListener("resize", updateStickyHeaderOffset);

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header.header-area");
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 0);
      updateStickyHeaderOffset();
    }
  });

  // Back To Top
  jQuery(function ($) {
    const el = document.getElementById("scroll-percentage");
    const valueEl = document.getElementById("scroll-percentage-value");
    if (!el || !valueEl) return;

    const offset = 50;

    function update() {
      const scrollTop = $(window).scrollTop();
      const docH = $(document).height() - $(window).height();

      const progress = docH > 0 ? Math.min(scrollTop / docH, 1) : 0;
      const pct = Math.round(progress * 100);

      // text
      valueEl.textContent = pct + "%";

      // conic gradient
      // IMPORTANT: conic-gradient needs "deg" or "%" stops
      el.style.background = `conic-gradient(var(--hotel-primary-color2) ${pct}%, var(--progress-bg) ${pct}%)`;

      // show/hide
      if (scrollTop > offset) el.classList.add("active");
      else el.classList.remove("active");

      // at 100% show arrow (hide percent)
      if (pct >= 100) el.classList.add("is-complete");
      else el.classList.remove("is-complete");
    }

    update();
    $(window).on("scroll resize", update);

    // click (arrow or anywhere inside)
    $("#scroll-percentage").on("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Home demo menu
  const demoMenuWrapper = $(".hotel-demo-menu-wrapper");

  function setDemoMenuScrollbarWidth() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--demo-scrollbar-width",
      `${scrollbarWidth}px`,
    );
  }

  $(".hotel-demo-button").on("click", function () {
    setDemoMenuScrollbarWidth();
    demoMenuWrapper.addClass("open");
    $("html, body").addClass("demo-menu-open");
  });

  demoMenuWrapper.find(".close-btn").on("click", function () {
    demoMenuWrapper.removeClass("open");
    $("html, body").removeClass("demo-menu-open");
    document.documentElement.style.removeProperty(
      "--demo-scrollbar-width",
    );
  });

  // Support Card
  jQuery(function ($) {
    const supportArea = $(".support-area");
    const supportToggle = $(".support-toggle");
    const supportCard = $("#supportCard");

    if (!supportArea.length || !supportToggle.length || !supportCard.length)
      return;

    function setSupportState(isOpen) {
      supportArea.toggleClass("active", isOpen);
      supportToggle.attr("aria-expanded", isOpen ? "true" : "false");
      supportCard.attr("aria-hidden", isOpen ? "false" : "true");
    }

    supportToggle.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setSupportState(!supportArea.hasClass("active"));
    });

    supportArea.on("click", function (e) {
      e.stopPropagation();
    });

    $(document).on("click", function () {
      setSupportState(false);
    });
  });

  // Hotel Details Overview Read More
  jQuery(function ($) {
    $(".hotel-dt-overview-area .read-more-btn").on("click", function () {
      const btn = $(this);
      const overviewArea = btn.closest(".hotel-dt-overview-area");
      const isExpanded = overviewArea.toggleClass("active").hasClass("active");

      btn.attr("aria-expanded", isExpanded ? "true" : "false");
      btn.find("span").text(isExpanded ? "Read Less" : "Read More");
    });
  });

  // FancyBox Js
  $('[data-fancybox="gallery-01"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });
  $('[data-fancybox="package-details-gallery"]').fancybox({
    buttons: ["close"],
    loop: true,
    protect: true,
  });
  $('[data-fancybox="video-player"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });

  // Experience Details Gallery Modal
  const experienceGalleryModal = document.getElementById(
    "experienceGalleryModal",
  );

  if (experienceGalleryModal) {
    experienceGalleryModal
      .querySelectorAll('a[href="#availability-section"]')
      .forEach(function (link) {
        link.addEventListener("click", function (e) {
          const target = document.querySelector(link.getAttribute("href"));

          if (!target || !window.bootstrap) return;

          e.preventDefault();

          const modalInstance = bootstrap.Modal.getOrCreateInstance(
            experienceGalleryModal,
          );
          const goToAvailability = function () {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", link.getAttribute("href"));
          };

          experienceGalleryModal.addEventListener(
            "hidden.bs.modal",
            goToAvailability,
            { once: true },
          );

          modalInstance.hide();
        });
      });
  }

  // Filter Bottom Text Slider
  var swiper = new Swiper(".filter-bottom-text-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });

  // Home1 Package Details Tourist Places Slider
  if (document.querySelector(".hotel-destination-slider")) {
    new Swiper(".hotel-destination-slider", {
      slidesPerView: 1,
      speed: 1200,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 1800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        350: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }

  // Hotel Experience Slider
  var swiper = new Swiper(".hotel-experience-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 18,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".hotel-experience-slider-next",
      prevEl: ".hotel-experience-slider-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Home1 Package Card Slider
  document
    .querySelectorAll(".package-card-img-slider")
    .forEach((slider, index) => {
      // Add unique pagination class
      $(slider)
        .next(".slider-pagi-wrap")
        .children(".package-card-img-pagi")
        .addClass(`package-card-img-pagi-${index}`);
      const nextBtn = slider.parentElement.querySelector(
        ".package-card-img-slider-next",
      );
      const prevBtn = slider.parentElement.querySelector(
        ".package-card-img-slider-prev",
      );
      nextBtn?.classList.add(`package-card-img-slider-next-${index}`);
      prevBtn?.classList.add(`package-card-img-slider-prev-${index}`);

      setTimeout(() => {
        new Swiper(slider, {
          slidesPerView: 1,
          speed: 1500,
          spaceBetween: 24,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          autoplay: {
            delay: 1500,
            disableOnInteraction: false,
          },
          pagination: {
            el: `.package-card-img-pagi-${index}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.package-card-img-slider-next-${index}`,
            prevEl: `.package-card-img-slider-prev-${index}`,
          },
        });
      }, 0);
    });

  // Hotel Testimonial Slider
  var swiper = new Swiper(".hotel-testomonial-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 18,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1600: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Hotel Details Gallery Slider
  var swiper = new Swiper(".hotel-dt-gallery-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 20,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".hotel-dt-gallery-next",
      prevEl: ".hotel-dt-gallery-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  });

  // Hotel Recommended Package Slider
  var swiper = new Swiper(".hotel-card-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });

  // Hotel Package Details Gallery Slider
  if (document.querySelector(".package-details-gallery-slider")) {
    new Swiper(".package-details-gallery-slider", {
      slidesPerView: 1,
      speed: 1200,
      spaceBetween: 0,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 1800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".package-details-gallery-next",
        prevEl: ".package-details-gallery-prev",
      },
    });
  }

  // Product Recommended Package Slider
  var swiper = new Swiper(".product-recommended-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });

  // Hotel Blog Recommended Package Slider
  var swiper = new Swiper(".hotel-blog-recommended-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  });

  //wow js
  jQuery(window).on("load", function () {
    new WOW().init();
    window.wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
      offset: 80,
    });
    window.wow.init();
  });

  // niceSelect
  if ($("select").length) {
    $("select").niceSelect();
  }

  //Quantity Increment
  $(".quantity__minus").on("click", function (e) {
    e.preventDefault();
    var input = $(this).siblings(".quantity__input");
    var value = parseInt(input.val(), 10);
    if (value > 1) {
      value--;
    }
    input.val(value.toString().padStart(2, "0"));
  });
  $(".quantity__plus").on("click", function (e) {
    e.preventDefault();
    var input = $(this).siblings(".quantity__input");
    var value = parseInt(input.val(), 10);
    value++;
    input.val(value.toString().padStart(2, "0"));
  });

  //Cart Menu Quantity button toggle
  $(".qty-btn").on("click", function (e) {
    e.stopPropagation();
    // Toggle "active" class for the current quantity button and its related elements
    $(this).next(".quantity-area").toggleClass("active");

    // Remove "active" class from other quantity buttons and related elements
    $(".quantity-area")
      .not($(this).next(".quantity-area"))
      .removeClass("active");
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".quantity-area").length) {
      // Remove "active" class from all quantity buttons and related elements
      $(".quantity-area").removeClass("active");
    }
  });

  // Payment Method
  $(function () {
    $(".choose-payment-method ul li").on("click", function () {
      $(".choose-payment-method ul li").removeClass("active"); // Remove active class from all list items
      if ($(this).hasClass("stripe")) {
        $("#StripePayment").show();
        $("#OfflinePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else if ($(this).hasClass("paypal")) {
        $("#OfflinePayment").hide();
        $("#StripePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else if ($(this).hasClass("offline")) {
        $("#OfflinePayment").show();
        $("#StripePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else {
        $("#StripePayment").hide();
        $("#OfflinePayment").hide();
      }
    });
  });

  // ================================================================
  // Page navigation active section
  // ================================================================
  function initPageNavigation(options) {
    var settings = $.extend(
      {
        menuSelector: ".page-navigation-menu",
        itemSelector: ".page-navigation-item",
        stickyNavSelector: ".hotel-inner-page-navigation-wrap",
        fixedHeaderSelector: ".header-area",
        activeClass: "active",
        animationSpeed: 300,
      },
      options,
    );

    var $menu = $(settings.menuSelector);
    if (!$menu.length) return;
    var $stickyNav = $(settings.stickyNavSelector);

    function isNavigationVisible() {
      return !$stickyNav.length || $stickyNav.is(":visible");
    }

    function getScrollOffset() {
      return (
        ($(settings.fixedHeaderSelector).outerHeight() || 0) +
        (isNavigationVisible() ? $stickyNav.outerHeight() || 0 : 0)
      );
    }

    function getNavigationSections() {
      return $menu
        .find('a[href^="#"]')
        .not('[href$="#"]')
        .not('[href$="#0"]')
        .map(function () {
          var $section = $(this.hash);

          if (!$section.length) return null;

          return {
            link: this,
            item: $(this).closest(settings.itemSelector),
            section: $section,
          };
        })
        .get();
    }

    function setActiveItem($item) {
      $menu.find(settings.itemSelector).removeClass(settings.activeClass);
      $item.addClass(settings.activeClass);
    }

    function updateActiveItem() {
      if (!isNavigationVisible()) return;

      var sections = getNavigationSections();
      if (!sections.length) return;

      var scrollPosition = $(window).scrollTop() + getScrollOffset() + 1;
      var activeSection = sections[0];

      sections.forEach(function (sectionData) {
        if (scrollPosition >= sectionData.section.offset().top) {
          activeSection = sectionData;
        }
      });

      setActiveItem(activeSection.item);
    }

    $menu
      .find('a[href^="#"]')
      .not('[href$="#"]')
      .not('[href$="#0"]')
      .on("click", function (e) {
        var $target = $(this.hash);

        if (!isNavigationVisible()) return;
        if (!$target.length) return;

        e.preventDefault();
        setActiveItem($(this).closest(settings.itemSelector));

        $("html, body").animate(
          {
            scrollTop: $target.offset().top - getScrollOffset(),
          },
          settings.animationSpeed,
        );
      });

    updateActiveItem();
    $(window).on("scroll resize", function () {
      updateActiveItem();
    });
  }

  initPageNavigation();

  if ($("body").not(".is-mobile").hasClass("tt-magic-cursor")) {
    if ($(window).width() > 1024) {
      gsap.config({
        nullTargetWarn: false,
        trialWarn: false,
      });
      $(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');

      if ($("a.magnetic-item").length) {
        $("a.magnetic-item").addClass("not-hide-cursor");
      }

      var $mouse = { x: 0, y: 0 }; // Cursor position
      var $pos = { x: 0, y: 0 }; // Cursor position
      var $ratio = 0.15; // delay follow cursor
      var $active = false;
      var $ball = $("#ball");

      var $ballWidth = 20; // Ball default width
      var $ballHeight = 20; // Ball default height
      var $ballOpacity = 0.5; // Ball default opacity
      var $ballBorderWidth = 2; // Ball default border width

      gsap.set($ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
        width: $ballWidth,
        height: $ballHeight,
        borderWidth: $ballBorderWidth,
        opacity: $ballOpacity,
      });

      document.addEventListener("mousemove", mouseMove);

      function mouseMove(e) {
        $mouse.x = e.clientX;
        $mouse.y = e.clientY;
      }

      gsap.ticker.add(updatePosition);

      function updatePosition() {
        if (!$active) {
          $pos.x += ($mouse.x - $pos.x) * $ratio;
          $pos.y += ($mouse.y - $pos.y) * $ratio;

          gsap.set($ball, { x: $pos.x, y: $pos.y });
        }
      }

      $(".magnetic-wrap").mousemove(function (e) {
        parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
        callParallax(e, this);
      });

      function callParallax(e, parent) {
        parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
      }

      function parallaxIt(e, parent, target, movement) {
        var boundingRect = parent.getBoundingClientRect();
        var relX = e.clientX - boundingRect.left;
        var relY = e.clientY - boundingRect.top;

        gsap.to(target, {
          duration: 0.3,
          x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
          y:
            ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
          ease: Power2.easeOut,
        });
      }

      function parallaxCursor(e, parent, movement) {
        var rect = parent.getBoundingClientRect();
        var relX = e.clientX - rect.left;
        var relY = e.clientY - rect.top;
        $pos.x =
          rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
        $pos.y =
          rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
        gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
      }

      // Magic cursor behavior
      // ======================

      // Magnetic item hover.
      $(".magnetic-wrap")
        .on("mouseenter mouseover", function (e) {
          $ball.addClass("magnetic-active");
          gsap.to($ball, { duration: 0.3, width: 70, height: 70, opacity: 1 });
          $active = true;
        })
        .on("mouseleave", function (e) {
          $ball.removeClass("magnetic-active");
          gsap.to($ball, {
            duration: 0.3,
            width: $ballWidth,
            height: $ballHeight,
            opacity: $ballOpacity,
          });
          gsap.to(this.querySelector(".magnetic-item"), {
            duration: 0.3,
            x: 0,
            y: 0,
            clearProps: "all",
          });
          $active = false;
        });

      // Alternative cursor style on hover.
      $(
        ".cursor-alter, .tt-main-menu-list > li > a, .tt-main-menu-list > li > .tt-submenu-trigger > a",
      )
        .not(".magnetic-item") // omit from selection.
        .on("mouseenter", function () {
          gsap.to($ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.2,
            backgroundColor: "#CCC",
            width: "90px",
            height: "90px",
          });
        })
        .on("mouseleave", function () {
          gsap.to($ball, {
            duration: 0.3,
            borderWidth: $ballBorderWidth,
            opacity: $ballOpacity,
            backgroundColor: "transparent",
            width: $ballWidth,
            height: $ballHeight,
            clearProps: "backgroundColor",
          });
        });

      // Cursor view on hover (data attribute "data-cursor="...").
      $("[data-cursor]").each(function () {
        $(this)
          .on("mouseenter", function () {
            $ball
              .addClass("ball-view")
              .append('<div class="ball-view-inner"></div>');
            $(".ball-view-inner").append($(this).attr("data-cursor"));

            gsap.to($ball, {
              duration: 0.3,
              yPercent: -75,
              padding: "8px 20px", // ✅ instead of fixed width/height
              opacity: 1,
              borderWidth: 0,
              height: "auto", // ✅ allow auto height
            });

            gsap.to(".ball-view-inner", {
              duration: 0.3,
              scale: 1,
              autoAlpha: 1,
            });
          })
          .on("mouseleave", function () {
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -50,
              width: $ballWidth, // back to default circle
              height: $ballHeight,
              opacity: $ballOpacity,
              borderWidth: $ballBorderWidth,
              padding: 0, // ✅ reset padding
            });
            $ball.removeClass("ball-view").find(".ball-view-inner").remove();
          });
        $(this).addClass("not-hide-cursor");
      });

      // Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
      $(".swiper").each(function () {
        if ($(this).parent().attr("data-simulate-touch") === "true") {
          if ($(this).parent().hasClass("cursor-drag")) {
            $(this)
              .on("mouseenter", function () {
                $ball.append('<div class="ball-drag"></div>');
                gsap.to($ball, {
                  duration: 0.3,
                  width: 60,
                  height: 60,
                  opacity: 1,
                });
              })
              .on("mouseleave", function () {
                $ball.find(".ball-drag").remove();
                gsap.to($ball, {
                  duration: 0.3,
                  width: $ballWidth,
                  height: $ballHeight,
                  opacity: $ballOpacity,
                });
              });
            $(this).addClass("not-hide-cursor");

            // Ignore "data-cursor" on hover.
            $(this)
              .find("[data-cursor]")
              .on("mouseenter mouseover", function () {
                $ball.find(".ball-drag").remove();
                return false;
              })
              .on("mouseleave", function () {
                $ball.append('<div class="ball-drag"></div>');
                gsap.to($ball, {
                  duration: 0.3,
                  width: 60,
                  height: 60,
                  opacity: 1,
                });
              });
          }
        }
      });

      // Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
      $(".swiper").each(function () {
        if ($(this).parent().attr("data-simulate-touch") === "true") {
          if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
            $(this)
              .on("mousedown pointerdown", function (e) {
                if (e.which === 1) {
                  // Affects the left mouse button only!
                  gsap.to($ball, {
                    duration: 0.2,
                    width: 60,
                    height: 60,
                    opacity: 1,
                  });
                  $ball.append('<div class="ball-drag"></div>');
                }
              })
              .on("mouseup pointerup", function () {
                $ball.find(".ball-drag").remove();
                if ($(this).find("[data-cursor]:hover").length) {
                } else {
                  gsap.to($ball, {
                    duration: 0.2,
                    width: $ballWidth,
                    height: $ballHeight,
                    opacity: $ballOpacity,
                  });
                }
              })
              .on("mouseleave", function () {
                $ball.find(".ball-drag").remove();
                gsap.to($ball, {
                  duration: 0.2,
                  width: $ballWidth,
                  height: $ballHeight,
                  opacity: $ballOpacity,
                });
              });

            // Ignore "data-cursor" on mousedown.
            $(this)
              .find("[data-cursor]")
              .on("mousedown pointerdown", function () {
                return false;
              });

            // Ignore "data-cursor" on hover.
            $(this)
              .find("[data-cursor]")
              .on("mouseenter mouseover", function () {
                $ball.find(".ball-drag").remove();
                return false;
              });
          }
        }
      });

      // Cursor close on hover.
      $(".cursor-close").each(function () {
        $(this).addClass("ball-close-enabled");
        $(this)
          .on("mouseenter", function () {
            $ball.addClass("ball-close-enabled");
            $ball.append('<div class="ball-close">Close</div>');
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -75,
              width: 80,
              height: 80,
              opacity: 1,
            });
            gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
          })
          .on("mouseleave click", function () {
            $ball.removeClass("ball-close-enabled");
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -50,
              width: $ballWidth,
              height: $ballHeight,
              opacity: $ballOpacity,
            });
            $ball.find(".ball-close").remove();
          });

        // Hover on "cursor-close" inner elements.
        $(
          ".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor",
        )
          .not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
          .on("mouseenter", function () {
            $ball.removeClass("ball-close-enabled");
          })
          .on("mouseleave", function () {
            $ball.addClass("ball-close-enabled");
          });
      });

      // Show/hide magic cursor
      // =======================

      // Hide on hover.
      $(
        "a, button, .tt-btn, .tt-form-control, .tt-form-radio, .tt-form-check, .hide-cursor",
      ) // class "hide-cursor" is for global use.
        .not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
        .not(".cursor-alter") // omit from selection
        .not(".tt-main-menu-list > li > a") // omit from selection
        .not(".tt-main-menu-list > li > .tt-submenu-trigger > a") // omit from selection
        .on("mouseenter", function () {
          gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
        })
        .on("mouseleave", function () {
          gsap.to($ball, { duration: 0.3, scale: 1, opacity: $ballOpacity });
        });

      // Hide on click.
      $("a")
        .not('[target="_blank"]') // omit from selection.
        .not('[href^="#"]') // omit from selection.
        .not('[href^="mailto"]') // omit from selection.
        .not('[href^="tel"]') // omit from selection.
        .not(".lg-trigger") // omit from selection.
        .not(".video-player") // omit from selection.
        .not(".tt-btn-disabled") // omit from selection.
        .on("click", function () {
          gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
        });

      // Show/hide on document leave/enter.
      $(document)
        .on("mouseleave", function () {
          gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
        })
        .on("mouseenter", function () {
          gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
        });

      // Show as the mouse moves.
      $(document).mousemove(function () {
        gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
      });
    }
  }

  //Counter Js
  document.querySelectorAll(".counter_number").forEach((el) => {
    const rawText = el.textContent.trim();
    const finalValue = parseInt(rawText, 10) || 0;

    // 🔍 detect if we should show leading zero
    const hasLeadingZero =
      finalValue >= 10 || (rawText.length > 1 && rawText.startsWith("0"));

    const counter = { value: 0 };

    gsap.to(counter, {
      value: finalValue,
      duration: 0.7,
      ease: "none",
      snap: { value: 1 }, // 🔥 integer steps only
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        let v = counter.value;
        el.textContent = hasLeadingZero && v < 10 ? "0" + v : v;
      },
    });
  });

  // Handle click on the input item
  $(".custom-select-dropdown").on("click", function () {
    if ($(this).closest(".date-field, .hotel-date-field").length) {
      return;
    }
  });

  $(".single-search-box, .single-field").each(function () {
    var $box = $(this);
    var $dropdown = $box.find(".custom-select-dropdown");
    var $input = $dropdown.find("input");
    var $wrap = $box.find(".custom-select-wrap");
    var $searchInput = $wrap.find(".custom-select-search-area input");

    // Toggle dropdown on click
    $dropdown.on("click", function (e) {
      if ($box.hasClass("date-field") || $box.hasClass("hotel-date-field")) {
        return;
      }

      e.stopPropagation();
      $(".single-calendar").removeClass("active");
      $(".filter-input .date-field").removeClass("is-calendar-active");
      $(".form-inner")
        .has(".date-field-area + .single-calendar")
        .removeClass("is-calendar-active");
      $(".multi-calendar").removeClass("active");
      $(".hotel-date-field").removeClass("is-calendar-active");
      window.activeHotelDateField = null;
      window.activeRangeDateField = null;
      $(".custom-select-wrap").removeClass("active"); // Close others
      $wrap.toggleClass("active");
    });

    // Handle option click
    $wrap.find(".option-list-destination li").on("click", function () {
      var country = $(this).find(".destination .ui-title").text();
      var destination = $(this).find(".destination span").text();
      var displayLabel = destination;
      const countryDestinationHtml = `<div class="destination"><strong class="ui-title">${country}</strong><span>${displayLabel}</span></div>`;
      $box.find(".input-field-value").empty().html(countryDestinationHtml); // ✅ FIXED
      $input.val(country + destination);
      $wrap.removeClass("active");
    });

    $wrap.find(".option-list li").on("click", function () {
      var value = $(this).find(".ui-title").text();
      $input.val(value);
      $wrap.removeClass("active");
    });

    // Search filter
    $searchInput.on("input", function () {
      var searchText = $(this).val().toLowerCase();
      $wrap
        .find(".option-list-destination li, .option-list li")
        .each(function () {
          var destinationText = $(this)
            .find(".destination .ui-title, .ui-title")
            .text()
            .toLowerCase();
          $(this).toggle(destinationText.includes(searchText));
        });
    });

    // Close dropdown on click outside
    $(document).on("click", function (event) {
      if (!$(event.target).closest($box).length) {
        $wrap.removeClass("active");
      }
    });
  });

  // calender
  $(function () {
    const today = moment();
    const checkOutDefault = moment().add(3, "days");
    const tomorrow = moment().add(1, "days");
    window.activeHotelDateField = null;
    window.activeRangeDateField = null;

    function updateRangeDateFieldDisplay($field, startMoment, endMoment) {
      if (!$field || !$field.length) return;

      const $display = $field.find(".hotel-selected-date-range").first();
      const $input = $field.find("input.hotel-checkin").first();
      const formattedStart = startMoment.format("DD MMM");
      const formattedEnd = endMoment.format("DD MMM");
      const formattedRange = `${formattedStart}-${formattedEnd}`;
      const metaLabel = "Check In-Check Out";

      $input.val(formattedRange);
      $display.html(
        `<strong class="ui-title">${formattedRange}</strong><span>${metaLabel}</span>`,
      );
    }

    $(".hotel-date-field").each(function () {
      updateRangeDateFieldDisplay($(this), tomorrow, checkOutDefault);
    });

    $(
      ".hotel-date-field .custom-select-dropdown, .hotel-date-field .custom-select-dropdown input",
    ).on("click", function (e) {
      e.stopPropagation();
      const $currentRangeDateField = $(this).closest(".hotel-date-field");
      $(".custom-select-wrap").removeClass("active");
      $(".hotel-date-field").removeClass("is-calendar-active");
      $(".multi-calendar").removeClass("active");
      $currentRangeDateField.addClass("is-calendar-active");
      window.activeHotelDateField = $currentRangeDateField;
      window.activeRangeDateField = $currentRangeDateField;
      $currentRangeDateField.find(".multi-calendar").first().addClass("active");
    });

    $(document).on("click", ".multi-calendar .calendar-check", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).closest(".multi-calendar").removeClass("active");
      $(".hotel-date-field").removeClass("is-calendar-active");
      window.activeHotelDateField = null;
      window.activeRangeDateField = null;
    });

    $(document).on("click", ".single-calendar", function (e) {
      e.stopPropagation();
      $(".custom-select-wrap").removeClass("active");
    });

    $(document).on("click", ".single-calendar-check", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const $tourCalendar = $(this).closest(".single-calendar");
      const $dateField = $tourCalendar.closest(".date-field").length
        ? $tourCalendar.closest(".date-field")
        : $tourCalendar.closest(".form-inner");
      $tourCalendar.removeClass("active");
      $dateField.removeClass("is-calendar-active");
      return false;
    });

    $(document).on("click", ".date-field-area", function (e) {
      const $formInner = $(this).closest(".form-inner");
      const $calendar = $formInner.children(".single-calendar").first();

      if (!$formInner.length || !$calendar.length) {
        return;
      }

      e.stopPropagation();

      $(".custom-select-wrap").removeClass("active");
      $(".form-inner")
        .has(".date-field-area + .single-calendar")
        .removeClass("is-calendar-active");
      $(".form-inner > .single-calendar").removeClass("active");

      $formInner.addClass("is-calendar-active");
      $calendar.addClass("active");
    });

    // Tour details
    const defaultTourBookingDate = moment(today).format("MMM DD, YYYY");
    const defaultTourBookingLabel = moment(today).format("D MMMM");
    const defaultTourBookingMeta = moment(today).format("dddd YYYY");
    $("#enquiryModal .date-field-area input").val(
      moment(today).format("D MMMM YYYY"),
    );

    $(".filter-input .date-field").each(function () {
      const $dateField = $(this);
      const $dateInput = $dateField
        .find('.custom-select-dropdown input[type="text"]')
        .first();
      const $dateDisplay = $dateField.find(".selected-date").first();

      if ($dateInput.length) {
        $dateInput.val(defaultTourBookingDate);
      }

      if ($dateDisplay.length) {
        $dateDisplay.html(
          `<strong class="ui-title">${defaultTourBookingLabel}</strong><span>${defaultTourBookingMeta}</span>`,
        );
      }
    });

    document.addEventListener(
      "click",
      function (event) {
        const segment = event.target.closest(
          ".hotel-availability-filter .filter-segment",
        );

        if (!segment) {
          return;
        }

        const filter = segment.closest(".hotel-availability-filter");

        if (!filter) {
          return;
        }

        filter.querySelectorAll(".filter-segment").forEach(function (item) {
          item.classList.remove("active");
        });
        segment.classList.add("active");

        if (
          segment.classList.contains("date-search-wrap") &&
          !event.target.closest(
            ".guest-field .custom-select-wrap, .room-field .custom-select-wrap",
          )
        ) {
          filter
            .querySelectorAll(".custom-select-wrap")
            .forEach(function (item) {
              item.classList.remove("active");
            });
        } else {
          filter.querySelectorAll(".single-calendar").forEach(function (item) {
            item.classList.remove("active");
          });
          filter.querySelectorAll(".date-field").forEach(function (item) {
            item.classList.remove("is-calendar-active");
          });
        }
      },
      true,
    );

    $(document).on(
      "click",
      ".filter-input .date-field .custom-select-dropdown, .filter-input .date-field .custom-select-dropdown input",
      function (e) {
        e.stopPropagation();
        const $currentDateField = $(this).closest(".date-field");
        $(".custom-select-wrap").removeClass("active");
        $(".filter-input .date-field").removeClass("is-calendar-active");
        $(".single-calendar").removeClass("active");
        $currentDateField.addClass("is-calendar-active");
        $currentDateField.find(".single-calendar").first().addClass("active");
      },
    );
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(
          ".multi-calendar, .hotel-date-field, .hotel-date-field .custom-select-dropdown",
        ).length
      ) {
        $(".multi-calendar").removeClass("active");
        $(".hotel-date-field").removeClass("is-calendar-active");
        window.activeHotelDateField = null;
        window.activeRangeDateField = null;
      }

      // Close calendar when clicking outside
      if (
        !$(e.target).closest(
          ".single-calendar, .date-field, .custom-select-dropdown, .selected-date",
        ).length
      ) {
        $(".single-calendar").removeClass("active");
        $(".filter-input .date-field").removeClass("is-calendar-active");
        $(".form-inner")
          .has(".date-field-area + .single-calendar")
          .removeClass("is-calendar-active");
      }
    });
  });

  //Quantity Increment Guest
  function updateHotelGuestSummary($roomField) {
    let totalAdults = 0;
    let totalChildren = 0;

    $roomField.find('input[name="adult_quantity"]').each(function () {
      totalAdults += parseInt($(this).val(), 10) || 0;
    });

    $roomField.find('input[name="child_quantity"]').each(function () {
      totalChildren += parseInt($(this).val(), 10) || 0;
    });

    $roomField.find("#adult-qty").text(totalAdults);
    $roomField.find("#child-qty").text(totalChildren);
  }

  function updateRoomTitles($roomField) {
    $roomField.find(".room-list .single-room").each(function (index) {
      $(this)
        .find(".room-title .ui-title")
        .text(`Room-${index + 1}`);
    });
  }

  function updateRoomSummary($roomField) {
    const roomCount = $roomField.find(".room-list .single-room").length;
    $roomField.find(".custom-select-dropdown span strong").text(roomCount);

    if (roomCount <= 1) {
      $roomField.find(".room-delete-btn").hide();
    } else {
      $roomField.find(".room-delete-btn").show();
    }
  }

  function createNewRoom($roomField) {
    const $lastRoom = $roomField.find(".room-list .single-room").last();
    const $newRoom = $lastRoom.clone();

    $newRoom.find('input[name="adult_quantity"]').val(1);
    $newRoom.find('input[name="child_quantity"]').val(0);
    $newRoom.find(".guest-count").hide();
    $newRoom.removeClass("active-room");

    return $newRoom;
  }

  function updateFlightGuestSummary($guestField) {
    const adults =
      parseInt(
        $guestField.find('input[name="flight_adult_quantity"]').first().val(),
        10,
      ) || 0;
    const children =
      parseInt(
        $guestField.find('input[name="flight_child_quantity"]').first().val(),
        10,
      ) || 0;

    $guestField.find(".guest-adult-qty").text(adults);
    $guestField.find(".guest-child-qty").text(children);
  }

  const maxRooms = 5;
  const maxFlightGuests = 12;

  $(".room-field .add-btn").on("click", function () {
    const $roomField = $(this).closest(".room-field");
    const roomCount = $roomField.find(".room-list .single-room").length;

    if (roomCount >= maxRooms) {
      $(this).prop("disabled", true).addClass("disabled");
      return;
    }

    const $newRoom = createNewRoom($roomField);

    $roomField
      .find(".room-list .single-room")
      .removeClass("active-room")
      .find(".guest-count")
      .slideUp(0);

    $roomField.find(".room-list").append($newRoom);
    $newRoom.addClass("active-room").find(".guest-count").slideDown(200);

    updateRoomTitles($roomField);
    updateRoomSummary($roomField);
    updateHotelGuestSummary($roomField);

    if ($roomField.find(".room-list .single-room").length >= maxRooms) {
      $(this).prop("disabled", true).addClass("disabled");
    }
  });

  $(document).on(
    "click",
    ".guest-quantity__plus, .guest-quantity__minus",
    function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $btn = $(this);
      const $input = $btn.siblings(".quantity__input");
      const $roomField = $btn.closest(".room-field");
      const $guestField = $btn.closest(".guest-field");
      const type = $btn.data("type");
      let value = parseInt($input.val(), 10) || 0;

      if ($guestField.length) {
        const $adultInput = $guestField
          .find('input[name="flight_adult_quantity"]')
          .first();
        const $childInput = $guestField
          .find('input[name="flight_child_quantity"]')
          .first();
        const totalPeople =
          (parseInt($adultInput.val(), 10) || 0) +
          (parseInt($childInput.val(), 10) || 0);

        if ($btn.hasClass("guest-quantity__minus")) {
          if (
            (type === "adult" && value > 1) ||
            (type === "child" && value > 0)
          ) {
            $input.val(value - 1);
          }
        } else if (totalPeople < maxFlightGuests) {
          $input.val(value + 1);
        }

        updateFlightGuestSummary($guestField);
        return;
      }

      if ($roomField.length) {
        if ($btn.hasClass("guest-quantity__minus")) {
          if (
            (type === "adult" && value > 1) ||
            (type === "child" && value > 0)
          ) {
            $input.val(value - 1);
          }
        } else {
          $input.val(value + 1);
        }

        updateHotelGuestSummary($roomField);
      }
    },
  );

  $(document).on("click", ".room-field .room-delete-btn", function (e) {
    e.stopPropagation();

    const $roomField = $(this).closest(".room-field");
    $(this).closest(".single-room").remove();

    updateRoomTitles($roomField);
    updateRoomSummary($roomField);
    updateHotelGuestSummary($roomField);

    const $rooms = $roomField.find(".room-list .single-room");

    if ($rooms.length > 0) {
      $rooms.removeClass("active-room").find(".guest-count").slideUp(0);
      $rooms.last().addClass("active-room").find(".guest-count").slideDown(200);
    }

    if ($rooms.length < maxRooms) {
      $roomField
        .find(".add-btn")
        .prop("disabled", false)
        .removeClass("disabled");
    }
  });

  $(document).on("click", ".room-field .room-title", function () {
    const $thisRoom = $(this).closest(".single-room");
    const $roomField = $(this).closest(".room-field");

    if ($thisRoom.hasClass("active-room")) return;

    $roomField
      .find(".single-room")
      .not($thisRoom)
      .removeClass("active-room")
      .find(".guest-count")
      .slideUp(200);
    $thisRoom.addClass("active-room").find(".guest-count").slideDown(200);
  });

  $(document).ready(function () {
    $(".room-field").each(function () {
      const $roomField = $(this);
      $roomField
        .find(".room-list .single-room")
        .first()
        .find(".guest-count")
        .show();
      $roomField
        .find(".room-list .single-room")
        .first()
        .addClass("active-room");
      updateRoomTitles($roomField);
      updateRoomSummary($roomField);
      updateHotelGuestSummary($roomField);
    });

    $(".guest-field").each(function () {
      updateFlightGuestSummary($(this));
    });
  });

  $(document).ready(function () {
    $(".filter-item-list .single-item").on("click", function () {
      const $clickedItem = $(this);
      const filterId = $clickedItem.attr("id");

      if (!filterId) return;

      $clickedItem.addClass("active").siblings().removeClass("active");

      $(".filter-input-wrap > .filter-input")
        .removeClass("show")
        .filter(`[data-id="${filterId}"]`)
        .addClass("show");
    });

    $(".transport-page-filter").each(function () {
      const $transportFilter = $(this);
      const $bookingTypeItems = $transportFilter.find(".booking-type-item");
      const $filterInputs = $transportFilter.find(".filter-input");
      const $transportPageWrappers = $(
        ".hotel-transport-page .transport-page-wrapper",
      );

      function setTransportFilter(filterId) {
        if (!filterId) return;

        $bookingTypeItems
          .removeClass("active")
          .filter(`#${filterId}`)
          .addClass("active");

        $filterInputs
          .removeClass("show")
          .filter(`[data-id="${filterId}"]`)
          .addClass("show");

        $transportPageWrappers
          .removeClass("show")
          .filter(`[data-id="${filterId}"]`)
          .addClass("show");
      }

      setTransportFilter(
        $bookingTypeItems.filter(".active").first().attr("id") ||
          $bookingTypeItems.first().attr("id"),
      );

      $bookingTypeItems.on("click", function (e) {
        e.preventDefault();
        setTransportFilter($(this).attr("id"));
      });
    });
  });

  // Hotel Country Filter
  $(document).ready(function () {
    $(".hotel-home-hotels-section .country-list .more-btn").on(
      "click",
      function () {
        const $moreButton = $(this);
        $moreButton.siblings(".hidden-country").removeClass("hidden-country");
        $moreButton.hide();
      },
    );

    $(".hotel-home-hotels-section .country-list .single-country").on(
      "click",
      function () {
        const $clickedCategory = $(this);
        const categoryId = $clickedCategory.attr("id");

        if (!categoryId) return;

        const $tourSection = $clickedCategory.closest(
          ".hotel-home-hotels-section",
        );
        const $tourPackageList = $tourSection.find(".hotel-list").first();

        $clickedCategory
          .addClass("active")
          .siblings(".single-country")
          .removeClass("active");

        $tourPackageList
          .find(".hotel-card-wrapper")
          .removeClass("show")
          .filter(function () {
            return $(this).attr("data-country") === categoryId;
          })
          .addClass("show");
      },
    );
  });

  // Menu Destination hide show
  $("header.style-1 .mega-menu .menu-single-item").on("click", function () {
    if (!window.matchMedia("(min-width: 992px)").matches) return;

    const region = $(this).attr("id");
    const $megaMenu = $(this).closest(".mega-menu");

    if (!region || !$megaMenu.length) return;

    $megaMenu.find(".menu-destination-area").removeClass("show");
    $megaMenu
      .find(`.menu-destination-area[data-region="${region}"]`)
      .addClass("show");
  });

  // Language Btn
  $(".language-btn").on("click", function (e) {
    let parent = $(this).parent();
    parent.find(".region-language-area").toggleClass("active");
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".language-btn, .region-language-area").length) {
      $(".region-language-area").removeClass("active");
    }
  });

  //Region Language Area Hide Show
  $(".language-area .region-language-area").each(function () {
    const $area = $(this);
    const $navItems = $area.find(".language-currency-nav li");
    const $contentWraps = $area.find(".language-currency-content-wrap");
    const activeId =
      $navItems.filter(".active").attr("id") || $navItems.first().attr("id");

    $contentWraps.hide();
    $contentWraps.filter(`[data-id="${activeId}"]`).show();
  });

  $(".language-area .region-language-area .language-currency-nav li").on(
    "click",
    function () {
      const $this = $(this);
      const tabId = $this.attr("id");
      const $area = $this.closest(".region-language-area");

      if (!tabId || !$area.length) return;

      $this.addClass("active").siblings().removeClass("active");
      $area.find(".language-currency-content-wrap").hide();
      $area.find(`.language-currency-content-wrap[data-id="${tabId}"]`).show();
    },
  );

  // Tour package sidebar activities expand
  $(".checkbox-container span.expand").on("click", function () {
    const $checkboxContainer = $(this).closest(".checkbox-container");

    $checkboxContainer.find("ul").height("auto");
    $(this).hide();
  });

  // Sidebar list filters
  $(document).on(
    "click",
    ".hotel-package-filter-area .single-widgets .tour-category li, .hotel-package-filter-area .single-widgets .departure-time-list li",
    function () {
      $(this).toggleClass("active");
    },
  );

  // sidebar filter clear button
  const clearBtns = document.querySelectorAll("#clear-filters, .clear-filters");

  if (clearBtns.length) {
    clearBtns.forEach(function (clearBtn) {
      clearBtn.addEventListener("click", function () {
        const filterArea =
          clearBtn.closest(".hotel-package-filter-area") || document;

        // 1. Uncheck all checkboxes
        filterArea
          .querySelectorAll("input[type='checkbox']")
          .forEach(function (checkbox) {
            checkbox.checked = false;
          });

        // 2. Clear active list filter selections
        filterArea
          .querySelectorAll(
            ".tour-category li.active, .departure-time-list li.active",
          )
          .forEach(function (listItem) {
            listItem.classList.remove("active");
          });

        // 3. Reset range sliders to their default start values
        filterArea
          .querySelectorAll(".price-range-slider")
          .forEach(function (slider) {
            if (!slider.noUiSlider) return;

            const startMin =
              Number(slider.dataset.startMin) ||
              Number(slider.dataset.min) ||
              0;
            const startMax =
              Number(slider.dataset.startMax) ||
              Number(slider.dataset.max) ||
              startMin;
            slider.noUiSlider.set([startMin, startMax]);
          });

        // 4. Collapse expanded sidebar lists and restore their See More buttons
        filterArea
          .querySelectorAll(".checkbox-container.two ul")
          .forEach(function (list) {
            list.style.height = "";
          });

        filterArea
          .querySelectorAll(".checkbox-container.two span.expand")
          .forEach(function (expandButton) {
            expandButton.style.display = "block";
          });
      });
    });
  }

  // Handle parent to child checkbox behavior
  jQuery('.sidebar-category-dropdown .containerss input[type="checkbox"]').on(
    "change",
    function () {
      const isChecked = $(this).prop("checked");
      const $container = $(this).closest(".containerss");
      const $checkboxes = $container
        .next("ul")
        .find('li input[type="checkbox"]');
      $checkboxes.prop("checked", isChecked);
    },
  );

  // Handle child to parent checkbox behavior
  jQuery('.sub-category li input[type="checkbox"]').on("change", function () {
    const $subCategory = $(this).closest("ul.sub-category");
    const $parentCheckbox = $subCategory
      .prevAll("label.containerss")
      .find('input[type="checkbox"]');

    if ($(this).prop("checked")) {
      $parentCheckbox.prop("checked", true);
    } else {
      // If no other siblings are checked, uncheck the parent
      const anyChecked =
        $subCategory.find('input[type="checkbox"]:checked').length > 0;
      $parentCheckbox.prop("checked", anyChecked);
    }
  });

  jQuery(".sidebar-category-icon").on("click", function () {
    jQuery(this).toggleClass("active");
    jQuery(this).siblings(".sub-category").stop(true, true).slideToggle();
  });

  jQuery(
    ".hotel-transport-filter .widget-title, .hotel-filter .widget-title",
  )
    .filter(function () {
      return jQuery(this).siblings(".checkbox-container").length;
    })
    .addClass("collapsible-widget-title")
    .on("click", function () {
      const $widgetTitle = jQuery(this);
      const $checkboxContainer = $widgetTitle
        .siblings(".checkbox-container")
        .first();

      if (!$checkboxContainer.length) return;

      $widgetTitle.toggleClass("active");
      $checkboxContainer.stop(true, true).slideToggle();
    });

  function updateTransportDetailsHeight($card) {
    const details = $card.find(".transport-card-details").get(0);

    if (!details) return;

    const detailsStyle = window.getComputedStyle(details);
    const columns = detailsStyle.gridTemplateColumns.split(" ").length;
    const rowGap = parseFloat(detailsStyle.rowGap) || 0;
    const paddingTop = window.matchMedia("(max-width: 767px)").matches
      ? 22
      : 25;
    const paddingBottom = paddingTop;
    const childHeights = Array.from(details.children).map(
      (child) => child.scrollHeight,
    );
    const contentHeight =
      columns === 1
        ? childHeights.reduce((total, height) => total + height, 0) +
          rowGap * Math.max(childHeights.length - 1, 0)
        : Math.max(...childHeights, 0);
    const detailsHeight = Math.ceil(contentHeight + paddingTop + paddingBottom);

    details.style.setProperty(
      "--transport-card-details-height",
      `${detailsHeight}px`,
    );
  }

  function updateActiveTransportDetailsHeights() {
    jQuery(".hotel-transport-card.ticket.active").each(function () {
      updateTransportDetailsHeight(jQuery(this));
    });
  }

  jQuery(".hotel-transport-card.ticket").each(function () {
    const $card = jQuery(this);
    const $button = $card.find(".details-btn").first();
    const isOpen = $card.hasClass("active") || $button.hasClass("active");

    $card.toggleClass("active", isOpen);
    $button.toggleClass("active", isOpen);
    $button.attr("aria-expanded", isOpen);

    if (isOpen) updateTransportDetailsHeight($card);
  });

  jQuery(".hotel-transport-card.ticket .details-btn").on("click", function () {
    const $button = jQuery(this);
    const $card = $button.closest(".hotel-transport-card.ticket");
    const isOpen = !$card.hasClass("active");

    $button.toggleClass("active", isOpen);
    $button.attr("aria-expanded", isOpen);
    $card.toggleClass("active", isOpen);

    if (isOpen) updateTransportDetailsHeight($card);
  });

  jQuery(window).on("load resize", updateActiveTransportDetailsHeights);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateActiveTransportDetailsHeights);
  }

  // Filter sidebar
  $(".filter-btn").on("click", function (e) {
    e.stopPropagation();

    $(".hotel-package-filter-area").toggleClass("slide");
    $(this).toggleClass("active"); // Toggle active class on filter button
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".hotel-package-filter-area, .filter-btn").length
    ) {
      $(".hotel-package-filter-area").removeClass("slide");
      $(".filter-btn").removeClass("active"); // Remove active class when clicked outside
    }
  });

  //list grid view
  $(".grid-view li").on("click", function () {
    // Get the class of the clicked li element
    var clickedClass = $(this).attr("class");
    // Extract the class name without "item-" prefix
    var className = clickedClass.replace("item-", "");
    // Add a new class to the target div and remove old classes
    var targetDiv = $(".list-grid-product-wrap");
    targetDiv
      .removeClass()
      .addClass("list-grid-product-wrap " + className + "-wrapper");
    // Remove the 'selected' class from siblings and add it to the clicked element
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });

  // Copy Link Btn (MULTIPLE SUPPORT)
  document.addEventListener("DOMContentLoaded", function () {
    const copyBtns = document.querySelectorAll(".copy-link-btn");

    if (!copyBtns.length) return;

    copyBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const copyAlert = btn.querySelector(".copy-alert"); // scoped to this button
        if (!copyAlert) return;

        navigator.clipboard.writeText(window.location.href).then(() => {
          // restart animation if clicked quickly
          copyAlert.classList.remove("show");
          void copyAlert.offsetWidth; // force reflow
          copyAlert.classList.add("show");

          clearTimeout(copyAlert._timer);
          copyAlert._timer = setTimeout(() => {
            copyAlert.classList.remove("show");
          }, 2000);
        });
      });
    });
  });

  // Package Details toggle price show option
  document.querySelectorAll(".partial-payment-box").forEach((box) => {
    const toggle = box.querySelector(".partial-payment-toggle");
    const price = box.querySelector(".partial-payment-price");

    if (toggle && price) {
      toggle.addEventListener("change", function () {
        price.classList.toggle("show", this.checked);
      });
    }
  });

  // star-rating
  $(".rating-container .star-icon").each(function () {
    let self = $(this);

    self.on("mouseenter", function () {
      $(this).prevAll().addBack().addClass("hovered");
    });

    self.on("mouseleave", function () {
      $(".star-icon").removeClass("hovered");
    });

    self.on("click", function () {
      const rating = $(this).prevAll().length + 1;
      const parent = $(this).parent();
      parent.attr("data-rating", rating);

      parent.find(".star-icon").removeClass("selected");
      parent.find(".star-icon").each(function (index) {
        if (index < rating) {
          $(this).addClass("selected");
        }
      });
    });

    // On load or if data-rating already exists
    const parent = self.parent();
    const initRating = parseInt(parent.attr("data-rating")) || 0;
    parent.find(".star-icon").each(function (index) {
      if (index < initRating) {
        $(this).addClass("selected");
      }
    });
  });

  // Image Upload Drop Area
  if (
    typeof Dropzone !== "undefined" &&
    document.querySelector(".dropzone-1")
  ) {
    new Dropzone(".dropzone-1", {
      url: "#",
      method: "get",
      dictDefaultMessage: ``,
      previewTemplate: document.querySelector(".my-template").innerHTML,
    });
  }

  // Main Home AI Chatbox
  jQuery(function ($) {
    const chatbox = $("#hotelAiChatboxPopup");
    const aiButtons = $("header .ai-btn, .hotel-topbar-area .ai-btn");
    const startButton = chatbox.find(".hotel-ai-chatbox-start-btn");
    const newChatButton = chatbox.find(".hotel-ai-chatbox-new-chat");
    const introState = chatbox.find(".hotel-ai-chatbox-state-intro");
    const chatState = chatbox.find(".hotel-ai-chatbox-state-chat");
    const chatField = chatbox.find(".hotel-ai-chatbox-field");
    const chatMoreButton = chatbox.find(".hotel-ai-chatbox-more-btn");
    const screenshotButton = chatbox.find(".hotel-ai-chatbox-screenshot-btn");
    const uploadButton = chatbox.find(".hotel-ai-chatbox-upload-btn");
    const screenshotInput = chatbox.find(".hotel-ai-chatbox-screenshot-input");
    const uploadInput = chatbox.find(".hotel-ai-chatbox-upload-input");
    const filePreview = chatbox.find(".hotel-ai-chatbox-file-preview");
    let previewObjectUrls = [];

    if (!chatbox.length || !aiButtons.length) return;

    function setChatboxState(isOpen) {
      chatbox.toggleClass("is-open", isOpen);
      chatbox.attr("aria-hidden", isOpen ? "false" : "true");
      aiButtons.attr("aria-expanded", isOpen ? "true" : "false");
    }

    function formatFileSize(size) {
      if (!size) return "0 KB";
      if (size < 1024 * 1024) return Math.ceil(size / 1024) + " KB";
      return (size / (1024 * 1024)).toFixed(1) + " MB";
    }

    function clearFilePreview() {
      previewObjectUrls.forEach(function (url) {
        URL.revokeObjectURL(url);
      });
      previewObjectUrls = [];
      filePreview.empty().removeClass("has-file");
    }

    function renderFilePreview(files, allowImage, appendFiles) {
      if (!files || !files.length) return;
      if (!appendFiles) {
        clearFilePreview();
      }

      Array.prototype.forEach.call(files, function (file) {
        const isImage = file.type && file.type.indexOf("image/") === 0;
        if (isImage && !allowImage) return;

        const fileCard = $('<div class="hotel-ai-chatbox-file-card"></div>');
        const fileInfo = $('<span class="file-info"></span>');
        const removeButton = $(
          '<button type="button" class="remove-file" aria-label="Remove selected file">&times;</button>',
        );

        if (isImage) {
          const fileUrl = URL.createObjectURL(file);
          previewObjectUrls.push(fileUrl);
          fileCard.append($("<img>", { src: fileUrl, alt: file.name }));
        } else {
          fileCard.append(
            $(
              '<span class="file-icon"><i class="bi bi-file-earmark"></i></span>',
            ),
          );
          fileInfo
            .append($("<strong></strong>").text(file.name))
            .append($("<span></span>").text(formatFileSize(file.size)));
          fileCard.append(fileInfo);
        }

        fileCard.append(removeButton);
        filePreview.append(fileCard).addClass("has-file");
      });
    }

    aiButtons.attr({
      role: "button",
      "aria-controls": "hotelAiChatboxPopup",
      "aria-expanded": "false",
    });

    aiButtons.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setChatboxState(!chatbox.hasClass("is-open"));
    });

    chatbox.on("click", function (e) {
      e.stopPropagation();
      if (!$(e.target).closest(".hotel-ai-chatbox-more-btn").length) {
        chatField.removeClass("is-attachment-open");
      }
    });

    startButton.on("click", function (e) {
      e.preventDefault();
      introState.removeClass("is-active");
      chatState.addClass("is-active");
      chatField
        .removeClass("disable is-attachment-open")
        .attr("aria-disabled", "false");
      chatField.find("input, button").prop("disabled", false);
      chatbox.find("#travelAiChatboxInput").trigger("focus");
    });

    newChatButton.on("click", function (e) {
      e.preventDefault();
      introState.addClass("is-active");
      chatState.removeClass("is-active");
      chatField
        .addClass("disable")
        .removeClass("is-attachment-open")
        .attr("aria-disabled", "true");
      chatField.find("input, textarea").val("");
      chatField.find("input, textarea, button").prop("disabled", true);
      clearFilePreview();
    });

    chatMoreButton.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (chatField.hasClass("disable")) return;
      chatField.toggleClass("is-attachment-open");
    });

    screenshotButton.on("click", function (e) {
      e.preventDefault();
      if (chatField.hasClass("disable")) return;
      chatField.removeClass("is-attachment-open");
      screenshotInput.trigger("click");
    });

    uploadButton.on("click", function (e) {
      e.preventDefault();
      if (chatField.hasClass("disable")) return;
      chatField.removeClass("is-attachment-open");
      uploadInput.trigger("click");
    });

    screenshotInput.on("change", function () {
      renderFilePreview(this.files, true, true);
      $(this).val("");
    });

    uploadInput.on("change", function () {
      renderFilePreview(this.files, false, false);
      $(this).val("");
    });

    filePreview.on("click", ".remove-file", function (e) {
      e.preventDefault();
      const img = $(this).closest(".hotel-ai-chatbox-file-card").find("img");
      if (img.length) {
        const src = img.attr("src");
        URL.revokeObjectURL(src);
        previewObjectUrls = previewObjectUrls.filter(function (url) {
          return url !== src;
        });
      }
      $(this).closest(".hotel-ai-chatbox-file-card").remove();
      filePreview.toggleClass("has-file", filePreview.children().length > 0);
    });

    chatField.on("submit", function (e) {
      e.preventDefault();
      introState.removeClass("is-active");
      chatState.addClass("is-active");
      chatField.removeClass("is-attachment-open");
    });

    $(document).on("click", function () {
      chatField.removeClass("is-attachment-open");
      setChatboxState(false);
    });

    $(document).on("keyup", function (e) {
      if (e.key === "Escape") {
        chatField.removeClass("is-attachment-open");
        setChatboxState(false);
      }
    });
  });
})(jQuery);
