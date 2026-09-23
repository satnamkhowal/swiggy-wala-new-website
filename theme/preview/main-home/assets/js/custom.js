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

  // Home demo menu
  const demoMenuWrapper = $(".home1-demo-menu-wrapper");

  function setDemoMenuScrollbarWidth() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--demo-scrollbar-width",
      `${scrollbarWidth}px`,
    );
  }

  $(".home1-demo-button").on("click", function () {
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
      el.style.background = `conic-gradient(var(--primary-color1) ${pct}%, var(--progress-bg) ${pct}%)`;

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
  // Home1 Offer Slider
  var swiper = new Swiper(".home1-offer-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".offer-slider-next",
      prevEl: ".offer-slider-prev",
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

  // Home1 Package Details Gallery Slider
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

  // Home1 Package Details Tourist Places Slider
  if (document.querySelector(".tourist-places-slider")) {
    new Swiper(".tourist-places-slider", {
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
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
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
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    });
  }

  // Home1 Destination Details Tour Places Slider
  if (document.querySelector(".destination-tour-places-main-slider")) {
    const destinationTourPlacesThumbSlider = new Swiper(
      ".destination-tour-places-thumb-slider",
      {
        slidesPerView: 5,
        spaceBetween: 24,
        speed: 900,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        breakpoints: {
          280: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        },
      },
    );

    new Swiper(".destination-tour-places-main-slider", {
      slidesPerView: 1,
      speed: 1200,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".destination-tour-places-next",
        prevEl: ".destination-tour-places-prev",
      },
      thumbs: {
        swiper: destinationTourPlacesThumbSlider,
      },
    });
  }

  // Home1 Destination Details Top Attraction Slider
  var swiper = new Swiper(".destination-dt-top-attraction-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".offer-slider-next",
      prevEl: ".offer-slider-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });

  // Home1 Destination Details Hotel Slider
  var swiper = new Swiper(".destination-dt-hotel-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".offer-slider-next",
      prevEl: ".offer-slider-prev",
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
  // Home1 Destination Details Visa Slider
  var swiper = new Swiper(".destination-dt-visa-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".visa-slider-next",
      prevEl: ".visa-slider-prev",
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

  // Home1 Hotel Details Gallery Slider
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

  // Home1 Package Details Tour Itinerary
  const itineraryArea = document.querySelector(".tour-itinerary-area");
  if (itineraryArea) {
    const toggleBtn = itineraryArea.querySelector(".itinerary-expand-toggle");
    const collapseEls = Array.from(
      itineraryArea.querySelectorAll(".accordion-collapse"),
    );
    let isBulkToggling = false;

    const updateItineraryToggle = () => {
      if (!toggleBtn || !collapseEls.length) return;
      const allOpen = collapseEls.every((el) => el.classList.contains("show"));
      toggleBtn.textContent = allOpen ? "Collapse All-" : "Expand All+";
      toggleBtn.setAttribute("aria-expanded", allOpen ? "true" : "false");
    };

    if (toggleBtn && collapseEls.length) {
      toggleBtn.addEventListener("click", function () {
        const shouldOpen = !collapseEls.every((el) =>
          el.classList.contains("show"),
        );

        isBulkToggling = true;
        collapseEls.forEach((el) => {
          const collapse = bootstrap.Collapse.getOrCreateInstance(el, {
            toggle: false,
          });
          shouldOpen ? collapse.show() : collapse.hide();
        });
        setTimeout(() => {
          isBulkToggling = false;
          updateItineraryToggle();
        }, 400);
      });

      collapseEls.forEach((el) => {
        el.addEventListener("show.bs.collapse", function () {
          if (isBulkToggling) return;

          collapseEls.forEach((item) => {
            if (item === el || !item.classList.contains("show")) return;

            bootstrap.Collapse.getOrCreateInstance(item, {
              toggle: false,
            }).hide();
          });
        });
        el.addEventListener("shown.bs.collapse", updateItineraryToggle);
        el.addEventListener("hidden.bs.collapse", updateItineraryToggle);
      });

      updateItineraryToggle();
    }
  }

  // Home1 Destination Slider
  var swiper = new Swiper(".home1-destination-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".destination-slider-next",
      prevEl: ".destination-slider-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });

  // Home1 Testimonial Slider
  var swiper = new Swiper(".home1-testimonial-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testimonial-slider-next",
      prevEl: ".testimonial-slider-prev",
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
  // Home1 About Page History Slider
  var swiper = new Swiper(".home1-about-page-history-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });

  // Recommended Package Slider
  var swiper = new Swiper(".recommended-slider", {
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

  // Hotel Recommended Package Slider
  var swiper = new Swiper(".hotel-recommended-slider", {
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

  // Home1 Flight Filter Slider
  var swiper = new Swiper(".flight-filter-options", {
    slidesPerView: "auto",
    speed: 1500,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".flight-filter-next",
      prevEl: ".flight-filter-prev",
    },
  });

  // Holidays Tour Deals Slider
  var swiper = new Swiper(".holidays-tour-deals-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".tour-deals-slider-next",
      prevEl: ".tour-deals-slider-prev",
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

  // Home1 Visa Category Slider
  var swiper = new Swiper(".visa-category-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });

  $(".flight-filter-options .flight-filter-pill").on("click", function () {
    $(this).toggleClass("active");
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
        stickyNavSelector: ".home1-inner-page-navigation-wrap",
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
    if (
      $(this).closest(".date-field, .hotel-date-field, .flight-date-field")
        .length
    ) {
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
        $box.hasClass("hotel-date-field") ||
        $box.hasClass("flight-date-field")
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
      $(".hotel-date-field, .flight-date-field").removeClass(
        "is-calendar-active",
      );
      window.activeHotelDateField = null;
      window.activeRangeDateField = null;
      $(".custom-select-wrap").removeClass("active"); // Close others
      $wrap.toggleClass("active");
    });

    // Handle option click
    $wrap.find(".option-list-destination li").on("click", function () {
      var country = $(this).find(".destination .ui-title").text();
      var destination = $(this).find(".destination span").text();
      var displayLabel = $box.hasClass("flight-destination-field")
        ? $box.find(".input-field-value .destination span").first().text()
        : destination;
      const countryDestinationHtml = `<div class="destination"><strong class="ui-title">${country}</strong><span>${displayLabel}</span></div>`;
      $box.find(".input-field-value").empty().html(countryDestinationHtml); // ✅ FIXED
      $input.val(
        $box.hasClass("flight-destination-field")
          ? country
          : country + destination,
      );
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

      const isFlightField = $field.hasClass("flight-date-field");
      const $display = $field
        .find(
          isFlightField
            ? ".flight-selected-date-range"
            : ".hotel-selected-date-range",
        )
        .first();
      const $input = $field
        .find(isFlightField ? "input.flight-checkin" : "input.hotel-checkin")
        .first();
      const formattedStart = startMoment.format("DD MMM");
      const formattedEnd = endMoment.format("DD MMM");
      const formattedRange = `${formattedStart}-${formattedEnd}`;
      const metaLabel = isFlightField
        ? "Departure-Return"
        : "Check In-Check Out";

      $input.val(formattedRange);
      $display.html(
        `<strong class="ui-title">${formattedRange}</strong><span>${metaLabel}</span>`,
      );
    }

    $(".hotel-date-field, .flight-date-field").each(function () {
      updateRangeDateFieldDisplay($(this), tomorrow, checkOutDefault);
    });

    $(
      ".hotel-date-field .custom-select-dropdown, .hotel-date-field .custom-select-dropdown input, .flight-date-field .custom-select-dropdown, .flight-date-field .custom-select-dropdown input",
    ).on("click", function (e) {
      e.stopPropagation();
      const $currentRangeDateField = $(this).closest(
        ".hotel-date-field, .flight-date-field",
      );
      $(".custom-select-wrap").removeClass("active");
      $(".hotel-date-field, .flight-date-field").removeClass(
        "is-calendar-active",
      );
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
      $(".hotel-date-field, .flight-date-field").removeClass(
        "is-calendar-active",
      );
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
          ".home1-tour-package-page-filter .filter-segment",
        );

        if (!segment) {
          return;
        }

        const filter = segment.closest(".home1-tour-package-page-filter");

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
          ".multi-calendar, .hotel-date-field, .flight-date-field, .hotel-date-field .custom-select-dropdown, .flight-date-field .custom-select-dropdown",
        ).length
      ) {
        $(".multi-calendar").removeClass("active");
        $(".hotel-date-field, .flight-date-field").removeClass(
          "is-calendar-active",
        );
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
    const $flightFilterWrap = $(
      ".filter-input-wrap .flight-filter-wrap, .flight-page-filter .flight-filter-wrap",
    );
    const $multiCityFilterWrap = $(
      ".filter-input-wrap .multicity-filter-wrapper, .flight-page-filter .multicity-filter-wrapper",
    );

    function getActiveFlightTripId($flightWrap) {
      return (
        $flightWrap.find(".flight-trip-tab.active").first().attr("id") ||
        $flightWrap.find(".flight-trip-tab").first().attr("id")
      );
    }

    function isFlightFilterActive($flightWrap) {
      return (
        $flightWrap.closest(".flight-page-filter").length > 0 ||
        $(".filter-item-list .single-item.active").attr("id") === "flight"
      );
    }

    function setMultiCityVisibility($flightWrap, tripId, isFlightActive) {
      const $multiCityWrap = $flightWrap.find("> .multicity-filter-wrapper");

      $multiCityWrap.removeClass("show");

      if (isFlightActive && tripId === "multi-city") {
        $multiCityWrap.filter(`[data-id="${tripId}"]`).addClass("show");
      }
    }

    function setFlightFilterVisibility(filterId) {
      $flightFilterWrap
        .removeClass("show")
        .filter(`[data-id="${filterId}"]`)
        .addClass("show");

      if (filterId === "flight") {
        $flightFilterWrap.filter(".show").each(function () {
          const $flightWrap = $(this);
          const activeTripId = getActiveFlightTripId($flightWrap);

          if (activeTripId) {
            setFlightTripFilter($flightWrap, activeTripId);
            setMultiCityVisibility($flightWrap, activeTripId, true);
          }
        });
      } else {
        $multiCityFilterWrap.removeClass("show");
      }
    }

    function setFlightTripFilter($flightWrap, tripId) {
      $flightWrap
        .find("> .filter-input")
        .removeClass("show")
        .filter(`[data-id="${tripId}"]`)
        .addClass("show");
    }

    setFlightFilterVisibility(
      $(".filter-item-list .single-item.active").attr("id"),
    );

    $flightFilterWrap.each(function () {
      const $flightWrap = $(this);
      const activeTripId = $flightWrap
        .find(".flight-trip-tab.active")
        .first()
        .attr("id");

      if (activeTripId) {
        setFlightTripFilter($flightWrap, activeTripId);
        setMultiCityVisibility(
          $flightWrap,
          activeTripId,
          isFlightFilterActive($flightWrap),
        );
      }
    });

    $(".filter-item-list .single-item").on("click", function () {
      const $clickedItem = $(this);
      const filterId = $clickedItem.attr("id");

      if (!filterId) return;

      $clickedItem.addClass("active").siblings().removeClass("active");

      $(".filter-input-wrap > .filter-input")
        .removeClass("show")
        .filter(`[data-id="${filterId}"]`)
        .addClass("show");

      setFlightFilterVisibility(filterId);
    });

    $flightFilterWrap.find(".flight-trip-tab").on("click", function () {
      const $clickedTab = $(this);
      const tripId = $clickedTab.attr("id");

      if (!tripId) return;

      $clickedTab
        .addClass("active")
        .closest(".flight-trip-tabs")
        .find(".flight-trip-tab")
        .not($clickedTab)
        .removeClass("active");

      const $flightWrap = $clickedTab.closest(".flight-filter-wrap");

      $(".single-calendar").removeClass("active");
      $(".filter-input .date-field").removeClass("is-calendar-active");
      $(".form-inner")
        .has(".date-field-area + .single-calendar")
        .removeClass("is-calendar-active");
      $(".multi-calendar").removeClass("active");
      $(".hotel-date-field, .flight-date-field").removeClass(
        "is-calendar-active",
      );
      window.activeHotelDateField = null;
      window.activeRangeDateField = null;

      setFlightTripFilter($flightWrap, tripId);

      // Only control multi-city wrapper here
      setMultiCityVisibility(
        $flightWrap,
        tripId,
        isFlightFilterActive($flightWrap),
      );
    });

    $(".transport-page-filter").each(function () {
      const $transportFilter = $(this);
      const $bookingTypeItems = $transportFilter.find(".booking-type-item");
      const $filterInputs = $transportFilter.find(".filter-input");
      const $transportPageWrappers = $(
        ".home1-transport-page .transport-page-wrapper",
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

    $(".filter-input-wrap, .flight-page-filter").on(
      "click",
      ".flight-swap-btn",
      function (e) {
        e.preventDefault();

        const $flightForm = $(this).closest(".filter-input");
        const $destinationFields = $flightForm
          .find(".flight-destination-field")
          .slice(0, 2);

        if ($destinationFields.length < 2) return;

        const $firstField = $destinationFields.eq(0);
        const $secondField = $destinationFields.eq(1);

        const $firstTitle = $firstField
          .find(".input-field-value .ui-title")
          .first();
        const $secondTitle = $secondField
          .find(".input-field-value .ui-title")
          .first();

        const $firstInput = $firstField
          .find(".destination-dropdown input")
          .first();
        const $secondInput = $secondField
          .find(".destination-dropdown input")
          .first();

        const firstTitleText = $firstTitle.text();
        const secondTitleText = $secondTitle.text();

        const firstInputValue = $firstInput.val();
        const secondInputValue = $secondInput.val();

        $firstTitle.text(secondTitleText);
        $secondTitle.text(firstTitleText);

        $firstInput.val(secondInputValue);
        $secondInput.val(firstInputValue);
      },
    );

    $(".multicity-filter-wrapper").each(function () {
      const $multiCityWrap = $(this);
      const $multiCityList = $multiCityWrap.find(".multicity-fliter-list");
      const $addMoreBtn = $multiCityWrap.find(".add-more-btn");
      const minRows = 2;
      const maxRows = 5;

      function updateMultiCityButtons() {
        const $rows = $multiCityList.children(".filter-input");
        const canAdd = $rows.length < maxRows;

        $rows.each(function (index) {
          $(this)
            .find(".delete-btn")
            .toggleClass("disable", index < minRows);
        });
        $addMoreBtn.toggleClass("disable", !canAdd).prop("disabled", !canAdd);
      }

      function prepareClonedMultiCityRow($row) {
        $row.removeClass("is-calendar-active");
        $row.find(".custom-select-wrap").removeClass("active");
        $row.find(".custom-select-search-area input").val("");
        $row.find(".delete-btn").removeClass("disable");
        $row.addClass("multicity-row-added");
      }

      $addMoreBtn.on("click", function () {
        const $rows = $multiCityList.children(".filter-input");
        if ($rows.length >= maxRows) return;

        const $newRow = $rows.last().clone(false, false);
        prepareClonedMultiCityRow($newRow);
        $multiCityList.append($newRow);

        if (typeof window.initializeTourCalendar === "function") {
          $newRow.find(".single-calendar").each(function () {
            window.initializeTourCalendar($(this));
          });
        }

        updateMultiCityButtons();
      });

      $multiCityList.on("click", ".delete-btn", function (e) {
        e.preventDefault();

        const $rows = $multiCityList.children(".filter-input");
        if ($(this).closest(".filter-input").index() < minRows) return;

        $(this).closest(".filter-input").remove();
        updateMultiCityButtons();
      });

      $multiCityWrap.on("click", function (event) {
        if (
          !$(event.target).closest(
            ".custom-select-dropdown, .custom-select-wrap, .single-calendar",
          ).length
        ) {
          $multiCityWrap.find(".custom-select-wrap").removeClass("active");
        }
      });

      $multiCityList.on(
        "click",
        ".multicity-row-added .custom-select-dropdown",
        function (e) {
          const $box = $(this).closest(".single-search-box, .single-field");
          if ($box.hasClass("date-field")) return;

          e.stopPropagation();
          const $wrap = $box.find(".custom-select-wrap");

          $(".custom-select-wrap").removeClass("active");
          $wrap.toggleClass("active");
        },
      );

      $multiCityList.on(
        "click",
        ".multicity-row-added .option-list-destination li",
        function () {
          const $box = $(this).closest(".single-search-box, .single-field");
          const $wrap = $(this).closest(".custom-select-wrap");
          const country = $(this).find(".destination .ui-title").text();
          const destination = $(this).find(".destination span").text();
          const displayLabel = $box.hasClass("flight-destination-field")
            ? $box.find(".input-field-value .destination span").first().text()
            : destination;
          const countryDestinationHtml = `<div class="destination"><strong class="ui-title">${country}</strong><span>${displayLabel}</span></div>`;

          $box.find(".input-field-value").empty().html(countryDestinationHtml);
          $box
            .find(".custom-select-dropdown input")
            .val(
              $box.hasClass("flight-destination-field")
                ? country
                : country + destination,
            );
          $wrap.removeClass("active");
        },
      );

      $multiCityList.on(
        "input",
        ".multicity-row-added .custom-select-search-area input",
        function () {
          const searchText = $(this).val().toLowerCase();
          $(this)
            .closest(".custom-select-wrap")
            .find(".option-list-destination li, .option-list li")
            .each(function () {
              const destinationText = $(this)
                .find(".destination .ui-title, .ui-title")
                .text()
                .toLowerCase();
              $(this).toggle(destinationText.includes(searchText));
            });
        },
      );

      $(document).on("click", function (event) {
        if (!$(event.target).closest($multiCityWrap).length) {
          $multiCityWrap.find(".custom-select-wrap").removeClass("active");
        }
      });

      updateMultiCityButtons();
    });
  });

  // Tour Category Filter
  $(document).ready(function () {
    $(
      ".package-filter-wrapper .single-widgets .tour-category li, .package-filter-wrapper .single-widgets .departure-time-list li",
    ).on("click", function () {
      $(this).toggleClass("active");
    });

    $(".tour-category-list .single-category, .visa-category-area .single-visa").on("click", function () {
      const $clickedCategory = $(this);
      const categoryId = $clickedCategory.attr("id");

      if (!categoryId) return;

      const $tourSection = $clickedCategory.closest(
        ".home1-tour-package-section, .home1-visa-page",
      );
      const $tourPackageList = $tourSection.find(".tour-package-list, .visa-country-list-wrapper").first();

      if ($clickedCategory.hasClass("single-visa")) {
        $clickedCategory
          .closest(".visa-category-area")
          .find(".single-visa")
          .removeClass("active");
      } else {
        $clickedCategory
          .closest(".tour-category-list")
          .find(".single-category")
          .removeClass("active");
      }

      $clickedCategory.addClass("active");

      const $visibleItems = $tourPackageList
        .find(".tour-pack-item, .single-visa-country-list")
        .removeClass("show")
        .filter(function () {
          return $(this).attr("data-category") === categoryId;
        })
        .addClass("show");

      if ($clickedCategory.hasClass("single-visa")) {
        window.requestAnimationFrame(function () {
          if (window.wow) {
            if (typeof window.wow.sync === "function") {
              window.wow.sync();
            }
            if (typeof window.wow.scrollHandler === "function") {
              window.wow.scrollHandler();
            }
          }

          $visibleItems.find(".wow").each(function () {
            if (!$(this).hasClass("animated")) {
              $(this).css("visibility", "visible").addClass("animated");
            }
          });
        });
      }
    });
  });

  // Tour Route Hover Effect
  document.querySelectorAll(".package-card .tour-route").forEach((route) => {
    const wrap = route.querySelector(".route-list-wrap");
    const list = route.querySelector(".route-list");
    const trigger = route.closest(".package-card .location");

    if (!wrap || !list || !trigger) return;

    let hoverTimeout;

    trigger.addEventListener("mouseenter", () => {
      list.style.transform = "translateX(0)";

      hoverTimeout = setTimeout(() => {
        const hiddenWidth = list.scrollWidth - wrap.clientWidth;

        if (hiddenWidth > 0) {
          list.style.transform = `translateX(-${hiddenWidth}px)`;
        }
      }, 800); // delay before scroll start
    });

    trigger.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      list.style.transform = "translateX(0)";
    });
  });

  // Destination Sorting
  $(".home1-quick-search-section .quick-search-wrapper").each(function () {
    const $wrapper = $(this);
    const $select = $wrapper.find(".destination-dropdown select");
    const $destinations = $wrapper.find(
      ".destination-list .single-destination",
    );

    function filterDestinations() {
      const selectedRegion = (
        $select.find("option:selected").attr("id") || "all"
      ).toLowerCase();

      $destinations.each(function () {
        const $destination = $(this);
        const destinationRegion = (
          $destination.attr("data-region") || ""
        ).toLowerCase();
        const shouldShow =
          selectedRegion === "all" || destinationRegion === selectedRegion;

        $destination.toggle(shouldShow);
      });
    }

    $select.on("change", filterDestinations);
    filterDestinations();
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

  // Points data
  const points = [
    {
      coords: [46.532388, 2.438788],
      name: "<h6>Bali</h6>",
      days: ["1", "2"],
    },
    {
      coords: [46.504856, 2.713969],
      name: "<h6>Ubud</h6>",
      days: ["3", "4"],
    },
    {
      coords: [46.441871, 2.423273],
      name: "<h6>Nusa Penida</h6>",
      days: ["5", "6"],
    },
    {
      coords: [46.490241, 2.527793],
      name: "<h6>Uluwatu</h6>",
      days: ["7"],
    },
    {
      coords: [46.532388, 2.438788],
      name: "<h6>Vesdun</h6>",
      days: ["1", "2", "3"],
    },
  ];

  // Reusable function
  function initLeafletMap(mapId, points) {
    const mapContainer = document.getElementById(mapId);
    if (!mapContainer) return null;

    const map = L.map(mapId).setView([80, -4.7], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Polyline
    const polyline = L.polyline(
      points.map((p) => p.coords),
      { color: "#1781FE", weight: 1 },
    ).addTo(map);
    map.fitBounds(polyline.getBounds());

    // Custom icons
    const customIcon = L.icon({
      iconUrl: "assets/img/home1/icon/package-dt-map-icon.svg",
      iconSize: [16, 16],
      iconAnchor: [6, 6],
    });

    const animatedIcon = L.icon({
      iconUrl: "assets/img/home1/icon/package-dt-map-icon2.svg",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    // Add clickable markers
    points.forEach((p) => {
      let daysHtml = "";
      p?.days?.forEach((item) => {
        daysHtml += `<span>${item}</span>`;
      });

      L.marker(p.coords, { icon: customIcon }).addTo(map).bindPopup(`
          ${p.name}
          <strong>Days </strong>
          ${daysHtml}`);
    });

    // Animated marker
    const marker = L.marker(points[0].coords, { icon: animatedIcon }).addTo(
      map,
    );

    function interpolatePosition(p1, p2, t) {
      return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
    }

    let i = 0;
    let progress = 0;
    const speed = 0.002;

    function animate() {
      if (i >= points.length - 1) {
        i = 0;
        progress = 0;
      }

      const start = points[i].coords;
      const end = points[i + 1].coords;

      progress += speed;

      if (progress >= 1) {
        i++;
        progress = 0;
      }

      const pos = interpolatePosition(start, end, progress);
      marker.setLatLng(pos);

      requestAnimationFrame(animate);
    }

    animate();

    return map;
  }

  // Normal page map
  initLeafletMap("map", points);

  // Modal map
  let modalMap;
  const modalEl = document.getElementById("mapViewModal");
  const modalMapEl = document.getElementById("mapModal");
  if (modalEl && modalMapEl) {
    modalEl.addEventListener("shown.bs.modal", function () {
      if (!modalMap) {
        modalMap = initLeafletMap("mapModal", points); // init only once
      }
      if (modalMap) {
        modalMap.invalidateSize(); // fix sizing when modal is shown
      }
    });
  }

  // Tour package sidebar activities expand
  $(".checkbox-container span.expand").on("click", function () {
    const $checkboxContainer = $(this).closest(".checkbox-container");

    $checkboxContainer.find("ul").height("auto");
    $(this).hide();
  });

  // sidebar filter clear button
  const clearBtns = document.querySelectorAll("#clear-filters, .clear-filters");

  if (clearBtns.length) {
    clearBtns.forEach(function (clearBtn) {
      clearBtn.addEventListener("click", function () {
        const filterArea =
          clearBtn.closest(".home1-package-filter-area") || document;

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

        filterArea
          .querySelectorAll(".flight-duration-slider")
          .forEach(function (slider) {
            if (!slider.noUiSlider) return;

            const startValue =
              Number(slider.dataset.start) || Number(slider.dataset.max) || 0;
            slider.noUiSlider.set(startValue);
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

  jQuery(".transport-filter .widget-title, .flight-filter .widget-title")
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
    jQuery(".transport-card.ticket.active").each(function () {
      updateTransportDetailsHeight(jQuery(this));
    });
  }

  jQuery(".transport-card.ticket").each(function () {
    const $card = jQuery(this);
    const $button = $card.find(".details-btn").first();
    const isOpen = $card.hasClass("active") || $button.hasClass("active");

    $card.toggleClass("active", isOpen);
    $button.toggleClass("active", isOpen);
    $button.attr("aria-expanded", isOpen);

    if (isOpen) updateTransportDetailsHeight($card);
  });

  jQuery(".transport-card.ticket .details-btn").on("click", function () {
    const $button = jQuery(this);
    const $card = $button.closest(".transport-card.ticket");
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

  function updateFlightDetailsHeight($card) {
    const details = $card.find(".flight-card-details").get(0);

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
      "--flight-card-details-height",
      `${detailsHeight}px`,
    );
  }

  function updateActiveFlightDetailsHeights() {
    jQuery(".flight-card.active").each(function () {
      updateFlightDetailsHeight(jQuery(this));
    });
  }

  jQuery(".flight-card").each(function () {
    const $card = jQuery(this);
    const $button = $card.find(".details-btn").first();
    const isOpen = $card.hasClass("active") || $button.hasClass("active");

    $card.toggleClass("active", isOpen);
    $button.toggleClass("active", isOpen);
    $button.attr("aria-expanded", isOpen);

    if (isOpen) updateFlightDetailsHeight($card);
  });

  jQuery(".flight-card .details-btn").on("click", function () {
    const $button = jQuery(this);
    const $card = $button.closest(".flight-card");
    const isOpen = !$card.hasClass("active");

    $button.toggleClass("active", isOpen);
    $button.attr("aria-expanded", isOpen);
    $card.toggleClass("active", isOpen);

    if (isOpen) updateFlightDetailsHeight($card);
  });

  jQuery(window).on("load resize", updateActiveFlightDetailsHeights);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateActiveFlightDetailsHeights);
  }

  function getFlightCountdownDuration(timeValue) {
    const parts = String(timeValue || "00:00").split(":");
    const hours = Number(parts[0]) || 0;
    const minutes = Number(parts[1]) || 0;

    return Math.max(0, (hours * 60 + minutes) * 60 * 1000);
  }

  function formatFlightCountdown(milliseconds) {
    const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function initFlightCountdowns() {
    const dayMs = 24 * 60 * 60 * 1000;

    document
      .querySelectorAll(".flight-card[data-valid-time]")
      .forEach((card, index) => {
        const countdownId = card.dataset.countdownId || `flight-card-${index}`;
        const storageKey = `atlastrip-flight-countdown-${countdownId}`;
        const duration = getFlightCountdownDuration(card.dataset.validTime);
        const countdown = card.querySelector(".flight-countdown");
        const discountPrice = card.querySelector(".price-wrap del");
        let startTime = Number(localStorage.getItem(storageKey));
        const now = Date.now();

        if (!startTime || now - startTime >= dayMs) {
          startTime = now;
          localStorage.setItem(storageKey, String(startTime));
        }

        function updateCountdown() {
          const currentTime = Date.now();

          if (currentTime - startTime >= dayMs) {
            startTime = currentTime;
            localStorage.setItem(storageKey, String(startTime));
          }

          const elapsed = currentTime - startTime;
          const remaining = Math.max(duration - elapsed, 0);

          if (countdown) {
            countdown.textContent = formatFlightCountdown(remaining);
          }

          if (discountPrice) {
            discountPrice.classList.toggle("expired", remaining <= 0);
          }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
      });
  }

  initFlightCountdowns();

  // Filter sidebar
  $(".filter-btn").on("click", function (e) {
    e.stopPropagation();

    $(".home1-package-filter-area").toggleClass("slide");
    $(this).toggleClass("active"); // Toggle active class on filter button
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".home1-package-filter-area, .filter-btn").length
    ) {
      $(".home1-package-filter-area").removeClass("slide");
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

  // Customize Package Multi Step Form
  (function initCustomizePackageForm() {
    const formWrap = document.querySelector("[data-atp-package-form]");
    if (!formWrap) return;

    const form = formWrap.querySelector(".atp-inquiry-form");
    const panels = Array.from(
      formWrap.querySelectorAll("[data-atp-step-panel]"),
    );
    const navItems = Array.from(
      formWrap.querySelectorAll("[data-atp-step-nav]"),
    );
    const backBtn = formWrap.querySelector("[data-atp-back]");
    const nextBtn = formWrap.querySelector("[data-atp-next]");
    const summarySubmitBtn = formWrap.querySelector(".atp-summary-submit");
    const focusSummarySubmitBtn = formWrap.querySelector(
      "[data-atp-focus-submit]",
    );
    const destinationSelect = formWrap.querySelector(
      "[data-atp-destination-select]",
    );
    const destinationToggle = destinationSelect?.querySelector(
      ".atp-destination-select__toggle",
    );
    const destinationSearch = formWrap.querySelector(
      "[data-atp-destination-search]",
    );
    const destinationInput = formWrap.querySelector(
      "[data-atp-destination-input]",
    );
    const tourTypeInput = formWrap.querySelector("[data-atp-tour-type-input]");
    const activitiesInput = formWrap.querySelector(
      "[data-atp-activities-input]",
    );
    const travelDateInput = formWrap.querySelector("[data-atp-date-input]");
    const accommodationInput = formWrap.querySelector(
      "[data-atp-accommodation-input]",
    );
    const totalSteps = navItems.length;
    const initialSummaryValues = {};
    const initialActiveActivities = Array.from(
      formWrap.querySelectorAll(".atp-activity-pill.active"),
    ).map((item) => item.dataset.value);
    const initialSelectedDateHtml =
      formWrap.querySelector(".atp-date-field .selected-date")?.innerHTML || "";
    const initialPhoneFlags = Array.from(
      formWrap.querySelectorAll("[data-atp-phone-field]"),
    ).map((phoneField) => {
      const selectedFlag = phoneField.querySelector(
        "[data-atp-phone-selected-flag]",
      );
      const toggle = phoneField.querySelector(
        "[data-atp-phone-country-toggle]",
      );

      return {
        phoneField,
        selectedFlag,
        toggle,
        flagSrc: selectedFlag?.getAttribute("src") || "",
        flagAlt: selectedFlag?.getAttribute("alt") || "",
        toggleLabel: toggle?.getAttribute("aria-label") || "",
      };
    });
    let currentStep = 1;
    let maxReachedStep = 1;

    formWrap.querySelectorAll("[data-atp-summary]").forEach((summary) => {
      initialSummaryValues[summary.dataset.atpSummary] = summary.innerHTML;
    });

    function getPanel(step) {
      return panels.find(
        (panel) => Number(panel.dataset.atpStepPanel) === step,
      );
    }

    function updateProgress() {
      navItems.forEach((item) => {
        const step = Number(item.dataset.atpStepNav);
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isClickable = step < currentStep || step <= maxReachedStep;

        item.classList.toggle("active", isActive);
        item.classList.toggle("completed", isCompleted);
        item.classList.toggle("is-clickable", isClickable && !isActive);
        item.setAttribute("aria-current", isActive ? "step" : "false");
      });

      panels.forEach((panel) => {
        const isActive = Number(panel.dataset.atpStepPanel) === currentStep;
        panel.classList.toggle("active", isActive);
        panel.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      if (backBtn) {
        backBtn.disabled = currentStep === 1;
        setButtonLabel(backBtn, currentStep === totalSteps ? "Reset" : "Back");
      }

      if (nextBtn) {
        setButtonLabel(nextBtn, currentStep === totalSteps ? "Submit" : "Next");
      }

      formWrap.classList.toggle("is-final-step", currentStep === totalSteps);

      if (summarySubmitBtn) {
        summarySubmitBtn.disabled = currentStep !== totalSteps;
      }
    }

    function setButtonLabel(button, label) {
      const spans = button.querySelectorAll("span");

      if (spans.length) {
        spans.forEach((span) => {
          span.textContent = label;
        });
        return;
      }

      button.textContent = label;
    }

    function setStep(step) {
      const nextStep = Math.max(1, Math.min(step, totalSteps));
      currentStep = nextStep;
      maxReachedStep = Math.max(maxReachedStep, currentStep);
      updateProgress();
    }

    function setFieldError(fieldName, hasError) {
      const field = formWrap.querySelector(`[data-atp-field="${fieldName}"]`);
      if (field) {
        field.classList.toggle("has-error", hasError);
      }
    }

    function setDestinationOpen(isOpen) {
      if (!destinationSelect || !destinationToggle) return;

      destinationSelect.classList.toggle("open", isOpen);
      destinationToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false",
      );
    }

    function filterDestinations(searchTerm) {
      if (!destinationSelect) return;

      const normalizedTerm = searchTerm.trim().toLowerCase();
      let visibleCount = 0;

      destinationSelect
        .querySelectorAll(".atp-destination-select__menu li")
        .forEach((item) => {
          const option = item.querySelector("[data-value]");
          if (!option) return;

          const destination = option?.dataset.value.toLowerCase() || "";
          const isHidden =
            Boolean(normalizedTerm) && !destination.includes(normalizedTerm);
          item.hidden = isHidden;

          if (!isHidden) {
            visibleCount += 1;
          }
        });

      destinationSelect.classList.toggle("no-result", visibleCount === 0);
    }

    function selectDestination(value) {
      if (!destinationInput || !destinationSearch || !destinationSelect) return;

      destinationInput.value = value;
      destinationSearch.value = value;
      destinationSelect.classList.add("has-value");
      setDestinationOpen(false);
      setFieldError("destination", false);
      updateSummary();
    }

    function validateStep(step) {
      if (step === 1) {
        const hasDestination = Boolean(destinationInput?.value.trim());
        const hasActivity =
          formWrap.querySelectorAll(".atp-activity-pill.active").length > 0;

        setFieldError("destination", !hasDestination);
        setFieldError("activities", !hasActivity);

        return hasDestination && hasActivity;
      }

      if (step === 2) {
        const hasTravelDate = Boolean(travelDateInput?.value.trim());
        const hasAccommodation = Boolean(accommodationInput?.value.trim());

        setFieldError("travelDate", !hasTravelDate);
        setFieldError("accommodation", !hasAccommodation);

        return hasTravelDate && hasAccommodation;
      }

      if (step === 3) {
        return validateTravelerDetails();
      }

      return true;
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateTravelerDetails() {
      const stepPanel = getPanel(3);
      if (!stepPanel) return true;

      let isValid = true;

      stepPanel
        .querySelectorAll("[data-atp-required-field]")
        .forEach((field) => {
          const control = field.querySelector("input, select");
          const value = control?.value.trim() || "";
          const isEmail = control?.type === "email";
          const fieldValid =
            Boolean(value) && (!isEmail || isValidEmail(value));

          field.classList.toggle("has-error", !fieldValid);

          if (!fieldValid) {
            isValid = false;
          }
        });

      return isValid;
    }

    function getCounterValue(input) {
      const value = parseInt(input.value, 10);
      return Number.isNaN(value) ? 0 : Math.max(value, 0);
    }

    function getSelectedTourType() {
      return tourTypeInput?.value || "";
    }

    function getCounterMinValue(input) {
      if (input?.name !== "adult_quantity") return 0;

      return getSelectedTourType() === "Couple" ? 2 : 1;
    }

    function getCounterStepValue(input) {
      return input?.name === "adult_quantity" &&
        getSelectedTourType() === "Couple"
        ? 2
        : 1;
    }

    function normalizeCounterValue(input, value = getCounterValue(input)) {
      const tourType = getSelectedTourType();

      if (tourType === "Single" || tourType === "Couple") {
        if (input?.name === "child_quantity") return 0;
      }

      if (tourType === "Single") {
        if (input?.name === "adult_quantity") return 1;
      }

      let normalizedValue = Math.max(value, getCounterMinValue(input));

      if (
        tourType === "Couple" &&
        input?.name === "adult_quantity" &&
        normalizedValue % 2 !== 0
      ) {
        normalizedValue += 1;
      }

      return normalizedValue;
    }

    function updateCounterLabel(counter) {
      const input = counter.querySelector("[data-atp-counter-input]");
      const label = counter.querySelector(".atp-traveller-counter__name");
      if (!input || !label) return;

      const count = getCounterValue(input);
      const isChild = input.name === "child_quantity";
      label.textContent = `${count} ${isChild ? "Children" : "Adult"}`;
    }

    function setCounterValue(inputName, value) {
      const input = formWrap.querySelector(`input[name="${inputName}"]`);
      const counter = input?.closest("[data-atp-counter]");
      if (!input || !counter) return;

      input.value = normalizeCounterValue(input, value);
      updateCounterLabel(counter);
    }

    function setCounterDisabled(inputName, isDisabled) {
      const input = formWrap.querySelector(`input[name="${inputName}"]`);
      const counter = input?.closest("[data-atp-counter]");
      if (!input || !counter) return;

      counter.classList.toggle("is-disabled", isDisabled);
      input.readOnly = isDisabled;
      counter
        .querySelectorAll("[data-atp-counter-minus], [data-atp-counter-plus]")
        .forEach((button) => {
          button.disabled = isDisabled;
          button.setAttribute("aria-disabled", isDisabled ? "true" : "false");
        });
    }

    function setAdultCounterDisabled(isDisabled) {
      setCounterDisabled("adult_quantity", isDisabled);
    }

    function setChildCounterDisabled(isDisabled) {
      setCounterDisabled("child_quantity", isDisabled);
    }

    function syncTravelerCounterState() {
      const tourType = getSelectedTourType();

      setAdultCounterDisabled(tourType === "Single");
      setChildCounterDisabled(tourType === "Single" || tourType === "Couple");

      formWrap.querySelectorAll("[data-atp-counter-input]").forEach((input) => {
        const counter = input.closest("[data-atp-counter]");
        input.value = normalizeCounterValue(input);
        if (counter) {
          updateCounterLabel(counter);
        }
      });
    }

    function applyTravelerTypeDefaults(tourType) {
      const travelerDefaults = {
        Single: { adult: 1, child: 0 },
        Couple: { adult: 2, child: 0 },
        "Group Tour": { adult: 4, child: 3 },
        Family: { adult: 2, child: 2 },
      };
      const selectedDefault = travelerDefaults[tourType];
      if (!selectedDefault) return;

      setCounterValue("adult_quantity", selectedDefault.adult);
      setCounterValue("child_quantity", selectedDefault.child);
      syncTravelerCounterState();
    }

    function updateSummary() {
      const destinationSummary = formWrap.querySelector(
        '[data-atp-summary="destination"]',
      );
      const peopleSummary = formWrap.querySelector(
        '[data-atp-summary="people"]',
      );
      const tourTypeSummary = formWrap.querySelector(
        '[data-atp-summary="tourType"]',
      );
      const activitiesSummary = formWrap.querySelector(
        '[data-atp-summary="activities"]',
      );
      const travelDateSummary = formWrap.querySelector(
        '[data-atp-summary="travelDate"]',
      );
      const accommodationSummary = formWrap.querySelector(
        '[data-atp-summary="accommodation"]',
      );
      const travelerSummaryMap = {
        fullName: formWrap.querySelector(
          '[data-atp-summary="travelerFullName"]',
        ),
        gender: formWrap.querySelector('[data-atp-summary="travelerGender"]'),
        nationality: formWrap.querySelector(
          '[data-atp-summary="travelerNationality"]',
        ),
        email: formWrap.querySelector('[data-atp-summary="travelerEmail"]'),
        phone: formWrap.querySelector('[data-atp-summary="travelerPhone"]'),
        address: formWrap.querySelector('[data-atp-summary="travelerAddress"]'),
      };
      const adultInput = formWrap.querySelector('input[name="adult_quantity"]');
      const childInput = formWrap.querySelector('input[name="child_quantity"]');
      const selectedActivities = Array.from(
        formWrap.querySelectorAll(".atp-activity-pill.active"),
      ).map((item) => item.dataset.value);

      if (destinationSummary && destinationInput?.value) {
        destinationSummary.textContent = destinationInput.value;
      }

      if (peopleSummary && adultInput && childInput) {
        peopleSummary.textContent = `${getCounterValue(adultInput)} Adults, ${getCounterValue(childInput)} Children`;
      }

      if (tourTypeSummary && tourTypeInput?.value) {
        tourTypeSummary.textContent = tourTypeInput.value;
      }

      if (activitiesInput) {
        activitiesInput.value = selectedActivities.join(", ");
      }

      if (activitiesSummary && selectedActivities.length) {
        activitiesSummary.textContent = selectedActivities.join(", ");
      }

      if (travelDateSummary && travelDateInput?.value) {
        travelDateSummary.textContent = travelDateInput.value;
      }

      if (accommodationSummary && accommodationInput?.value) {
        accommodationSummary.textContent = accommodationInput.value;
      }

      Object.entries(travelerSummaryMap).forEach(([fieldName, summary]) => {
        const input = formWrap.querySelector(
          `[data-atp-traveler-field="${fieldName}"]`,
        );

        if (summary && input?.value.trim()) {
          summary.textContent = input.value.trim();
        }
      });
    }

    if (destinationToggle && destinationSelect) {
      destinationToggle.addEventListener("click", function (event) {
        if (event.target.closest("[data-value]")) return;

        setDestinationOpen(true);
        destinationSearch?.focus();
      });

      destinationSelect.querySelectorAll("[data-value]").forEach((option) => {
        option.addEventListener("click", function () {
          selectDestination(this.dataset.value);
        });
      });

      if (destinationSearch) {
        destinationSearch.addEventListener("input", function () {
          const typedValue = this.value;
          destinationInput.value = "";
          destinationSelect.classList.remove("has-value");
          filterDestinations(typedValue);
          setDestinationOpen(true);
          setFieldError("destination", false);
        });

        destinationSearch.addEventListener("focus", function () {
          filterDestinations(this.value);
          setDestinationOpen(true);
        });
      }

      document.addEventListener("click", function (event) {
        if (!destinationSelect.contains(event.target)) {
          setDestinationOpen(false);
        }
      });
    }

    formWrap.querySelectorAll(".atp-traveler-type-card").forEach((card) => {
      card.addEventListener("click", function () {
        formWrap.querySelectorAll(".atp-traveler-type-card").forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-checked", "false");
        });

        this.classList.add("active");
        this.setAttribute("aria-checked", "true");
        tourTypeInput.value = this.dataset.value;
        applyTravelerTypeDefaults(this.dataset.value);
        updateSummary();
      });
    });

    formWrap.querySelectorAll("[data-atp-counter]").forEach((counter) => {
      const input = counter.querySelector("[data-atp-counter-input]");
      const minus = counter.querySelector("[data-atp-counter-minus]");
      const plus = counter.querySelector("[data-atp-counter-plus]");

      updateCounterLabel(counter);

      if (minus && input) {
        minus.addEventListener("click", function () {
          if (minus.disabled) return;
          input.value = normalizeCounterValue(
            input,
            getCounterValue(input) - getCounterStepValue(input),
          );
          updateCounterLabel(counter);
          updateSummary();
        });
      }

      if (plus && input) {
        plus.addEventListener("click", function () {
          if (plus.disabled) return;
          input.value = normalizeCounterValue(
            input,
            getCounterValue(input) + getCounterStepValue(input),
          );
          updateCounterLabel(counter);
          updateSummary();
        });
      }

      if (input) {
        input.addEventListener("change", function () {
          input.value = normalizeCounterValue(input);
          updateCounterLabel(counter);
          updateSummary();
        });
      }
    });

    formWrap.querySelectorAll(".atp-activity-pill").forEach((pill) => {
      pill.addEventListener("click", function () {
        this.classList.toggle("active");
        setFieldError(
          "activities",
          formWrap.querySelectorAll(".atp-activity-pill.active").length === 0,
        );
        updateSummary();
      });
    });

    formWrap.querySelectorAll(".atp-view-more").forEach((button) => {
      button.addEventListener("click", function () {
        const activityList = this.closest(
          '[data-atp-field="activities"]',
        )?.querySelector(".atp-activity-list");

        if (!activityList) return;

        const isExpanded = activityList.classList.toggle("show-more");
        this.textContent = isExpanded ? "View Less-" : "View More+";
      });
    });

    formWrap.querySelectorAll(".atp-date-field").forEach((dateField) => {
      const dropdown = dateField.querySelector(".custom-select-dropdown");
      const calendar = dateField.querySelector(".single-calendar");

      if (window.initializeTourCalendar && window.jQuery && calendar) {
        window.initializeTourCalendar(window.jQuery(calendar));
      }

      if (dropdown && calendar) {
        dropdown.addEventListener("click", function (event) {
          event.stopPropagation();
          formWrap.querySelectorAll(".atp-date-field").forEach((field) => {
            if (field !== dateField) {
              field.classList.remove("is-calendar-active");
              field
                .querySelector(".single-calendar")
                ?.classList.remove("active");
            }
          });
          dateField.classList.toggle("is-calendar-active");
          calendar.classList.toggle("active");
        });
      }

      dateField.addEventListener("click", function (event) {
        if (!event.target.closest(".calendar .date:not(.disabled)")) return;

        setTimeout(function () {
          setFieldError("travelDate", !travelDateInput?.value.trim());
          updateSummary();
        }, 0);
      });
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(".atp-date-field")) return;

      formWrap.querySelectorAll(".atp-date-field").forEach((field) => {
        field.classList.remove("is-calendar-active");
        field.querySelector(".single-calendar")?.classList.remove("active");
      });
    });

    formWrap.querySelectorAll(".atp-accommodation-card").forEach((card) => {
      card.addEventListener("click", function () {
        formWrap.querySelectorAll(".atp-accommodation-card").forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-checked", "false");
        });

        this.classList.add("active");
        this.setAttribute("aria-checked", "true");
        accommodationInput.value = this.dataset.value;
        setFieldError("accommodation", false);
        updateSummary();
      });
    });

    formWrap
      .querySelectorAll("[data-atp-phone-field]")
      .forEach((phoneField) => {
        const toggle = phoneField.querySelector(
          "[data-atp-phone-country-toggle]",
        );
        const selectedFlag = phoneField.querySelector(
          "[data-atp-phone-selected-flag]",
        );
        const phoneInput = phoneField.querySelector('input[type="tel"]');

        if (toggle) {
          toggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = phoneField.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
          });
        }

        phoneField
          .querySelectorAll("[data-atp-phone-country-menu] button")
          .forEach((option) => {
            option.addEventListener("click", function (event) {
              event.preventDefault();
              event.stopPropagation();

              if (selectedFlag) {
                selectedFlag.src = this.dataset.flag;
                selectedFlag.alt = this.dataset.country;
              }

              if (toggle) {
                toggle.setAttribute(
                  "aria-label",
                  `Selected country ${this.dataset.country}`,
                );
                toggle.setAttribute("aria-expanded", "false");
              }

              if (phoneInput && !phoneInput.value.trim()) {
                phoneInput.value = `${this.dataset.code} `;
                phoneInput.dispatchEvent(new Event("input", { bubbles: true }));
              }

              phoneField.classList.remove("open");
            });
          });
      });

    document.addEventListener("click", function (event) {
      if (event.target.closest("[data-atp-phone-field]")) return;

      formWrap
        .querySelectorAll("[data-atp-phone-field].open")
        .forEach((phoneField) => {
          phoneField.classList.remove("open");
          phoneField
            .querySelector("[data-atp-phone-country-toggle]")
            ?.setAttribute("aria-expanded", "false");
        });
    });

    function resetCustomizePackageForm() {
      if (form) {
        form.reset();
      }

      currentStep = 1;
      maxReachedStep = 1;

      formWrap.querySelectorAll(".has-error").forEach((item) => {
        item.classList.remove("has-error");
      });

      if (destinationSelect) {
        destinationSelect.classList.remove("has-value", "open", "no-result");
        destinationSelect
          .querySelectorAll(".atp-destination-select__menu li")
          .forEach((item) => {
            item.hidden = false;
          });
      }

      if (destinationSearch) {
        destinationSearch.value = "";
      }

      formWrap.querySelectorAll(".atp-traveler-type-card").forEach((card) => {
        const isActive = card.dataset.value === tourTypeInput?.value;
        card.classList.toggle("active", isActive);
        card.setAttribute("aria-checked", isActive ? "true" : "false");
      });
      syncTravelerCounterState();

      formWrap.querySelectorAll("[data-atp-counter]").forEach((counter) => {
        updateCounterLabel(counter);
      });

      formWrap.querySelectorAll(".atp-activity-pill").forEach((pill) => {
        pill.classList.toggle(
          "active",
          initialActiveActivities.includes(pill.dataset.value),
        );
      });

      formWrap
        .querySelectorAll(".atp-activity-list.show-more")
        .forEach((list) => {
          list.classList.remove("show-more");
        });

      formWrap.querySelectorAll(".atp-view-more").forEach((button) => {
        button.textContent = "View More+";
      });

      if (activitiesInput) {
        activitiesInput.value = initialActiveActivities.join(", ");
      }

      formWrap.querySelectorAll(".atp-date-field").forEach((dateField) => {
        dateField.classList.remove("is-calendar-active");
        dateField.querySelector(".single-calendar")?.classList.remove("active");
        dateField.querySelectorAll(".calendar .date").forEach((date) => {
          date.classList.remove("is-selected");
        });

        const selectedDate = dateField.querySelector(".selected-date");
        if (selectedDate && initialSelectedDateHtml) {
          selectedDate.innerHTML = initialSelectedDateHtml;
        }
      });

      formWrap.querySelectorAll(".atp-accommodation-card").forEach((card) => {
        const isActive = card.dataset.value === accommodationInput?.value;
        card.classList.toggle("active", isActive);
        card.setAttribute("aria-checked", isActive ? "true" : "false");
      });

      initialPhoneFlags.forEach(
        ({
          phoneField,
          selectedFlag,
          toggle,
          flagSrc,
          flagAlt,
          toggleLabel,
        }) => {
          phoneField.classList.remove("open");

          if (selectedFlag) {
            selectedFlag.src = flagSrc;
            selectedFlag.alt = flagAlt;
          }

          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", toggleLabel);
          }
        },
      );

      Object.entries(initialSummaryValues).forEach(([key, value]) => {
        const summary = formWrap.querySelector(`[data-atp-summary="${key}"]`);
        if (summary) {
          summary.innerHTML = value;
        }
      });

      if ($.fn.niceSelect) {
        $(formWrap).find("select").niceSelect("update");
      }

      updateProgress();
    }

    formWrap
      .querySelectorAll(
        "[data-atp-required-field] input, [data-atp-required-field] select",
      )
      .forEach((field) => {
        field.addEventListener("input", function () {
          this.closest("[data-atp-required-field]")?.classList.remove(
            "has-error",
          );
          updateSummary();
        });

        field.addEventListener("change", function () {
          this.closest("[data-atp-required-field]")?.classList.remove(
            "has-error",
          );
          updateSummary();
        });
      });

    formWrap
      .querySelectorAll(".atp-traveler-card .nice-select .option")
      .forEach((option) => {
        option.addEventListener("click", function () {
          const fieldWrap = this.closest("[data-atp-required-field]");
          fieldWrap?.classList.remove("has-error");

          setTimeout(updateSummary, 0);
        });
      });

    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const step = Number(this.dataset.atpStepNav);
        if (step < currentStep || step <= maxReachedStep) {
          setStep(step);
        }
      });
    });

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (currentStep === totalSteps) {
          resetCustomizePackageForm();
          return;
        }

        setStep(currentStep - 1);
      });
    }

    if (focusSummarySubmitBtn && summarySubmitBtn) {
      focusSummarySubmitBtn.addEventListener("click", function () {
        summarySubmitBtn.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        summarySubmitBtn.focus({ preventScroll: true });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (!validateStep(currentStep)) return;

        if (currentStep < totalSteps) {
          setStep(currentStep + 1);
        } else if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      });
    }

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    }

    syncTravelerCounterState();
    updateSummary();
    updateProgress();
  })();

  // Main Home AI Chatbox
  jQuery(function ($) {
    const chatbox = $("#travelAiChatboxPopup");
    const aiButtons = $("header .ai-btn");
    const startButton = chatbox.find(".home1-ai-chatbox-start-btn");
    const newChatButton = chatbox.find(".home1-ai-chatbox-new-chat");
    const introState = chatbox.find(".home1-ai-chatbox-state-intro");
    const chatState = chatbox.find(".home1-ai-chatbox-state-chat");
    const chatField = chatbox.find(".home1-ai-chatbox-field");
    const chatMoreButton = chatbox.find(".home1-ai-chatbox-more-btn");
    const screenshotButton = chatbox.find(".home1-ai-chatbox-screenshot-btn");
    const uploadButton = chatbox.find(".home1-ai-chatbox-upload-btn");
    const screenshotInput = chatbox.find(".home1-ai-chatbox-screenshot-input");
    const uploadInput = chatbox.find(".home1-ai-chatbox-upload-input");
    const filePreview = chatbox.find(".home1-ai-chatbox-file-preview");
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

        const fileCard = $('<div class="home1-ai-chatbox-file-card"></div>');
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
      "aria-controls": "travelAiChatboxPopup",
      "aria-expanded": "false",
    });

    aiButtons.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setChatboxState(!chatbox.hasClass("is-open"));
    });

    chatbox.on("click", function (e) {
      e.stopPropagation();
      if (!$(e.target).closest(".home1-ai-chatbox-more-btn").length) {
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
      const img = $(this).closest(".home1-ai-chatbox-file-card").find("img");
      if (img.length) {
        const src = img.attr("src");
        URL.revokeObjectURL(src);
        previewObjectUrls = previewObjectUrls.filter(function (url) {
          return url !== src;
        });
      }
      $(this).closest(".home1-ai-chatbox-file-card").remove();
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
