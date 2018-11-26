define(['./midPriceCalc'],function(midPriceCalc) {
    var currencyTracker = {},
        currencyData = [];

    String.prototype.splice = function(idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    return {
        tryAdd: function (data) {
            data.name = data.name.splice(3, 0, '-');

            if(!currencyTracker[data.name]){
                currencyTracker[data.name] = {};
                currencyTracker[data.name].currentIndex = currencyData.length;
                data.midPrice = [];
                data.midPrice.push(midPriceCalc.getMidPrice(data));
                currencyData.push(data);
                return true;
            }else{
                var currency = currencyData[currencyTracker[data.name].currentIndex];
                //we just updating the existing currency data in the array with new information
                currency.bestBid = data.bestBid;
                currency.bestAsk = data.bestAsk;
                currency.lastChangeAsk = data.lastChangeAsk;
                currency.openAsk = data.openAsk;
                currency.openBid = data.openBid;
                currency.lastChangeBid = data.lastChangeBid;
                currency.midPrice.push(midPriceCalc.getMidPrice(data));
                return false;
            }
        },
        getSortedFxRates:function(){
            currencyData.sort(function (a, b) {
                  if(a.lastChangeBid < b.lastChangeBid){
                      return 1;
                  }
                  if(a.lastChangeBid > b.lastChangeBid) {
                    return -1;
                  }
                  return 0
            });
            for(var i=0;i<currencyData.length;i++){
                currencyTracker[currencyData[i].name].currentIndex = i;
            }
            return currencyData;
        }
    };
});
