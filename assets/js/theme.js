/* global Pace */

(function($){
    "use strict";
    
    var $document = $(document),
        $window = $(window),
        $htmlBody = $('html, body'),
        $body = $('body'),
        $navbar = $('.navbar'),
        $navbarCollapse = $('.navbar-collapse'),
        $pageScrollLink = $('.page-scroll'),
        $scrollToTop = $('.scroll-to-top'),
        $galleryGrid = $('.gallery-grid'),
        navHeight = 80,
        navHeightShrink = 60;
      
    /** Detect mobile device */
    var isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function(){
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function(){
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    
    /*
    * Window load
    */
   
    $window.on('load', function(){
        
        /** Bootstrap scrollspy */
        var ww = Math.max($window.width(), window.innerWidth);
        $body.scrollspy({    
            target: '#navigation',
            offset: ww > 992 ? navHeightShrink : navHeight
        });

    });
    
    
    /*
    * Document ready
    */
   
    $document.ready(function(){
        //$('#modalIMG').modal('show');
        /*Incializacion de wow */
        new WOW().init();

        // init Isotope
        var $grid = $('.grid-precios').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        $grid.isotope({ filter: '.12mois' });
        
        // filter items on button click
        $('#filters-button-group').on( 'click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            var elems = $grid.isotope('getItemElements');
            $grid.isotope({ filter: filterValue });
        });

        // change is-checked class on buttons
        $('#filters-button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });

        $('#contactModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('whatever') // Extract info from data-* attributes
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          //modal.find('.modal-title').text('New message to ' + recipient)
          modal.find('.modal-body input[name=subject]').val(recipient);
        })

        /*
        * Window scroll
        */
       
        $window.on('scroll', function(){
            
            
            if ($document.scrollTop() > navHeight){
                
                /** Shrink navigation */
                $navbar.addClass('shrink');
                
                /** Scroll to top */
                $scrollToTop.fadeIn();
            }
            else{
                
                /** Shrink navigation */
                $navbar.removeClass('shrink');
                
                /** Scroll to top */
                $scrollToTop.fadeOut();
            }
        });
        
        
        /*
        * Window resize
        */
       
        $window.resize(function() {
            
            /** Bootstrap scrollspy */
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($window.width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;
        
            dataScrollSpy._config.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');        
            
            /** Gallery grid */
            if ($.fn.isotope){
                $galleryGrid.isotope('layout');
            }
        });
        
        
        /** Page scroll */ 
        $pageScrollLink.on('click', function(e){
            var anchor = $(this),
                target = anchor.attr('href');
            pageScroll(target);
            e.preventDefault();
        });
        
        function pageScroll(target){
            var ww = Math.max($window.width(), window.innerWidth),
                    offset = ww > 992 ? navHeightShrink : navHeight;
            
            $htmlBody.stop().animate({
                scrollTop: $(target).offset().top - (offset - 1)
            }, 1000, 'easeInOutExpo');
            
            // Automatically retract the navigation after clicking on one of the menu items.
            $navbarCollapse.collapse('hide');
        };
        
        /** Carousel Custom - Init */
        if ($.fn.flickity){
            
            /** Section - Our Latest Work */
            var $carouselWork = $('#carousel-work');
            carouselCustom($carouselWork);
            
            /** Section - Reviews */
            var $carouselReviews = $('#carousel-reviews');
            carouselCustom($carouselReviews);
        }
        
        /** Carousel Custom */
        function carouselCustom($elem){
            var $carouselControl = $elem.closest('.carousel-custom-wrap').find('.carousel-custom-control'),
                $btnPrev = $carouselControl.find('.control-previous'),
                $btnNext = $carouselControl.find('.control-next');
                
            $elem.flickity({
                cellSelector: '.carousel-cell',
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: $elem.data('pagedots'),
                draggable: $elem.data('draggable'),
                autoPlay: $elem.data('autoplay'),
                imagesLoaded: true,
                pauseAutoPlayOnHover: false
            });
            
            if ($elem.data('autoplay')){
                var flkty = $elem.data('flickity');
                $elem.find('.flickity-page-dots').on('mouseleave', function(){ 
                    flkty.playPlayer(); 
                });
            }
            
            $btnPrev.on('click', function(e){
                $elem.flickity('previous', true);
                e.preventDefault();
            });
            
            $btnNext.on('click', function(e){
                $elem.flickity('next', true);
                e.preventDefault();
            });
        }

        /** Gallery */
        if ($.fn.imagesLoaded && $.fn.isotope){
            $galleryGrid.imagesLoaded(function(){
                $galleryGrid.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry'
                });
            });
        }
        
        
        /** Gallery - Magnific popup */
        if ($.fn.magnificPopup){
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                gallery:{
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> sur <span class="mfp-counter-total">%total%</span>'
                }
            });
            
            var $popupTrigger = $('.popup-trigger'),
                $popupTriggerClose = $('.popup-trigger-close');
        
            $popupTrigger.on('click', function(e){
                $.magnificPopup.open({
                    items: {
                        src: $(this).closest('.popup-container').find('.popup-content')
                    },
                    type: 'inline',
                    fixedContentPos: true,
                    closeOnContentClick: false,
                    callbacks: {
                        open: function () {
                            $('.mfp-wrap').addClass('popup-wrap');
                        },
                        close: function () {
                            $('.mfp-wrap').removeClass('popup-wrap');
                        }
                    }
                });
                
                e.preventDefault();
            });
            
            $popupTriggerClose.on('click', function(e){
                $.magnificPopup.close();
                e.preventDefault();
            });
        }
        
        /** BG Parallax */
        if (typeof ScrollMagic !== 'undefined'){
            var selector = '#home-bg-parallax';
            
            // Init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 'onEnter', duration: '200%'}});
        
            // Build scenes
            new ScrollMagic.Scene({triggerElement: selector})
                    .setTween(selector + ' > .bg-parallax', {y: '80%', ease: Linear.easeNone})
                    .addTo(controller);
        }
        
        
        /** BG Slider */
        if ($.fn.flickity){
            var $carouselBgSlider = $('#home').find('.carousel-custom');
            carouselCustom($carouselBgSlider);
        }
        
        
        /** BG Slideshow */
        if ($.fn.flexslider){
            var $bgSlideshow = $('#home-bg-slideshow').find('.bg-slideshow-wrapper');
            $bgSlideshow.flexslider({
                selector: '.slides > .bg-cover',
                easing: 'linear',
                slideshowSpeed: $bgSlideshow.data('slideshowSpeed'),
                controlNav: false,
                directionNav: $bgSlideshow.data('directionNav'),
                prevText: '',
                nextText: '',
                keyboard: false,
                pauseOnAction: true,
                touch: false
            });
        }
            
        /** Contact form */
        var $contactForm = $('#form-contact'),
            $btnContactForm = $('#btn-form-contact');

        $contactForm.submit(function (){
            event.preventDefault();
            $contactForm.validate();
            if ($contactForm.valid()){
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LfrkakUAAAAAHr04xFcTwGIPVKNHUhAAtksj39n', { action: 'contact' }).then(function(token) {
                        send_mail($contactForm, $btnContactForm, token);
                    });
                });
            }
        });
        
        // Send mail
        function send_mail($form, $btnForm, token){
            var defaultMessage = $btnForm.html(),
                sendingMessage = 'Chargement...',
                errorMessage = 'Envoi d\'erreur!',
                okMessage = 'Email envoyé!';
            
            $btnForm.html(sendingMessage);
            
            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                dataType: 'json',
                data: {
                    'name' : $form.find('input[name="name"]').val(),
                    'email' : $form.find('input[name="email"]').val(),
                    'subject' : $form.find('input[name="subject"]').val(),
                    'message' : $form.find('textarea').val(),
                    'location' : $form.find('input[name="location"]').val(),
                    'token' : token
                },
                success: function(data){
                    if (data === 1){
                        $btnForm.html(okMessage);
                        $form.find('input[type="text"], input[type="email"], textarea').val('');
                    }
                    else{
                        $btnForm.html(errorMessage);
                    }

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                },
                error: function(xhr, err){
                    $btnForm.html(errorMessage);

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                }
            });
        }

        $('.customer-logos').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
    });
})(jQuery);