
(function(items){

	if(!items.length) {

		return;

	}

	Array.prototype.forEach.call(items, function(el){

		var btn = el.querySelector('.more-slide__btn'),
			box = el.querySelector('.more-slide__box'),
			inner = el.querySelector('.more-slide__inner');

		btn.addEventListener('click', function () {

			box.classList.toggle('is-open');

		});

		box.addEventListener(SC.cssAnimation('transition'),function(){

			btn.classList.toggle('is-open', box.classList.contains('is-open'));

		});

	});

})(document.querySelectorAll('.more-slide'));