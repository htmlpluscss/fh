SC.swiper = function(swiperContainer){

	Array.prototype.forEach.call(swiperContainer, function(swipe){

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
			analyticsCol = swipe.classList.contains('swiper-container--analytics-col'),
			analyticsPreview = swipe.classList.contains('swiper-container--analytics-preview'),
			cases = swipe.classList.contains('swiper-container--cases'),
			review = swipe.classList.contains('swiper-container--review'),
			popular = swipe.classList.contains('swiper-container--popular');

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

		resetSwipe = function(){

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

		if (cases) {

			var camp = document.querySelectorAll('.cpc-cases__camp-item'),
				activeCamp = camp[0],
				imgsBox = document.querySelector('.cpc-cases__imgs'),
				BoxLeftForImgs = null,
				bar = document.querySelector('#cpc-cases-bar').innerHTML,
				progressInterval = null;

			function innerImgsBox(activeIndex){

				BoxLeftForImgs = swipe.swiper.slides[activeIndex].querySelector('.cpc-cases__imgs-item').cloneNode(true);

				imgsBox.innerHTML = '';
				imgsBox.appendChild(BoxLeftForImgs);

			}

			function setBarDetals(bar,el){

				bar.querySelector('.cpc-cases__bar-img').innerHTML = '';
				bar.querySelector('.cpc-cases__bar-img').appendChild(el.querySelector('img').cloneNode(true));
				bar.querySelector('.cpc-cases__bar-name').textContent = el.querySelector('figcaption').textContent;

			}

			function createLineBar(el){

				var _img = el.querySelectorAll('.cpc-cases__img'),
					lines = '';

				for(var i = 0; i < _img.length; i++){

					lines += '<span><i></i></span>';

				}

				return lines;

			}

			function timerLine(box){

				if(!swipe.swiper) {

					return;

				}

				box = box ? box : swipe.swiper.slides[swipe.swiper.activeIndex];

				var _img = box.querySelectorAll('.cpc-cases__img'),
					progressLines = box.querySelectorAll('.cpc-cases__bar-items i');

				Array.prototype.forEach.call(_img, function(el,index){

					el.classList.toggle('is-active', index < 1);

				});

				var i = 0,
					progressProcent = 0;

				clearInterval(progressInterval);

				progressInterval = setInterval(function(){

					if(progressProcent > 100) {

						progressProcent = 0;
						i++;

						_img[i] && _img[i].classList.add('is-active');

					}

					if(progressLines[i]) {

						progressLines[i].style.width = progressProcent + '%';

						progressProcent++;

					}
					else {

						mySwipe.slideNext();

					}

				},50);

			}

			function campSetActive() {

				if(mySwipe){

					Array.prototype.forEach.call(camp, function(el,index){
						if(index === mySwipe.realIndex){
							el.classList.add('is-active');
							activeCamp = camp[index];
						}
						else {
							el.classList.remove('is-active');
						}
					});

				}

			}

			// клонируем бар в каждый слайд

			Array.prototype.forEach.call(items, function(el,index){

				var _bar = document.createElement('div');

				_bar.className = 'cpc-cases__bar';

				_bar.innerHTML = bar;

				el.querySelector('.cpc-cases__imgs-item').appendChild(_bar);

				setBarDetals(el,camp[index]);

				el.querySelector('.cpc-cases__bar-items').innerHTML = createLineBar(el);

			});

			// обработчик на иконки кампаний

			Array.prototype.forEach.call(camp, function(el,index){

				el.addEventListener('click', function(){

					mySwipe && mySwipe.slideToLoop(index);

				});

			});

			// обнуляем линии и картинки
			function resetSlide(s) {

				var _img = swipe.swiper.slides[s].querySelectorAll('.cpc-cases__img'),
					progressLines = swipe.swiper.slides[s].querySelectorAll('.cpc-cases__bar-items i');

				Array.prototype.forEach.call(progressLines, function(el,index){

					el.style.width = 0;

					if(index > 0) {

						_img[index].classList.remove('is-active');

					}

				});

			}

			toggleSwipe = function() {

				resetSwipe();

				if (window.innerWidth < 768) {

					mySwipe = new Swiper(swipe, {
						loop: true,
						loopAdditionalSlides: 1,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {

							init: function() {

								timerLine();

								// слушаем изменения в слайдах
/*
								var observer = new MutationObserver(function(e){

									var _slide = e[0].target.closest('.swiper-slide'),
										index = _slide.getAttribute('data-swiper-slide-index');

									console.log(e,index);

									Array.prototype.forEach.call(swipe.swiper.slides, function(el){

										if(el.getAttribute('data-swiper-slide-index') === index && el !== _slide){

											el.innerHTML = _slide.innerHTML;

										}

									});

								});

								Array.prototype.forEach.call(swipe.swiper.slides, function(el){
									observer.observe(el, {
										subtree: true,
										attributes: true,
										attributeFilter: ['class']
									});
								});
*/
							},

							slideChange: function() {

								clearInterval(progressInterval);

								// последний слайд(клик вправо) перед loop
								if(swipe.swiper.previousIndex === swipe.swiper.slides.length - 2){

									var prev = swipe.swiper.slides[swipe.swiper.previousIndex];
									var active = swipe.swiper.slides[swipe.swiper.activeIndex];

									active.innerHTML = prev.innerHTML;
									resetSlide(swipe.swiper.previousIndex);

								}
								// первый слайд(клик влево) перед loop
								else if(swipe.swiper.previousIndex === 1){

									var prev = swipe.swiper.slides[swipe.swiper.previousIndex];
									var active = swipe.swiper.slides[swipe.swiper.activeIndex];

									active.innerHTML = prev.innerHTML;
									resetSlide(swipe.swiper.previousIndex);

								}
								else {

									Array.prototype.forEach.call(swipe.swiper.slides, function(el,index){

										if(index > swipe.swiper.activeIndex - 2 && index < swipe.swiper.activeIndex + 2) {

											return;

										}

										resetSlide(index);

									});

								}

							},

							slideChangeTransitionEnd: function() {

								console.log(swipe.swiper.previousIndex)
								resetSlide(swipe.swiper.previousIndex);

								campSetActive();
								timerLine();

							}

						}
					});

				}
				else {

					mySwipe = new Swiper(swipe, {
						loop: true,
						effect: 'fade',
						fadeEffect: {
							crossFade: true
						},
						simulateTouch: false,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {

							transitionStart: function() {

								// активный слайд вставляем в блок слева

								innerImgsBox(swipe.swiper.activeIndex);

								campSetActive();
								timerLine(imgsBox);

							}

						}
					});

				}

			}

		}

		if (review) {

			toggleSwipe = function() {

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

		if (popular) {

			toggleSwipe = function() {

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
						320: {
							slidesPerView: 1,
							slidesPerGroup: 1,
							spaceBetween: 0
						},
						768: {
							slidesPerView: 2,
							slidesPerGroup: 2,
							spaceBetween: 20
						},
						1200: {
							slidesPerView: 3,
							slidesPerGroup: 1,
							spaceBetween: 50
						}
					}
				});

				toggleSwipe = null;

			}

		}

		if (analyticsCol) {

			swipeBtns.classList.add('hide');

			toggleSwipe = function() {

				resetSwipe();

				swipe.parentNode.parentNode.classList.remove('swiper-container-style');
				swipeNav.classList.add('hide');

				if (window.innerWidth < 1200) {

					swipe.parentNode.parentNode.classList.add('swiper-container-style');
					swipeNav.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						autoHeight: true,
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

		}

		if (analyticsPreview) {

			swipeBtns.classList.add('hide');

			toggleSwipe = function() {

				resetSwipe();

				swipe.parentNode.parentNode.classList.remove('swiper-container-style');
				swipeNav.classList.add('hide');

				if (window.innerWidth < 1200) {

					swipe.parentNode.parentNode.classList.add('swiper-container-style');
					swipeNav.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
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

		if(!SC.swiper.init) {

			SC.swiper.init = true;

			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.async = true;
			script.src = '/js/swiper.min.js';

			script.onload = function () {

				PubSub.publish('swiperJsLoad');

			};

			document.head.appendChild(script);

		}

	});

};

if(document.querySelector('.swiper-container')) {

	SC.swiper(document.querySelectorAll('.swiper-container'));

}