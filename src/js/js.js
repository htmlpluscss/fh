/*! UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

(()=>{

	"use strict";

	window.FH = window.FH || {};
	FH.resizeTimeout = null;
	FH.windowWidthOLd = window.innerWidth;

	window.addEventListener("resize",()=>{

		window.requestAnimationFrame(()=>{

			if (!FH.resizeTimeout) {

				FH.resizeTimeout = setTimeout(()=>{

					FH.resizeTimeout = null;

					if(FH.windowWidthOLd !== window.innerWidth) {

						FH.windowWidthOLd = window.innerWidth;

						PubSub.publish('windowWidthResize');

					}

				}, 100);

			}

		});

	});

	window.addEventListener("scroll",()=>{

		window.requestAnimationFrame(()=>{

			PubSub.publish('windowScroll');

		});

	});

	window.addEventListener("DOMContentLoaded",()=>{

		PubSub.publish('DOMContentLoaded');

	});

	window.addEventListener("load",()=>{

		PubSub.publish('pageLoad');

	});

	// обработчик анимаций
	FH.cssAnimation = (a)=>{var b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]};

	// Determine if an element is in the visible viewport
	FH.isInViewport = (element) => {
		var rect = element.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	};

})();