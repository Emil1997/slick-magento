define([
    'jquery',
    'lib/slick'
], function($) {
    "use strict";

    return function(options, elm) {

        var breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        };

        var initialOptions = {
            overflowed: true,
            responsive: [
                {
                    breakpoint: breakpoints.mobile,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
        };

        var config = Object.assign({}, initialOptions, options);

        // Helper function to calc a width of parent
        var widthCalc = function(fromItem, maxItems) {

            var slides = $(elm).find('.slick-slide > div');

            var w = 0,
                items = slides.slice(fromItem, maxItems);

            items.each(function() {
                w += $(this).outerWidth();
            });

            return w;
        };

        var applyBehaviours = function (config) {

            if(config.calcWidth) {
                $(elm).animate({
                    'width': widthCalc(0, config.slidesToShow)
                }).css('overflow', 'visible');
            }

            if(config.equalHeight) {
                $(elm).find('.slick-slide').height('auto');

                var slickTrack = $(elm).find('.slick-track'),
                    slickTrackHeight = $(slickTrack).height();

                $(elm).find('.slick-slide').css('height', slickTrackHeight);
            }

            $(elm).on('setPosition', function(event, slick){

                if(config.calcWidth) {

                    var slideIndex = slick.currentSlide || 0;

                    $(elm).animate({
                        'width': widthCalc(slideIndex, config.slidesToShow + slideIndex)
                    }).css('overflow', 'visible');

                } else {
                    $(elm).css('width', 'auto');
                }

                if(config.equalHeight) {
                    $(elm).find('.slick-slide').height('auto');

                    var slickTrack = $(elm).find('.slick-track'),
                        slickTrackHeight = $(slickTrack).height();

                    $(elm).find('.slick-slide').css('height', slickTrackHeight);

                } else {
                    $(elm).css('height', 'auto');
                }

            });

            if(!config.overflowed) {
                $(elm).find('> .slick-list').css('overflow', 'visible');
            }

        };

        $(elm).on('init', function(event, slick) {
            applyBehaviours(slick.options);
        });

        //Init slick
        $(window).on('resize', function() {
            if($(elm).hasClass('slick-initialized')) {
                $(elm).slick('setPosition');

                return;
            }

            $(elm).slick(config);
        }).resize();

        $(elm).on('breakpoint', function(event, slick, breakpoint) {
            applyBehaviours(slick.options);
        });

        //Is parent element hidden?
        var hiddenElement = $(elm).parents(":hidden");

        if(hiddenElement.length) {

            var event = new $.Event('show'),
                origFn = $.fn.show;

            $.fn.show = function() {
                origFn.apply(this, arguments);
                $(this).trigger(event);
            };

            $(hiddenElement).on('show', function() {

                $(elm).slick('setPosition');
            });
        }
    };
});