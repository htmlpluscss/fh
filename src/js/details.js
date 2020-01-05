(function(items){

	if(!!window.MSInputMethodContext && !!document.documentMode) {

		return;

	}

	if(items.length){

		function closeAllOpen(e) {

			var target = e.target.closest('.details__btn');

			Array.prototype.forEach.call(items, function(el){

				if(el !== target){

					el.open = false;

				}

			});

		}

		window.addEventListener('touchstart', function(e) {

			closeAllOpen(e);

		});

		window.addEventListener('click', function(e) {

			closeAllOpen(e);

		});

		Array.prototype.forEach.call(items, function(details){

			var summary = details.querySelector('.details__marker');

			summary.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 17.3333C4.3975 17.3333.6667 13.6025.6667 9 .6667 4.3975 4.3975.6667 9 .6667c4.6025 0 8.3333 3.7308 8.3333 8.3333 0 4.6025-3.7308 8.3333-8.3333 8.3333zM8.1667 11.5v1.6667h1.6666V11.5H8.1667zm1.6666-1.3708a2.9186 2.9186 0 002.0457-3.2155A2.9185 2.9185 0 009 4.4167a2.9175 2.9175 0 00-2.8608 2.3441l1.635.3275A1.25 1.25 0 119 8.5833a.8333.8333 0 00-.8333.8334v1.25h1.6666v-.5375z"/></svg>';

			summary.addEventListener('mousemove', function() {

	//			details.open = true;

			});

			summary.addEventListener('mouseleave', function() {

	//			details.open = false;

			});

		});


		var observer = new MutationObserver(function (mutations) {

			mutations.forEach(function (mutation) {

				// Елемент у которого измелился атрибут
				var details = mutation.target;

				// Если елемент был закрыт — ничего не делаем
				if (!details.open) {
					return;
				}

				var text = details.querySelector('.details__text'),
					rect = text.getBoundingClientRect(),
					right = document.documentElement.clientWidth - rect.right,
					left = rect.left,
					width = (rect.left - rect.right) / 2; // отрицательная половина ширины

				console.log(right,left )

				if(right < 0){

					text.style.marginLeft = (width + right - 10) + 'px';

				}

				if(left < 0){

					text.style.marginLeft = (width - left + 10) + 'px';

				}

/*
				// Перебираем открытые елементы details
				items.forEach(function (el) {

					// Исключаем если закрыт
					if (!el.open) {
						return;
					}

					// Исключаем из перебора елемент который мы только что открыли
					if (el === details) {
						return;
					}

					// Закрываем все остальные елемент details
					el.open = false;

				});
*/
			});

		});

		// Наблюдаем за изменением только одного атрибута
		var config = {
			attributeFilter: ['open']
		};

		// Вешаем наблюдатель на все елементы details внутри акордиона
		items.forEach(function (el) {
			return observer.observe(el, config);
		});

	}

})(document.querySelectorAll('.details__btn'));