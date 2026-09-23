(function ($) {
  "use strict";

  // sidebar
  document
    .querySelector(".mobile-menu-btn")
    .addEventListener("click", () =>
      document.querySelector(".main-menu").classList.toggle("show-menu"),
    );
  $(".mobile-menu-btn").on("click", function () {
    $(this).toggleClass("active");
  });
  $(".menu-close-btn").on("click", function () {
    $(".main-menu").removeClass("show-menu");
  });

  jQuery(".dropdown-icon").on("click", function () {
    jQuery(this).toggleClass("active").next("ul, .mega-menu").slideToggle();
    jQuery(this).parent().siblings().children("ul, .mega-menu").slideUp();
    jQuery(this).parent().siblings().children(".active").removeClass("active");
  });
  // sticky header

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header.header-area");
    header.classList.toggle("sticky", window.scrollY > 0);
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

  // AI assistant tabs
  document.querySelectorAll(".ai-assistant-section").forEach((section) => {
    const image = section.querySelector(".ai-assistant-img img");
    const tabs = section.querySelectorAll(".ai-assistant-tab");

    if (!image || !tabs.length) return;

    const activateTab = (tab) => {
      const imageSrc = tab.getAttribute("data-image");
      if (!imageSrc) return;

      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      image.src = imageSrc;
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateTab(tab);
        }
      });
    });
  });

  // ====================
  // GSAP
  // ====================
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

      var $ballWidth = 36; // Ball default width
      var $ballHeight = 36; // Ball default height
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
            width: "100px",
            height: "100px",
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

      // Overlay menu caret hover.
      $(".tt-ol-submenu-caret-wrap .magnetic-wrap")
        .on("mouseenter", function () {
          gsap.to($ball, { duration: 0.3, scale: 0.6, borderWidth: 3 });
        })
        .on("mouseleave", function () {
          gsap.to($ball, {
            duration: 0.3,
            scale: 1,
            borderWidth: $ballBorderWidth,
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
              width: 95,
              height: 95,
              opacity: 1,
              borderWidth: 0,
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
              width: $ballWidth,
              height: $ballHeight,
              opacity: $ballOpacity,
              borderWidth: $ballBorderWidth,
            });
            $ball.removeClass("ball-view").find(".ball-view-inner").remove();
          });
        $(this).addClass("not-hide-cursor");
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

      // Blog interactive title link hover.
      $(".blog-interactive-item").each(function () {
        var $biItem = $(this);
        if ($biItem.find(".bi-item-image").length) {
          $biItem
            .find(".bi-item-title a")
            .on("mouseenter mouseover", function () {
              $("#magic-cursor").addClass("blog-interactive-hover-on");
              $biItem.find(".bi-item-image").appendTo($ball);
              gsap.to($ball, {
                duration: 0.3,
                width: "20vw",
                height: "20vw",
                opacity: 1,
              });
            })
            .on("mouseleave", function () {
              $("#magic-cursor").removeClass("blog-interactive-hover-on");
              $ball.find(".bi-item-image").appendTo($biItem);
              gsap.to($ball, {
                duration: 0.3,
                width: $ballWidth,
                height: $ballHeight,
                opacity: $ballOpacity,
              });
            });
          $biItem.find(".bi-item-title a").addClass("not-hide-cursor");
          $biItem.addClass("bi-item-image-on");
        }
      });

      // ================================================================
      // Scroll between anchors
      // ================================================================

      $('a[href^="#"]')
        .not('[href$="#"]') // omit from selection
        .not('[href$="#0"]') // omit from selection
        .on("click", function () {
          var target = this.hash;

          // If fixed header position enabled.
          if ($("#tt-header").hasClass("tt-header-fixed")) {
            var $offset = $("#tt-header").height();
          } else {
            var $offset = 0;
          }

          // You can use data attribute (for example: data-offset="100") to set top offset in HTML markup if needed.
          if ($(this).data("offset") != undefined)
            $offset = $(this).data("offset");

          if (!isMobile) {
            // Not for mobile devices!
            if ($("body").hasClass("tt-smooth-scroll")) {
              var topY =
                $(target).offset().top -
                $("#scroll-container > .scroll-content").offset().top -
                $offset;
              var $scrollbar = Scrollbar.init(
                document.getElementById("scroll-container"),
              );
              gsap.to($scrollbar, {
                duration: 1.5,
                scrollTo: { y: topY, autoKill: true },
                ease: Expo.easeInOut,
              });
            } else {
              var topY =
                $(target).offset().top - $("body").offset().top - $offset;
              $("html,body").animate({ scrollTop: topY }, 800);
            }
          } else {
            var topY =
              $(target).offset().top - $("body").offset().top - $offset;
            $("html,body").animate({ scrollTop: topY }, 800);
          }
          return false;
        });

      // ================================================================
      // Scroll to top
      // ================================================================

      $(".scroll-to-top").on("click", function () {
        if (!isMobile) {
          // Not for mobile devices!
          if ($("body").hasClass("tt-smooth-scroll")) {
            var $scrollbar = Scrollbar.init(
              document.getElementById("scroll-container"),
            );
            gsap.to($scrollbar, {
              duration: 1.5,
              scrollTo: { y: 0, autoKill: true },
              ease: Expo.easeInOut,
            });
          } else {
            $("html,body").animate({ scrollTop: 0 }, 800);
          }
        } else {
          $("html,body").animate({ scrollTop: 0 }, 800);
        }
        return false;
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

  // Scroll Down all elements with data-target attribute
  const scrollTriggers = document.querySelectorAll("[data-target]");

  // Define top offset (gap)
  const scrollOffset = 120;

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const targetSelector = trigger.getAttribute("data-target");
      const scrollTarget = document.querySelector(targetSelector);

      if (scrollTarget) {
        // If GSAP ScrollSmoother is active
        if (typeof smoother !== "undefined") {
          // Scroll with offset
          const targetPosition =
            scrollTarget.getBoundingClientRect().top +
            window.scrollY -
            scrollOffset;
          smoother.scrollTo(targetPosition, true);
        } else {
          // Fallback: native smooth scroll with offset
          const targetPosition =
            scrollTarget.getBoundingClientRect().top +
            window.scrollY -
            scrollOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // run only if #image-compare exists
  if ($("#image-compare").length > 0) {
    // options from your code
    const options = {
      verticalMode: true,
    };

    const compareEl = document.getElementById("image-compare");

    // init + mount
    const compareInstance = new ImageCompare(compareEl, options).mount();

    // Leave page scrolling enabled; the plugin already manages drag behavior.
    $(compareEl).on("mouseup touchend", function () {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    });
  }

  // horizontalLoop function define for Scrolling text Anim
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent"),
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;

    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }

    return tl;
  }

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const banner = document.querySelector(".banner-section");
    const bannerVector2 = document.querySelector(".banner-section .banner-vector2");
    const footer = document.querySelector("footer");
    const footerShape1 = document.querySelector("footer .vector-shape-1");
    const footerShape2 = document.querySelector("footer .vector-shape-2");

    if (banner && bannerVector2) {
      const bannerVectorMedia = gsap.matchMedia();

      bannerVectorMedia.add("(min-width: 992px)", () => {
        gsap.set(bannerVector2, {
          force3D: true,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        const bannerVectorTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: banner,
            start: "top top",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });

        bannerVectorTimeline.fromTo(
          bannerVector2,
          { y: -45, rotate: -4 },
          { y: 75, rotate: 5, ease: "none" },
        );

        return () => {
          bannerVectorTimeline.kill();
          gsap.set(bannerVector2, {
            clearProps: "transform,transformOrigin,willChange",
          });
        };
      });
    }

    if (footer && footerShape1 && footerShape2) {
      const footerShapeMedia = gsap.matchMedia();

      footerShapeMedia.add("(min-width: 992px)", () => {
        gsap.set([footerShape1, footerShape2], {
          force3D: true,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        const footerShapeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });

        footerShapeTimeline
          .fromTo(
            footerShape1,
            { y: -55, rotate: -4 },
            { y: 70, rotate: 4, ease: "none" },
            0,
          )
          .fromTo(
            footerShape2,
            { y: 60, rotate: 5 },
            { y: -75, rotate: -5, ease: "none" },
            0,
          );

        return () => {
          footerShapeTimeline.kill();
          gsap.set([footerShape1, footerShape2], {
            clearProps: "transform,transformOrigin,willChange",
          });
        };
      });
    }
  }

  gsap.registerPlugin(Observer);

  // Collect timelines
  const timelinesNormal = [];
  const timelinesReverse = [];

  // Normal sections
  document.querySelectorAll(".scroll-text-section").forEach((section) => {
    const groups = section.querySelectorAll(".scrolling-text .marquee__group");
    if (groups.length) {
      const tl = horizontalLoop(groups, {
        repeat: -1,
        paddingRight: 30,
      });
      timelinesNormal.push(tl);
    }
  });

  // Scroll reaction
  Observer.create({
    onChangeY(self) {
      let factor = 2.5;
      if (self.deltaY < 0) factor *= -1;

      // Normal direction
      timelinesNormal.forEach((tl) => {
        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      });

      // Reverse direction ALWAYS opposite
      timelinesReverse.forEach((tl) => {
        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, { timeScale: -factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: -factor / 2.5, duration: 1 }, "+=0.3");
      });
    },
  });

  
})(jQuery);
