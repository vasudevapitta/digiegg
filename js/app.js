'use strict';

let coins = {
  bitcoin: {
    id: 1,
  },
  ethereum: {
    id: 1027,
  },
  ethereumClassic: {
    id: 1321,
   },
  bitcoinCash: {
    id: 1831,
  },
};


$.ajax({
  url: `https://cors-anywhere.herokuapp.com/api.coinmarketcap.com/v2/ticker/?limit=13&sort=coins`,
  crossDomain: true,
  Accept: 'application/json',
  'Accept-Encoding': 'deflate, gzip',
   headers: {'Access-Control-Allow-Origin' : "*"}

}).done(function(response){
  $(response.data).each(function(ind, item, arr){
   	coins.bitcoin.price = item[coins.bitcoin.id].quotes.USD.price;
    coins.ethereum.price = item[coins.ethereum.id].quotes.USD.price;
    coins.ethereumClassic.price = item[coins.ethereumClassic.id].quotes.USD.price;
    coins.bitcoinCash.price = item[coins.bitcoinCash.id].quotes.USD.price;

    init(coins.bitcoin.price, coins.ethereum.price, coins.ethereumClassic.price, coins.bitcoinCash.price);
  });
})
.fail(function(){
  console.log('There was an error');
});

function init(btc, eth, ethC, btcC){

		let fixedNum = 4;

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
			click: function(){
				updateVal.call(this);
			},

			keypress: function(e){
				if(e.keyCode===13){
					updateVal.call(this);
				}
			},

			focusout: function(){
				updateVal.call(this);
			}
		});

		function updateVal(){
			const obj = this;
			const inputVal = $(obj).val();
			const total = $(obj).parent().siblings('td').last().children('.total');
			const category = $(obj).parents('table').find('.category').val();
			const num = $(obj).parent().siblings('.price').html();
			convertToCoin.apply(this, [obj, inputVal, total, category, num]);
			updateFinalVal.call(this);
		}

		function convertToCoin(obj, inputVal, total, category, num){
			
			if(category==='usd'){
				total.html(inputVal*num);
				fixedNum = 2;
			}

			else if(category==='btc'){
				const convertedCoinPrice = ((inputVal*num)/btc).toFixed(4);
				total.html(convertedCoinPrice);
				fixedNum = 4;
			}

			else if(category==='bch'){
				const convertedCoinPrice = ((inputVal*num)/btcC).toFixed(4);
				total.html(convertedCoinPrice);
				fixedNum = 4;
			}

			else if(category==='eth'){
				const convertedCoinPrice = ((inputVal*num)/eth).toFixed(4);
				total.html(convertedCoinPrice);
				fixedNum = 4;
			}

			else if(category==='etc'){
				const convertedCoinPrice = ((inputVal*num)/ethC).toFixed(4);
				total.html(convertedCoinPrice);
				fixedNum = 4;
			}

		}

			$('select').on('change', function(){
				const input = $(this).parents('tr').siblings('tr').find(':input[type="number"]').eq(0);
				updateVal.call(input);
				const input1 = $(this).parents('tr').siblings('tr').find(':input[type="number"]').eq(1);
				updateVal.call(input1);
			});

		function updateFinalVal(){
			const obj = $(this);
			const objLookUp = obj.closest('table').find('.total');
			const total1 = Number(objLookUp.eq(0).html());
			const total2 = Number(objLookUp.eq(1).html());
			const finalTotal = obj.closest('table').find('.finaltotal');
			finalTotal.html((total1+total2).toFixed(fixedNum));
		}

}