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
      .next("ul")
      .slideToggle();
    jQuery(this)
      .parent()
      .siblings()
      .children("ul")
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
      el.style.background = `conic-gradient(var(--single-hotel-primary-color1) ${pct}%, var(--progress-bg) ${pct}%)`;

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
  const demoMenuWrapper = $(".single-hotel-demo-menu-wrapper");

  function setDemoMenuScrollbarWidth() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--demo-scrollbar-width",
      `${scrollbarWidth}px`,
    );
  }

  $(".single-hotel-demo-button").on("click", function () {
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

    $(document).on("click", function (e) {
      if ($(e.target).closest(".support-area").length) return;
      setSupportState(false);
    });
  });

  // Room Details Overview Read More
  jQuery(function ($) {
    $(".room-dt-overview-area .read-more-btn").on("click", function () {
      const btn = $(this);
      const overviewArea = btn.closest(".room-dt-overview-area");
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
  $('[data-fancybox="room-details-gallery"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });
  
  $(".room-details-gallery-wrap .all-gallery-btn").on("click", function (e) {
    const gallerySources = [];

    $(this)
      .closest(".room-details-gallery-wrap")
      .find(".room-details-thumb-gallery img, .room-details-gallery-slider .swiper-slide:not(.swiper-slide-duplicate) img")
      .each(function () {
        const src = $(this).attr("src");

        if (src && !gallerySources.includes(src)) {
          gallerySources.push(src);
        }
      });

    if (!gallerySources.length) return;

    e.preventDefault();
    $.fancybox.open(
      gallerySources.map(function (src) {
        return {
          src: src,
          type: "image",
        };
      }),
      {
        buttons: ["close"],
        loop: false,
        protect: true,
      },
    );
  });
  
  $('[data-fancybox="video-player"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });

  // Single Hotel banner background slider
  if ($(".single-hotel-banner-slider").length) {
    new Swiper(".single-hotel-banner-slider", {
      slidesPerView: 1,
      effect: "fade",
      loop: true,
      speed: 1400,
      allowTouchMove: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".single-hotel-banner-slider-next",
        prevEl: ".single-hotel-banner-slider-prev",
      },
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  // Single Hotel Room Card Slider
  document
    .querySelectorAll(".single-hotel-room-page .room-card-img-slider")
    .forEach((slider, index) => {
      $(slider)
        .next(".slider-pagi-wrap")
        .children(".package-card-img-pagi")
        .addClass(`single-hotel-room-card-img-pagi-${index}`);

      const nextBtn = slider.parentElement.querySelector(
        ".room-card-img-slider-next",
      );
      const prevBtn = slider.parentElement.querySelector(
        ".room-card-img-slider-prev",
      );
      nextBtn?.classList.add(`single-hotel-room-card-img-slider-next-${index}`);
      prevBtn?.classList.add(`single-hotel-room-card-img-slider-prev-${index}`);

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
            el: `.single-hotel-room-card-img-pagi-${index}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.single-hotel-room-card-img-slider-next-${index}`,
            prevEl: `.single-hotel-room-card-img-slider-prev-${index}`,
          },
        });
      }, 0);
    });

  // Single Hotel Room Details Gallery Slider
  if (document.querySelector(".room-details-gallery-slider")) {
    new Swiper(".room-details-gallery-slider", {
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
        nextEl: ".room-details-gallery-next",
        prevEl: ".room-details-gallery-prev",
      },
    });
  }

  // Single Hotel Gallery Slider
  var swiper = new Swiper(".single-hotel-gallery-slider", {
    slidesPerView: "auto",
    speed: 1200,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2200,
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
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 5,
      },
    },
  });

  // Single Hotel Testimonial Slider
  var swiper = new Swiper(".single-hotel-testomonial-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 18,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testimonial-slider-next",
      prevEl: ".testimonial-slider-prev",
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

  // Room Recommended Package Slider
  var swiper = new Swiper(".room-recommended-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
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

  // Single Hotel Holidays Room Offer Slider
  if (document.querySelector(".room-offer-slider")) {
    new Swiper(".room-offer-slider", {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 24,
      grabCursor: true,
      navigation: {
        nextEl: ".room-offer-slider-next",
        prevEl: ".room-offer-slider-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // Single Hotel Holidays Seasonal Offer Slider
  if (document.querySelector(".seasonal-offer-slider")) {
    new Swiper(".seasonal-offer-slider", {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 24,
      grabCursor: true,
      navigation: {
        nextEl: ".seasonal-offer-slider-next",
        prevEl: ".seasonal-offer-slider-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }


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
    if ($(this).closest(".date-field, .single-hotel-date-field").length) {
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
      if (
        $box.hasClass("date-field") ||
        $box.hasClass("single-hotel-date-field")
      ) {
        return;
      }

      e.stopPropagation();
      $(".single-calendar").removeClass("active");
      $(".filter-input .date-field").removeClass("is-calendar-active");
      $(".form-inner")
        .has(".date-field-area + .single-calendar")
        .removeClass("is-calendar-active");
      $(".multi-calendar").removeClass("active");
      $(".single-hotel-date-field").removeClass("is-calendar-active");
      window.activeHotelDateField = null;
      window.activeRangeDateField = null;
      $(".custom-select-wrap").removeClass("active"); // Close others
      $wrap.toggleClass("active");

      if ($box.closest(".room-booking-area").length) {
        $(".room-booking-area .room-field").not($box).removeClass("is-dropdown-active");
        $box.toggleClass("is-dropdown-active", $wrap.hasClass("active"));
      }
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
        if ($box.closest(".room-booking-area").length) {
          $box.removeClass("is-dropdown-active");
        }
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

      const $display = $field
        .find(".single-hotel-selected-date-range")
        .first();
      const $input = $field
        .find("input.single-hotel-checkin")
        .first();
      const formattedStart = startMoment.format("DD MMM");
      const formattedEnd = endMoment.format("DD MMM");
      const formattedRange = `${formattedStart}-${formattedEnd}`;
      const metaLabel = "Check in - Out";

      $input.val(formattedRange);
      $display.html(
        `<strong class="ui-title">${formattedRange}</strong><span>${metaLabel}</span>`,
      );
    }

    $(".single-hotel-date-field").each(function () {
      updateRangeDateFieldDisplay($(this), tomorrow, checkOutDefault);
    });

    $(
      ".single-hotel-date-field .custom-select-dropdown, .single-hotel-date-field .custom-select-dropdown input",
    ).on("click", function (e) {
      e.stopPropagation();
      const $currentRangeDateField = $(this).closest(
        ".single-hotel-date-field",
      );
      $(".custom-select-wrap").removeClass("active");
      $(".single-hotel-date-field").removeClass("is-calendar-active");
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
      $(".single-hotel-date-field").removeClass("is-calendar-active");
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
          ".single-hotel-availability-filter .filter-segment",
        );

        if (!segment) {
          return;
        }

        const filter = segment.closest(".single-hotel-availability-filter");

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
          ".multi-calendar, .single-hotel-date-field, .single-hotel-date-field .custom-select-dropdown",
        ).length
      ) {
        $(".multi-calendar").removeClass("active");
        $(".single-hotel-date-field").removeClass("is-calendar-active");
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

    $roomField.find("#adult-qty, .adult-qty").text(totalAdults);
    $roomField.find("#child-qty, .child-qty").text(totalChildren);
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
    $roomField
      .find(".custom-select-dropdown span strong, .custom-select-dropdown .room-qty")
      .text(roomCount);

    const roomLabel = roomCount === 1 ? "Room" : "Rooms";
    $roomField.find(".custom-select-dropdown > span").each(function () {
      const $summary = $(this);
      if ($summary.find("strong, .room-qty").length) {
        const $count = $summary.find("strong, .room-qty").first();
        $summary.html($count.prop("outerHTML") + " " + roomLabel);
      }
    });

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

  const maxRooms = 5;

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
      const type = $btn.data("type");
      let value = parseInt($input.val(), 10) || 0;

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
  });

  $(".room-booking-price-summary.active .price-summary-details").show();

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".room-booking-area .room-field").length) {
      $(".room-booking-area .room-field").removeClass("is-dropdown-active");
    }
  });

  $(document).on("click", ".room-booking-price-summary .price-summary-toggle", function () {
    const $toggle = $(this);
    const $summary = $toggle.closest(".room-booking-price-summary");
    const $details = $summary.find(".price-summary-details").first();
    const willOpen = !$summary.hasClass("active");

    $summary.toggleClass("active", willOpen);
    $toggle.attr("aria-expanded", willOpen);
    $details.stop(true, true)[willOpen ? "slideDown" : "slideUp"](250);
  });

  $(document).on("change", ".room-booking-addon input", function () {
    $(this).closest(".room-booking-addon").toggleClass("checked", this.checked);
  });

  // Single Hotel Country Filter
  $(document).ready(function () {
    $(
      ".single-hotel-company-info-section .company-info-navigation-menu .navigation-item",
    ).on("click", function () {
      const $clickedCategory = $(this);
      const categoryId = $clickedCategory.attr("id");

      if (!categoryId) return;

      const $companyInfoSection = $clickedCategory.closest(
        ".single-hotel-company-info-section",
      );
      const $companyInfoWrapper = $companyInfoSection.find(".company-info-wrapper");

      $clickedCategory
        .addClass("active")
        .siblings(".navigation-item")
        .removeClass("active");

      $companyInfoWrapper
        .find(".company-info-tab")
        .removeClass("show")
        .filter(function () {
          return $(this).attr("data-info") === categoryId;
        })
        .addClass("show");
    });
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

  // Room Details Location Map
  const roomDtMapEl = document.getElementById("roomDtLocationMap");
  if (roomDtMapEl && typeof L !== "undefined") {
    const hotelLocation = {
      coords: [40.758, -73.9855],
      name: "Atlastrip Luxury Hotel",
    };
    const roomDtLocations = {
      hospital: {
        coords: [40.7672, -73.9698],
        name: "Hospital",
        distance: "2.5 km",
      },
      shoppingMall: {
        coords: [40.7641, -73.9822],
        name: "Shopping Mall",
        distance: "1.5 km",
      },
      airport: {
        coords: [40.7498, -73.9768],
        name: "Airport",
        distance: "3.5 km",
      },
      beach: {
        coords: [40.7464, -73.997],
        name: "Beach",
        distance: "4.5 km",
      },
    };

    const roomDtMap = L.map("roomDtLocationMap", {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView(hotelLocation.coords, 12);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(roomDtMap);

    const hotelMarkerTemplate = document.getElementById(
      "roomDtHotelMarkerTemplate",
    );
    const destinationMarkerTemplate = document.getElementById(
      "roomDtDestinationMarkerTemplate",
    );
    const hotelMarkerHtml =
      hotelMarkerTemplate?.innerHTML.trim() ||
      '<span class="room-dt-map-marker hotel"></span>';
    const destinationMarkerHtml =
      destinationMarkerTemplate?.innerHTML.trim() ||
      '<span class="room-dt-map-marker destination"></span>';

    const hotelIcon = L.divIcon({
      className: "",
      html: hotelMarkerHtml,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -22],
    });

    const destinationIcon = L.divIcon({
      className: "",
      html: destinationMarkerHtml,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -22],
    });

    L.marker(hotelLocation.coords, { icon: hotelIcon })
      .addTo(roomDtMap)
      .bindPopup(hotelLocation.name);

    let roomDtRouteLine = null;
    let roomDtDestinationMarker = null;

    function showRoomDtRoute(locationKey) {
      const location = roomDtLocations[locationKey];
      if (!location) return;

      if (roomDtRouteLine) {
        roomDtMap.removeLayer(roomDtRouteLine);
      }
      if (roomDtDestinationMarker) {
        roomDtMap.removeLayer(roomDtDestinationMarker);
      }

      const start = hotelLocation.coords;
      const end = location.coords;
      const latDiff = end[0] - start[0];
      const lngDiff = end[1] - start[1];
      const curveOffset = 0.08;
      const routePoints = [
        start,
        [
          start[0] + latDiff * 0.5 - lngDiff * curveOffset,
          start[1] + lngDiff * 0.5 + latDiff * curveOffset,
        ],
        end,
      ];

      roomDtRouteLine = L.polyline(routePoints, {
        color: "#D36D3C",
        weight: 3,
        opacity: 1,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(roomDtMap);

      roomDtDestinationMarker = L.marker(location.coords, {
        icon: destinationIcon,
      })
        .addTo(roomDtMap)
        .bindPopup(`${location.name} - ${location.distance}`);

      const routeBounds = L.latLngBounds([
        hotelLocation.coords,
        location.coords,
      ]);
      roomDtMap.fitBounds(routeBounds, {
        padding: [70, 70],
        maxZoom: 14,
      });
    }

    const roomDtFilterItems = document.querySelectorAll(
      ".room-dt-location-item",
    );

    roomDtFilterItems.forEach((item) => {
      item.addEventListener("click", function () {
        roomDtFilterItems.forEach((filterItem) =>
          filterItem.classList.remove("active"),
        );
        this.classList.add("active");
        showRoomDtRoute(this.dataset.location);
      });
    });

    showRoomDtRoute(
      document.querySelector(".room-dt-location-item.active")?.dataset
        .location || "hospital",
    );

    setTimeout(() => {
      roomDtMap.invalidateSize();
    }, 200);
  }

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

  // Single Hotel Home AI Chatbox
  jQuery(function ($) {
    const chatbox = $("#hotelAiChatboxPopup");
    const aiButtons = $("header .ai-btn");
    const startButton = chatbox.find(".single-hotel-ai-chatbox-start-btn");
    const newChatButton = chatbox.find(".single-hotel-ai-chatbox-new-chat");
    const introState = chatbox.find(".single-hotel-ai-chatbox-state-intro");
    const chatState = chatbox.find(".single-hotel-ai-chatbox-state-chat");
    const chatField = chatbox.find(".single-hotel-ai-chatbox-field");
    const chatMoreButton = chatbox.find(".single-hotel-ai-chatbox-more-btn");
    const screenshotButton = chatbox.find(".single-hotel-ai-chatbox-screenshot-btn");
    const uploadButton = chatbox.find(".single-hotel-ai-chatbox-upload-btn");
    const screenshotInput = chatbox.find(".single-hotel-ai-chatbox-screenshot-input");
    const uploadInput = chatbox.find(".single-hotel-ai-chatbox-upload-input");
    const filePreview = chatbox.find(".single-hotel-ai-chatbox-file-preview");
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

        const fileCard = $('<div class="single-hotel-ai-chatbox-file-card"></div>');
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
      if (!$(e.target).closest(".single-hotel-ai-chatbox-more-btn").length) {
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
      const img = $(this).closest(".single-hotel-ai-chatbox-file-card").find("img");
      if (img.length) {
        const src = img.attr("src");
        URL.revokeObjectURL(src);
        previewObjectUrls = previewObjectUrls.filter(function (url) {
          return url !== src;
        });
      }
      $(this).closest(".single-hotel-ai-chatbox-file-card").remove();
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
