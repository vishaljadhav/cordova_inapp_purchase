var IAP_Android = {
    products: ["uk.co.pocketapp.askfriends.50coins", "uk.co.pocketapp.askfriends.100coins"],
    init: function () {
        inappbilling.init(function (data) {
            IAP_Android.getProducts();
        }, function (error) {
            console.log(error)
        }, '', IAP_Android.products);
    },
    getProducts: function () {
        inappbilling.getProductDetails(function (data) {
            IAP_Android.renderProducts(data)
        }, '', IAP_Android.products);
   },
    renderProducts: function (data) {
        var html = "In-App Purchases not available.";

        if (data.length > 0) {
            html = '';

            for (var i = 0; i < data.length; i++) {
                var prod = data[i];
                html += '<div class="buy-area"><div class="dis-in p-wth-55"><img src="images/buy.png" title="buy" alt="buy" class="buy-img1"> <img src="images/buy-multi.png" class="spsl buy-img2" title="buy-multi" alt="buy-multi"> <span class="size1 spsl2">' + parseInt(prod.productId.split(".").pop()) +  '</span></div><div class="dis-in p-wth-28 size2">' + prod.price + '</div><!-- <div class="dis-in p-wth-15 buy-txt">buy</div> --><button onclick="IAP_Android.buyProduct(\'' + prod.productId + '\')" class="dis-in btn buy-txt">buy</button></div>';
            }
        }

        $('#purchase').html(html);
    },
    buyProduct: function (id) {
        inappbilling.buy(function (data) {
            alert('success');
            console.log(data)
            var coins = '';

            if (id) {
                coins = parseInt(id.split(".").pop());
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
        }, function (error) {
        }, id)
    }

};