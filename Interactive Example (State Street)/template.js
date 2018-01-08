var Findings = function(container) {

  // Scope everything to this slide
  var container = $(container);

  // Elements
  var intro = container.find('.intro');
  var coworkerContainer = container.find('.coworkers');
  var allCoworkers = container.find('.coworker');
  var initialImage = container.find('.initial-image');
  var content = container.find('.content');


  var init = function() {

    // LMS Functions
    window.addEventListener('load', function() {
      StateStreet.init();
    });

    initialView();

  };

  var initialView = function() {

    // intro elements fade in
    var introChildren = container.find('.intro').children();
    var contentLength = introChildren.length;
    var timeoutAmount = 200;
    var timeoutGap = 200;

    var doSetTimeout = function(i) {
      setTimeout(function() {
        $(introChildren[i]).addClass('visible');
      }, timeoutAmount);
    };

    for (var i = 0; i < contentLength; i++) {
      doSetTimeout(i);
      timeoutAmount = timeoutAmount + timeoutGap;
    }

    // coworkers fade in as group
    setTimeout(function() {
      coworkerContainer.addClass('visible');
    }, 900);


    allCoworkers.on('click', openCoworker);

  };

  var openCoworker = function(ev) {

    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    // when user clicks a coworker...
    var thisCoworker = $(this);

    // fade out the intro, initial imgs, and any checkmarks
    initialImage.fadeOut(400);
    allCoworkers.find('.visited').fadeOut(400);
    intro.fadeOut(500);

    // delay showing the open coworker so stuff above can fade out
    setTimeout(function() {
      thisCoworker.addClass('open');
      thisCoworker.find('.column').addClass('visible');
      thisCoworker.siblings('.coworker').addClass('hidden');
    }, 700)

    // fade-in new svg column
    setTimeout(function() {
      thisCoworker.find('.column').addClass('faded');
    }, 800);

    // stagger element reveal in content div
    var contentChildren = thisCoworker.find('.content').children();
    var contentLength = contentChildren.length;
    var timeoutAmount = 200;
    var timeoutGap = 200;

    var doSetTimeout = function(i) {
      setTimeout(function() {
        $(contentChildren[i]).addClass('visible');
      }, timeoutAmount);
    };

    for (var i = 0; i < contentLength; i++) {
      doSetTimeout(i);
      timeoutAmount = timeoutAmount + timeoutGap;
    }

    // find 'close' and do a close function on that when clicked
    thisCoworker.find('.close').on('click', closeCoworker);

  };

  var closeCoworker = function(ev) {

    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    // when user clicks close
    var thisCloseButton = $(this);

    initialImage.fadeIn(400);
    allCoworkers.find('.visited').fadeIn(400);
    intro.fadeIn(500);

    // remove class visible from content elements
    content.children().removeClass('visible');

    // hide column contents
    thisCloseButton.parent().find('.column').removeClass('visible faded');

    // show initial-image
    thisCloseButton.parent().find('.initial-image').removeClass('hidden');

    // remove class open from the parent
    thisCloseButton.parent().removeClass('open');

    // show parent's siblings again
    allCoworkers.removeClass('hidden');

    // mark as clicked
    thisCloseButton.parent().addClass('clicked');

    // enable forward nav when all coworkers have been opened
    var clicked = container.find('.clicked').length;

      if (clicked === 3) {
        StateStreet.unlockNext();
      }

  };

  // Run stuff
  init();
};
