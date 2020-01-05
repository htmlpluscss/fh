/*! UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

var SC = {};

(function(){

	SC.resizeTimeout = null,
	SC.windowWidthOLd = window.innerWidth,

	window.addEventListener("resize", function(){

		window.requestAnimationFrame(function(){

			if (!SC.resizeTimeout) {

				SC.resizeTimeout = setTimeout(function() {

					SC.resizeTimeout = null;

					if(SC.windowWidthOLd !== window.innerWidth) {

						SC.windowWidthOLd = window.innerWidth;

						PubSub.publish('windowWidthResize');

					}

				}, 100);

			}

		});

	});

	window.addEventListener("scroll", function(){

		window.requestAnimationFrame(function(){

			PubSub.publish('windowScroll');

		});

	});

	window.addEventListener("DOMContentLoaded", function(){

		PubSub.publish('DOMContentLoaded');

	});

	window.addEventListener("load", function(){

		PubSub.publish('pageLoad');

	});

	// обработчик анимаций
	SC.cssAnimation = function(a){var b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]}

	// Determine if an element is in the visible viewport
	SC.isInViewport = function(element) {
		var rect = element.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	}

})();