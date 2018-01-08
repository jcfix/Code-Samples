var ContentBasic = function(container) {

  // Scope everything to this slide.
  var container = $(container);

  // Elements
  var asset = container.find('.asset');
  var bodyContainer = container.find('.body');
  var downArrow = container.find('.down-arrow');

  var init = function() {

    // LMS Functions
    window.addEventListener('load', function() {
      FathomTheme.init();
      FathomTheme.unlockNext();
    });

    downArrow.on('click', scrollDown);

    initialView();

  };

  var initialView = function() {

    // Stagger visibility of elements

    setTimeout(function() {
      container.addClass('visible');
      asset.addClass('visible');
    }, 400);

    var bodyChildren = bodyContainer.children();
    var bodyLength = bodyChildren.length;
    var timeoutAmount = 700;
    var timeoutGap = 200;

    var doSetTimeout = function(i) {
      setTimeout(function() {
        $(bodyChildren[i]).addClass('visible');
      }, timeoutAmount);
    };

    for (var i = 0; i < bodyLength; i++) {
      doSetTimeout(i);
      timeoutAmount = timeoutAmount + timeoutGap;
    }

    setTimeout(function() {
      downArrow.addClass('visible');
    }, 2000);

  };

  var scrollDown = function(ev) {

    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    var currentDownArrow = $(this);

    var parentSlide = currentDownArrow.parents('.template-wrapper');
    var nextSlide = parentSlide.next();
    var slideOffset = nextSlide.offset().top;

    $('html, body').animate({
      scrollTop: slideOffset
    }, 800);

  };

  // Run stuff
  init();

};
