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
				review = swipe.classList.contains('swiper-container--review');

			swipeNav.className = 'swiper-pagination';
			swipeControls.className = 'swiper-controls';

			swipeBtns.className = 'swiper-navigation';
			swipePrev.className = 'swiper-button-prev button';
			swipeNext.className = 'swiper-button-next button';

			swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M7.828 11.0002L13.192 5.63617L11.778 4.22217L4 12.0002L11.778 19.7782L13.192 18.3642L7.828 13.0002H20V11.0002H7.828Z"/></svg>';
			swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.172 11.0002l-5.364-5.364 1.414-1.414L20 12.0002l-7.778 7.778-1.414-1.414 5.364-5.364H4v-2h12.172z"/></svg>';

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

	/*			swipeNav.classList.add('hide');
				swipeNext.classList.add('hide');
				swipePrev.classList.add('hide');
	*/
			}

			resetSwipe();

			if (review) {

				toggleSwipe = () => {

					new Swiper(swipe, {
						loop: true,
						preloadImages: false,
						pagination: {
							clickable: true,
							bulletElement: 'button',
							bulletClass: 'button',
							bulletActiveClass: 'is-active',
							el: swipeNav
						},
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						loopFillGroupWithBlank: true,
						breakpoints: {
							768: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								spaceBetween: 0
							},
							1200: {
								slidesPerView: 2,
								slidesPerGroup: 1,
								spaceBetween: 140
							}
						}
					});

					toggleSwipe = null;

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