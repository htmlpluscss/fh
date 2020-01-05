(function(calculator){

	if(!calculator) {

		return;

	}

	var slider = calculator.querySelector('.calculator__slider'),
		textValue = calculator.querySelector('.js-calculator-value'),
		value = CALCULATOR_PARAM.value;

	noUiSlider.create(slider, {
		start: CALCULATOR_PARAM.value,
		connect: [true, false],
		range: {
			'min': CALCULATOR_PARAM.min,
			'max': CALCULATOR_PARAM.max
		},
		step: CALCULATOR_PARAM.step
	});

	slider.noUiSlider.on('slide', function(e){

		value = parseInt(e[0], 10);
		textValue.textContent = sepNumber(value);

	});

	// отделяем тысячи
	function sepNumber(str){
		str = parseInt(str, 10).toString();
		return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}

})(document.querySelector('.calculator'));