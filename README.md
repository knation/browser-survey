browser-survey
==============

Survey's the client browser to detect what type of experience should be served to the user.

No media queries are used. Instead, this script first tries to detect common mobile devices. If it can, it will serve that experience (e.g., iPhone will always get the 'phone' experience, regardless of browser width).

If the device is not detected, then it falls back to using the browser width.

How to use
===

Simply include the script anywhere in your HTML:

<pre>
&lt;script type="text/javascript" src="/path/to/browser.survey.min.js"></script>
</pre>

The body tag will be given one of the following classes based on which experience should be served to the user:

phone: If the device is a known phone (e.g., iPhone) or is less than 480px wide.

tablet: If the device is a known tablet or is between 481-1024px.

desktop: If the device is greater than 1024px width and is not a known mobile device.

Example CSS
===

Hide an element when in desktop mode:

<pre>body.desktop #myelement { display: none; }</pre>

Show an element when a phone or tablet:

<pre>body.phone #myelement,
body.tablet #myelement {
  display: block;
}</pre>

Load CSS files dynamically
===

This script gives you the ability to load CSS files ONLY for a specific experience. For example, don't load any styles (or subsequent images) for desktop if the site is being viewed on a phone. This allows you to segregate the image sizes and styles that are served for different devices, subsequently saving bandwidth and having your site load faster on mobile devices.

To load a CSS file dynamically, simply include a ```<link>``` tag in your HTML with various ```data-href-*``` attributes, specifying which files to load for which experience.

<pre>&lt;link rel="stylesheet" data-href-phone="phone.css" data-href-tablet="tablet.css" data-href-desktop="desktop.css" /></pre>

If you only have developed a "phone" and "desktop" experience, you could use something like this:

<pre>&lt;link rel="stylesheet" data-href-phone="phone.css" data-href-tablet="default.css" data-href-desktop="default.css" /></pre>

Media Queries
===

Media Queries are NOT used in this script. You may, however, still use media queries in your CSS if you wish.

Dependencies
===

None! This script is pure JavaScript and does not require jQuery, AngularJS, or anything else!

Compatibility
===

Chrome, Firefox 3.5+, IE 8+, Opera 10+, Safari 3.2+

License
=========

MIT LICENSE

Contributors
=========

[Kirk Morales]

  [Kirk Morales]: http://www.kirkmorales.com
