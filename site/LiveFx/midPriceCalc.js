define(function() {

    return {
        getMidPrice:function(data){
            return (data.bestBid + data.bestAsk)/2;
        }

    };
});
