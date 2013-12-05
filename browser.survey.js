/** @preserve
 * Detects which experience to serve to a user based on the client browser.
 *
 * Github: https://github.com/knation/browser-survey
 *
 * Version 0.0.1
 *
 * Kirk Morales (http://www.kirkmorales.com)
 * Copyright 2013. All Rights Reserved.
 * @license MIT LICENSE
 */

(function(window, document, navigator) {

  "use strict";

  /**
   * Default properties for the experiences we can render.
   * @type {object.<string, object>}
   * @static
   */
  var EXPIERIENCES = {
    'phone': { 'defaultMaxWidth': 480 },
    'tablet': { 'defaultMaxWidth': 1024 },
    'desktop': { }
  };

  /**
   * Regular expression for known tablet devices.
   * @type {RegExp}
   * @static
   */
  var KNOWN_TABLETS = new RegExp('iPad|Kindle|Silk|PlayBook', 'i');

  /**
   * Regular expression for known phone devices.
   * @type {RegExp}
   * @static
   */
  var KNOWN_PHONES = new RegExp('iPhone|iPod|BlackBerry', 'i');

  /**
   * Regular expression for known mobile devices (generic).
   * @type {RegExp}
   * @static
   */
  var KNOWN_MOBILE = new RegExp('Android', 'i');

  /**
   * The page body element.
   * @type {?DOMElement}
   */
  var BODY;

  /**
   * Gets the screen width. Returns null if it can't be detected.
   * @return {?number}
   */
  function getWidth() {
    if (document && document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    } else if (window) {
      if (window.innerWidth) {
        return window.innerWidth;
      } else if (window.outerWidth) {
        return window.outerWidth;
      }
    }

    return null;
  }

  /**
   * Called when the screen is resized.
   */
  function resized() {

    var experience;

    // If we have a user agent, test against our regular expressions
    if (navigator && navigator.userAgent) {
      if (KNOWN_PHONES.test(navigator.userAgent)) {
        experience = 'phone';
      } else if (KNOWN_TABLETS.test(navigator.userAgent)) {
        experience = 'tablet';
      } else if (KNOWN_MOBILE.test(navigator.userAgent)) {
        experience = 'mobile';
      }
    }

    // If we already know it's a phone or tablet, we're done here
    if (experience && experience != 'mobile') {
      render(experience);
      return;
    }

    // Get the screen width
    var width = getWidth();

    // If we couldn't get the width, but we know we're on a mobile device, serve the phone
    // version to be safe. Otherwise, if we don't have a width, just serve the desktop version.
    if (!width && experience == 'mobile') {
      render('tablet');
      return;
    } else if (!width) {
      render('desktop');
      return;
    }

    // If we know it's mobile, but the screen width is large, don't serve tablet
    if (experience == 'mobile' && width > EXPIERIENCES['tablet']['defaultMaxWidth']) {
      render('tablet');
      return;
    }

    // If we're here, we either couldn't match the user agent or we know it's mobile,
    // but the width is within our max bounds for tablet, so use the width
    // to figure out if it's tablet or mobile
    if (width <= EXPIERIENCES['phone']['defaultMaxWidth']) {
      render('phone');
    } else if (width <= EXPIERIENCES['tablet']['defaultMaxWidth']) {
      render('tablet');
    } else {
      render('desktop');
    }
  }

  /**
   * Renders the appropriate experience for the user.
   * @param {string} experience The appropraite experience(phone,tablet,or desktop)
   * @param {?number=} width Screen width
   */
  function render(experience, width) {
    // Make sure the experience provided is valid
    if (!(experience in EXPIERIENCES)) return;

    // Remove all old classes from the body
    BODY.className = BODY.className.replace(/phone|tablet|desktop/g,'');

    // Add this class to the body
    BODY.className += ' ' + experience;

    // Load additional CSS if necessary
    var linkAttr = 'data-href-' + experience,
        links, i, src, currentSrc;
    
    links = document.querySelectorAll('link[' + linkAttr + ']');

    for (var i=0;i<links.length;i++) {
      currentSrc = links[i].getAttribute('href');
      src = links[i].getAttribute(linkAttr);

      if (src && currentSrc != src) {
        links[i].setAttribute('href', src);
      }
    }
  }

  // Bind window ready event
  window.addEventListener('load', function() {
    // Get body tag
    BODY = document.getElementsByTagName('body')[0];

    resized();
  });

  // Bind window resize event
  window.addEventListener('resize', resized);

  // Bind orientation change event for mobile phones
  window.addEventListener('orientationchange', resized);

})(window, document, navigator);
