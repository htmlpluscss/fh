SC.tabs = function(elems){

	Array.prototype.forEach.call(elems, function(tab){

		var btn = tab.querySelectorAll('.tabs__btn'),
			item = tab.querySelectorAll('.tabs__item'),
			nav = document.createElement('div');

		Array.prototype.forEach.call(btn, function(el,index){

			nav.appendChild(el);

			el.addEventListener('click',function(){

				Array.prototype.forEach.call(btn, function(e,i){

					if(i == index) {

						e.classList.add('tabs__btn--active');
						item[i].classList.remove('visuallyhidden');

					}
					else{

						e.classList.remove('tabs__btn--active');
						item[i].classList.add('visuallyhidden');

					}

				});

			});

		});

		nav.classList.add('tabs__nav');

		tab.insertBefore(nav, item[0]);

	});

};


if(document.querySelectorAll('.tabs').length) {

	SC.tabs(document.querySelectorAll('.tabs'));

}