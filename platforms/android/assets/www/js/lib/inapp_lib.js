
/* 

    Inapp Pruchase Library for iOS & Android
    
    Prepare By      : Vishal Jadhav
    Version         : V 0.0.1
    
    
    1)  init()
        this function 
    
    
    
*/


var inapp_lib = {
	init : function (){ 
		if (cordova.platformId == 'ios') {
			IAP.load();
			
			$(document).on('click', 'buyprodct', function (e) {
				IAP.buy($(this).data('productid'))
			});
		}else if (cordova.platformId == 'android') {
			IAP_Android.init();
			
			$(document).on('click', 'buyprodct', function () {
				
			});
		}
	}
	
	
}