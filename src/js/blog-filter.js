
(function(items){

	if(!items.length) {

		return;

	}

	Array.prototype.forEach.call(items, function(el){

		var btn = el.querySelector('.blog-filter__toggle-btn');

		btn.addEventListener('click', function () {

			el.classList.toggle('is-open');

		});

	});

})(document.querySelectorAll('.blog-filter__toggle'));