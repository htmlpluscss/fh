
	document.addEventListener('click', function (e) {

		if(e.target.closest('.btn-menu-toggle') || e.target.classList.contains('menu-show')){

			if(SC.OpenMenu) {

				document.body.classList.remove('menu-show');

				window.scrollTo(0,SC.windowScrollOld);

				SC.OpenMenu = false;

			}
			else {

				SC.OpenMenu = true;

				// записываем значение скролла страницы
				SC.windowScrollOld = window.pageYOffset;
				window.scrollTo(0,0);

				document.body.classList.add('menu-show');

			}

		}

	});