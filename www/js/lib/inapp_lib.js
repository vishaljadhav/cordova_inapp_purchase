
/* 

    Inapp Pruchase Library for iOS & Android
    
    Prepare By      : Vishal Jadhav
    Version         : V 0.0.1
    
    
    1)  init()
        this function 
    
    
    
*/


var inapp_lib = {

    productsObject : '#products',


	init : function (){

        inapp_lib.getProducts();

		if (cordova.platformId == 'ios') {
			IAP.load();
			
			$(document).on('click', '.btn-buy', function (e) {
				IAP.buy($(this).data('productid'))
			});
		}else if (cordova.platformId == 'android') {
			IAP_Android.init();

			$(document).on('click', '.btn-buy', function () {
                IAP_Android.buy($(this).data('productid'))
			});
		}
	},

    getProducts : function () {
        $.getJSON('inapp_products.json', function (data) {
            var html = '';
            $.each(data, function(key, val){
                html += '<div class="row">' +
                '<div class="col-xs-9">' +
                '<h4>PRODUCT NAME</h4>' +
                '<p>Price of Product</p>' +
                '</div>' +
                '<div class="col-xs-3">' +
                '<h4><button class="btn btn-primary btn-block btn-buy" data-productid="">BUY</button></h4>' +
                '</div>' +
                '</div>';
            });
            $(productsObject).html(html);
        });
    }
	
	
}