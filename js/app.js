'use strict';

/*=====SIDE NAVIGATION BAR FOR MOBILE/IPAD & NARROW VIEWPORTS ON DESKTOP=====*/

const hamBtn = $(".fa-bars");
const sideNav = $(".side-nav");
const overlay = $(".overlay");

hamBtn.click(function(){
	sideNav.toggleClass("slide");
	sideNav.focus();
	overlay.show();
});

overlay.click(function(){
	sideNav.toggleClass("slide");
	$(this).hide();
});

/*=================SET PRICES HERE=====================*/

const pwrclr1yr = 8999;
const pwrclr2yr = 9999;

const ggbyt1yr = 4889;
const ggbyt2yr = 5589;

const msi1yr = 4889;
const msi2yr = 5589;

const xfx1yr = 4889;
const xfx2yr = 5589;

const pwrclr1price = $('#pwr1price');
const pwrclr2price = $('#pwr2price');

const ggbyt1price = $('#ggbyt1price');
const ggbyt2price = $('#ggbyt2price');

const msi1price = $('#msi1price');
const msi2price = $('#msi2price');

const xfx1price = $('#xfx1price');
const xfx2price = $('#xfx2price');

const domPriceElems = [pwrclr1price, pwrclr2price, ggbyt1price, ggbyt2price, msi1price, msi2price, xfx1price, xfx2price];
const setPrices = [pwrclr1yr, pwrclr2yr, ggbyt1yr, ggbyt2yr, msi1yr, msi2yr, xfx1yr, xfx2yr];

//appending prices to the DOM
$(domPriceElems).each(function(ind, arrVal){
	$(arrVal).html(setPrices[ind]);
});

//for all input number elements
$(':input[type="number"]').on({
	'click, focusout': function(){
		updateVal.call(this);
	},

	keypress: function(e){
		if(e.keyCode===13){
			updateVal.call(this);
		}
	},
});

function updateVal(){
	const obj = $(this);
	const inputVal = obj.val();
	const num = obj.parent().siblings('.price').html();
	const total = obj.parent().siblings('td').last().children('.total');
	total.html(inputVal*num);
	updateFinalVal.call(this);
}

function updateFinalVal(){
	const obj = $(this);
	const objLookUp = obj.closest('table').find('.total');
	const total1 = parseInt(objLookUp.eq(0).html());
	const total2 = parseInt(objLookUp.eq(1).html());
	const finalTotal = obj.closest('table').find('.finaltotal');
	finalTotal.html(total1+total2);
}