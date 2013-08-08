var ipDesignThemeMarket = new function () {

    var isIframeCreated = false;

    var processOrder = function (order) {
        console.log('processOrder');
        $('body').bind('ipMarketOrderStart', function (e) {
            console.log('order start');
        });

        console.log('bind complete event');
        $('body').bind('ipMarketOrderComplete', function (e, data) {
            console.log('order complete ');
            console.log(data);
            if (typeof(data.themes) != "undefined" && data.themes.length) {
                //TODOX
                console.log('show local themes');
            }
        });

        Market.processOrder(order);
    };

    var navigateBackToMyTheme = function() {
        ipDesignThemeMarket.closeMarketWindow();
    };

    this.openMarketWindow = function () {
        $('#ipsThemeMarketContainer').show();

        if (isIframeCreated) {
            return;
        }

        var remote = new easyXDM.Rpc({
                remote: $('#ipsThemeMarketContainer').data('marketurl'),
                container: "ipsThemeMarketContainer",
                onMessage: function (message, origin) {
                    //DO NOTHING
                },
                onReady: function () {
                    //DO NOTHING
                }
            },
            {
                remote: {
                },
                local: {
                    downloadImages: function (images) {
                        //do nothing. Leaving for compatibility with ImpressPages 3.4 and 3.5
                    },

                    handle: function (action, data) {
                        console.log('handle(' + action + ')');
                        switch (action) {
                            case 'processOrder':
                                processOrder(data);
                                break;
                            case 'navigateBackToMyTheme':
                                navigateBackToMyTheme();
                                break;
                        }
                    }
                }
            }
        );

        isIframeCreated = true;
    };

    this.closeMarketWindow = function (e) {
        if (e != null) {
            e.preventDefault();
        }

        $('#ipsThemeMarketContainer').hide();
    };
};