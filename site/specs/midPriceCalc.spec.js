/*Running into problems with npm test runner*/
var target = require('./site/LiveFx/midPriceCalc');
describe('midPriceCalc', function() {

    it('getMidPrice, calculates expected mid price', function() {
        //Assemble
        var data = {
            name: 'usdjpy',
            bestBid: 106,
            bestAsk: 107,
            openBid: 107.22827132623534,
            openAsk: 109.78172867376465,
            lastChangeAsk: -4.862314256927661,
            lastChangeBid: -2.8769211401569663
        },
            expected = 106.5;

        //Act
        var result = target.getMidPrice(data);

        //Assert
        expect(result).toBe(expected);
    });
});
