$(document).ready(function(){

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

	const add = $(".add");

	add.each(function(ind, val){
		$(val).click(function(){
			const val = $(this).hasClass("add699")?699:799;
			const curVal = Number($(this).closest("td").next().find(".total").html());
			$(this).closest("td").next().find(".total").html((curVal + val).toFixed(2));
			updateTotal.call(this);
		});
	});


	const minus = $(".minus");
	minus.each(function(ind, val){
		$(val).click(function(){
			const val = $(this).hasClass("minus699")?699:799;
			const curVal = Number($(this).closest("td").next().find(".total").html());
			if(curVal>0){
				$(this).closest("td").next().find(".total").html((curVal - val).toFixed(2));
			}
			updateTotal.call(this);
		});
	});


	function updateTotal(){
		const val1 = Number($(this).closest(".info").find(".total").first().html());
		const val2 = Number($(this).closest(".info").find(".total").eq(1).html());
		$(this).closest(".info").find(".finaltotal").html((val1 + val2).toFixed(2));
	}

});