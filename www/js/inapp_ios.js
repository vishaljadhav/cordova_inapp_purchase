
var IAP = {
    list: ["uk.co.pocketapp.askfriends.50_Coins", "uk.co.pocketapp.askfriends.100_Coins"]
};


IAP.load = function () {
    // Check availability of the storekit plugin
    if (!window.storekit) {
        console.log("In-App Purchases not available");
        return;
    }

    // Initialize
    storekit.init({
        debug: true, // Enable IAP messages on the console
        ready: IAP.onReady,
        purchase: IAP.onPurchase,
        restore: IAP.onRestore,
        error: IAP.onError
    });
};

IAP.onReady = function () {
    // Once setup is done, load all product data.
    storekit.load(IAP.list, function (products, invalidIds) {
        IAP.products = products;


        IAP.loaded = true;
        renderIAPs(document.getElementById('purchase'));

        for (var i = 0; i < invalidIds.length; ++i) {
            console.log("Error: could not load " + invalidIds[i]);
        }
    });
};

var renderIAPs = function (el) {

    if (IAP.loaded) {
        var html = "";
        for (var id in IAP.products) {
            var prod = IAP.products[id];
            html += '<div class="buy-area"><div class="dis-in p-wth-55"><img src="images/buy.png" title="buy" alt="buy" class="buy-img1"> <img src="images/buy-multi.png" class="spsl buy-img2" title="buy-multi" alt="buy-multi"> <span class="size1 spsl2">' + parseInt(prod.productId.split(".").pop()) +  '</span></div><div class="dis-in p-wth-28 size2">' + prod.price + '</div><!-- <div class="dis-in p-wth-15 buy-txt">buy</div> --><button onclick="IAP.buy(\'' + prod.id + '\')" class="dis-in btn buy-txt">buy</button></div>';
        }
        el.innerHTML = html;
    }
    else {
        el.innerHTML = "In-App Purchases not available.";
    }
};


IAP.onPurchase = function (transactionId, productId, receipt) {
    var coins = '';

    if (productId) {
        coins = parseInt(productId.split(".").pop());
    }

    $.ajax({
        type: "POST",
        url: "http://54.75.244.96/askfriends/home/update_credit",
        data: {
            user_id: ls.getItem('user_id'),
            coins_purchased: coins,
            "X-Key": "44d5e89148104777aec2231ef6f1c327"
        },
        success: function (result) {
            console.log(result)
            ls.setItem('credits', parseInt(ls.getItem('credits')) + coins);
            app.displayAlert('Congratulations, you now own ' + coins + ' coins');

        }
    });

};

IAP.onError = function (errorCode, errorMessage) {
    app.displayAlert('Error: ' + errorMessage);
};

IAP.buy = function (productId) {
    app.checkConnection();
    storekit.purchase(productId);
};


IAP.onRestore = function (transactionId, productId, transactionReceipt) {
    // restore purchases

};
IAP.restore = function () {
    storekit.restore();
};