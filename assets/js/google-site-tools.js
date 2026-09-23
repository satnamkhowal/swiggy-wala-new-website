/*
 * Swiggy Wala - Google site tools loader
 *
 * Static HTML replacement for the tracking part of Google Site Kit.
 * Fill either GTM_CONTAINER_ID or GA4_MEASUREMENT_ID below.
 * Prefer GTM when both are available to avoid duplicate page views.
 */
(function () {
  'use strict';

  var CONFIG = {
    GTM_CONTAINER_ID: '',      // Example: GTM-XXXXXXX
    GA4_MEASUREMENT_ID: ''     // Example: G-XXXXXXXXXX
  };

  var gtmId = (CONFIG.GTM_CONTAINER_ID || '').trim();
  var ga4Id = (CONFIG.GA4_MEASUREMENT_ID || '').trim();

  window.dataLayer = window.dataLayer || [];

  function pushEvent(name, params) {
    var payload = Object.assign({ event: name }, params || {});

    if (gtmId) {
      window.dataLayer.push(payload);
      return;
    }

    if (ga4Id && typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  window.swTrack = pushEvent;

  function loadGtm() {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId);
    document.head.appendChild(script);
  }

  function loadGa4() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4Id);
    document.head.appendChild(script);

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', ga4Id, {
      send_page_view: true
    });
  }

  if (gtmId) {
    loadGtm();
  } else if (ga4Id) {
    loadGa4();
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120);

    if (href.indexOf('tel:') === 0) {
      pushEvent('phone_click', {
        link_url: href,
        link_text: label
      });
      return;
    }

    if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href)) {
      pushEvent('whatsapp_click', {
        link_url: href,
        link_text: label
      });
      return;
    }

    var customEvent = link.getAttribute('data-track-event');
    if (customEvent) {
      pushEvent(customEvent, {
        link_url: href,
        link_text: label
      });
    }
  });

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || form.tagName !== 'FORM') return;

    pushEvent(form.getAttribute('data-track-event') || 'lead_submit', {
      form_id: form.id || '',
      form_name: form.getAttribute('name') || '',
      page_location: window.location.href
    });
  }, true);
})();
