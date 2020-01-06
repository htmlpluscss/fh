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
				main = swipe.classList.contains('swiper-container--main');

			swipeNav.className = 'swiper-pagination';
			swipeControls.className = 'swiper-controls';

			swipeBtns.className = 'swiper-navigation';
			swipePrev.className = 'swiper-button-prev button';
			swipeNext.className = 'swiper-button-next button';

			swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"></svg>';
			swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"></svg>';

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

			if (main) {

				swipeBtns.classList.remove('hide');

				toggleSwipe = () => {

					new Swiper(swipe, {
						loop: true,
						preloadImages: false,
						spaceBetween: 5,
						slidesPerView: 'auto',
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
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