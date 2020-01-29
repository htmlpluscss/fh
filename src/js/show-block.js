
((items)=>{

	"use strict";

	if(!items.length) {

		return;

	}

	Array.prototype.forEach.call(items, function(btn){

		var selector = btn.getAttribute('data-show-block');

		btn.addEventListener(FH.cssAnimation('transition'),function(){

			if(btn.classList.contains('is-active')){

				btn.classList.add('hide');

			}

		});

		btn.addEventListener('click', function () {

			btn.classList.add('is-active');

			var list = document.querySelectorAll('.' + selector);

			Array.prototype.forEach.call(list, function(item){

				item.classList.remove('hide');

			});

		});

	});

})(document.querySelectorAll('.btn-show-block'));