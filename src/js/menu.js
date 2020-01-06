(()=>{

	"use strict";

	document.addEventListener('click', (e) => {

		if(e.target.closest('.btn-menu-toggle') || e.target.classList.contains('menu-show')){

			if(FH.OpenMenu) {

				document.body.classList.remove('menu-show');

				window.scrollTo(0,FH.windowScrollOld);

				FH.OpenMenu = false;

			}
			else {

				FH.OpenMenu = true;

				// записываем значение скролла страницы
				FH.windowScrollOld = window.pageYOffset;
				window.scrollTo(0,0);

				document.body.classList.add('menu-show');

			}

		}

	});

})();