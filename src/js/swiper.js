(()=>{

	"use strict";

	FH.swiper = (swiperContainer)=>{

		Array.prototype.forEach.call(swiperContainer, (swipe)=>{

			var mySwipe = null,
				toggleSwipe = null,
				resetSwipe = null,
				swipeControls = document.createElement('div'),
				swipeNav = document.createElement('div'),
				swipeBtns = document.createElement('div'),
				swipeNext = document.createElement('button'),
				swipePrev = document.createElement('button'),
				items = swipe.querySelectorAll('.swiper-slide'),
				count = items.length,
				main = swipe.classList.contains('swiper-container--main'),
				product = swipe.classList.contains('swiper-container--product'),
				related = swipe.classList.contains('swiper-container--related');

			swipeNav.className = 'swiper-pagination';
			swipeControls.className = 'swiper-controls';

			swipeBtns.className = 'swiper-navigation';
			swipePrev.className = 'swiper-button-prev button';
			swipeNext.className = 'swiper-button-next button';

			swipePrev.innerHTML = '<svg width="10" height="21" viewBox="0 0 10 21"><path d="M.15,10.92l8.93,9.91a.5.5,0,0,0,.76,0,.64.64,0,0,0,0-.84L1.29,10.5,9.84,1a.64.64,0,0,0,0-.84A.51.51,0,0,0,9.47,0a.5.5,0,0,0-.38.18L.16,10.08A.64.64,0,0,0,.15,10.92Z"/></svg>';
			swipeNext.innerHTML = '<svg width="10" height="21" viewBox="0 0 10 21"><path d="M9.85,10.08.92.17a.5.5,0,0,0-.76,0A.64.64,0,0,0,.16,1L8.71,10.5.16,20a.64.64,0,0,0,0,.84A.51.51,0,0,0,.53,21a.5.5,0,0,0,.38-.18l8.93-9.91A.64.64,0,0,0,9.85,10.08Z"/></svg>';

			swipeBtns.appendChild(swipePrev);
			swipeBtns.appendChild(swipeNext);
			swipeControls.appendChild(swipeBtns);
			swipeControls.appendChild(swipeNav);
			swipe.parentNode.appendChild(swipeControls);

			resetSwipe = () => {

				if(mySwipe) {

					mySwipe.destroy(false,true);
					mySwipe = undefined;

				}

				swipeNav.classList.add('hide');
				swipeBtns.classList.add('hide');

			}

			resetSwipe();

			toggleSwipe = () => {

				if (window.innerWidth >= 768) {

					swipeNav.classList.add('hide');
					swipeBtns.classList.remove('hide');

				}
				else {

					swipeNav.classList.remove('hide');
					swipeBtns.classList.add('hide');

				}

				if(!mySwipe) {

					mySwipe = new Swiper(swipe, {
						loop: true,
						updateOnImagesReady: true,
						preloadImages: true,
						spaceBetween: 5,
						slidesPerView: 'auto',
						loopAdditionalSlides: 1,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						pagination: {
							clickable: true,
							bulletElement: 'button',
							bulletClass: 'button',
							bulletActiveClass: 'is-active',
							el: swipeNav
						}
					});

				}

			}

			PubSub.subscribe('windowWidthResize', function(){

				if (window.Swiper && toggleSwipe) {

					toggleSwipe();

				}

			});

			if(window.Swiper && toggleSwipe) {

				toggleSwipe();

			}
			else {

				PubSub.subscribe('swiperJsLoad', toggleSwipe);

			}

			if(!FH.swiper.init) {

				FH.swiper.init = true;

				var script = document.createElement('script');

				script.type = 'text/javascript';
				script.async = true;
				script.src = '/js/swiper.min.js';

				script.onload = () => PubSub.publish('swiperJsLoad');

				document.head.appendChild(script);

			}

		});

	};

	((swiperContainer)=>{

		if(swiperContainer.length) {

			FH.swiper(swiperContainer);

		}

	})(document.querySelectorAll('.swiper-container'));

})();