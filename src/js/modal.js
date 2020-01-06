(function(modal){

	"use strict";

	if(!modal) {

		return;

	}

	var items = modal.querySelectorAll('.modal__item'),
		btns = document.querySelectorAll('[data-modal]'),
		box = modal.querySelector('.modal__box'),
		wrapper = document.querySelector('.wrapper'),
		windowScroll = 0;

	modal.addEventListener('click', (e) => {

		if(e.target.classList.contains('modal') || e.target.closest('.modal__close')){

			SC.hideModal();

		}

	});

	SC.hideModal = () => {

		modal.classList.add('visuallyhidden');

		document.body.classList.remove('modal-show');
		wrapper.style.top = 0;
		window.scrollTo(0,windowScroll);

		SC.activeModal = false;

		setTimeout(()=>{

			document.documentElement.classList.remove('scroll-behavior-off');

		});

	};

	SC.modalShow = (selector, text)=>{

		document.documentElement.classList.add('scroll-behavior-off');

		if(!SC.activeModal){

			windowScroll = window.pageYOffset;

			wrapper.style.top = -windowScroll + 'px';

		}

		SC.activeModal = modal.querySelector('.modal__item--' + selector);

		box.classList.toggle('modal__box--wide', SC.activeModal.classList.contains('modal__item--wide'));

		Array.prototype.forEach.call(items,(el)=>{

			el.classList.toggle('visuallyhidden', el !== SC.activeModal);

		});

		modal.classList.remove('visuallyhidden');

		document.body.classList.remove('menu-show');
		document.body.classList.add('modal-show');
		window.scrollTo(0,0);

		SC.activeModal.focus();

	};

	Array.prototype.forEach.call(btns,(el)=>{

		el.addEventListener('click',(e)=>{

			e.preventDefault();

			SC.modalShow(this.getAttribute('data-modal'));

		});

	});

})(document.querySelector('.modal'));