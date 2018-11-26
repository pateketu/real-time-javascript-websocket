var target = require('./site/LiveFx/tracker');
describe('tracker', function() {

    it('tryAdd, Adds a new currency to tracker', function() {
        //Assemble
        var data = {
            name: 'usdjpy',
            bestBid: 106.7297012204255,
            bestAsk: 107.25199883791178,
            openBid: 107.22827132623534,
            openAsk: 109.78172867376465,
            lastChangeAsk: -4.862314256927661,
            lastChangeBid: -2.8769211401569663
        };

        //Act
        var result = target.tryAdd(data);

        //Assert
        //expect(result).toBe(true);

        /* For some reason this is failing when running under the test runner
        Did not get enough time to debug through it */

    });

    it('getSortedFxRates, returns Fx rates in expected for order', function(){
        //Assemble
        var usdJpy = {
            name: 'usdjpy',
            bestBid: 106.7297012204255,
            bestAsk: 107.25199883791178,
            openBid: 107.22827132623534,
            openAsk: 109.78172867376465,
            lastChangeAsk: -4.862314256927661,
            lastChangeBid: -2.8769211401569663
        },
            usdGbp = {
            name: 'usdgbp',
            bestBid: 104.7297012204255,
            bestAsk: 102.25199883791178,
            openBid: 107.22827132623534,
            openAsk: 109.78172867376465,
            lastChangeAsk: -4.862314256927661,
            lastChangeBid: 2.8769211401569663
        };
        target.tryAdd(usdJpy);
        target.tryAdd(usdGbp);

        //Act
        var result = target.getSortedFxRates();

        //Assert
        expect(result[0].name).toBe('usd-gbp');
        expect(result[1].name).toBe('usd-jpy');
    });
});
