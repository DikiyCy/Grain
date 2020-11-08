'use strict';

// подключили библиотеки
@@include('./jquery.js');
@@include('./owl.carousel.min.js');

// подключили хранилища
@@include('./storageEng.js');
@@include('./storageRus.js');
@@include('./storageCode.js');

// DOM elements
const body = document.getElementsByClassName('body')[0];
const butter = document.getElementsByClassName('butter')[0];
const popup = document.getElementsByClassName('popup')[0];
const navMobLinks = document.querySelectorAll('.nav__mob-link a');
const form = document.querySelectorAll('form');

const changeLang = document.querySelectorAll('.header__select');
const bsText = document.querySelectorAll('.main__text');

// для счетчика корзины
const btnBasket = document.getElementsByClassName('btn_header__number')[0];
const btnMain = document.querySelectorAll('.btn_main');
const btnCatalog = document.querySelectorAll('.btn_catalog');

// проверка кода
const inputCode = document.getElementsByClassName('form_identity__input')[0];
const wrappDone = document.getElementsByClassName('form_identity__wrapp')[0];
const wrappError = document.getElementsByClassName('form_identity__wrapp')[1];


$(document).ready(function(){

	// логика "бутера"
	butter.addEventListener('click', () => {
		butter.classList.toggle('active');
		popup.classList.toggle('hidden');
		body.classList.toggle('no-overflow');
	});

	// логика при клике на побильный навбар
	navMobLinks.forEach(item => {
		item.addEventListener('click', () => {
			butter.classList.toggle('active');
			popup.classList.toggle('hidden');
			body.classList.toggle('no-overflow');
		})
	});

	// переключение языков
	changeLang.forEach(item => {

		item.addEventListener('change', (e) => {

			const langFlag = e.target.value;

			// смена языка у текста
			document.querySelectorAll('[data-lang]').forEach( elem => {
				const elemLangAttr = elem.getAttribute('data-lang');
				const trans = langFlag === 'rus' ? rus[elemLangAttr] : eng[elemLangAttr];
				elem.innerHTML = trans;
			});

			// смена языка у фонового текста
			bsText.forEach(elem => {
				elem.classList.toggle('hidden');
			});

			// смена языка у placeholder
			document.querySelectorAll('[placeholder]').forEach( elem => {
				const elemLangAttr = elem.getAttribute('placeholder');
				const trans = langFlag === 'rus' ? rus[elemLangAttr] : eng[elemLangAttr];
				elem.setAttribute('placeholder', trans);
			});

		})
	})


	// увеличение счетчика в корзине
	let countInBasket = localStorage.getItem('countInBasket') || 0;
	const numberInc = (btn) => {
		btn.forEach(item => {
			item.addEventListener('click', () => {
				countInBasket = +btnBasket.textContent + 1;
				console.log(countInBasket);
				localStorage.setItem('countInBasket', countInBasket);
				btnBasket.innerHTML = countInBasket;
			});
		})
	}
	numberInc(btnMain);
	numberInc(btnCatalog);


	// логика формы
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			// форма с проверкой кода
			if (e.target.className === 'form form_identity') {

				const enterCode = inputCode.value;
				console.log(enterCode);
				const flagCode = code.filter(item => item === enterCode);
				console.log(flagCode);

				if( flagCode.length !== 0) {
					wrappDone.classList.add('checked');
					wrappError.classList.remove('checked');
				} else {
					wrappError.classList.add('checked');
					wrappDone.classList.remove('checked');
				}

			}

		})
	});

	// - страницу с карзиной

  // логика карусели
	$(".owl-carousel").owlCarousel({
		loop:true,
		items: 1,
		nav: true,
		onInitialized  : counter, //When the plugin has initialized.
		onTranslated : counter //When the translation of the stage has finished.
	});

	// логика счетчика слайдера
	function counter(event) {
		let item      = event.item.index - 1;     // Position of the current item
		let items     = event.item.count;     // Number of items

		// при пролистывании влево и доходим до "3"
		if(item > items) {
			item = 1;
		}

		$('.catalog__counter').html(item+"/"+items)
	}


});
