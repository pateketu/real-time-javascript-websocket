define(function() {
    var tableElement = document.getElementById('liveFxRates'),
        sparklineCol = 'sparkline',
        generateTdId = function(column, rowCount){
            return 'td_' + column + '_' +  rowCount;
        },
        columns = {
            name:'name',
            bestBid:'bestBid',
            bestAsk:'bestAsk',
            lastChangeBid:'lastChangeBid',
            lastChangeAsk:'lastChangeAsk'
        };

    return {
        addRow: function () {
            /*
             we create an empty row here and TD gets assigned a unique ID
             which we will later use to quickly update the text of the cell
             with correct sorted data
            */
            var tr = document.createElement('tr'),
                rowCount = tableElement.getElementsByTagName('tr').length - 1;
            for(column in columns){
                var td = document.createElement('td');
                td.id = generateTdId(column,rowCount);

                if(column === columns.name){
                    td.className = 'allCaps'; //just to make name appear nicely!
                }
                tr.appendChild(td);
            }
            var td = document.createElement('td'),
                span = document.createElement('span');
            td.id=generateTdId(sparklineCol, rowCount);
            td.appendChild(span);
            tr.appendChild(td);
            tableElement.appendChild(tr);
        },
        updateTable:function (currencyData) {
            for(var i=0;i<currencyData.length;i++){
                for(column in columns){
                    var tdId = generateTdId(column,i);
                    //This is where we using our TdId!
                    document.getElementById(tdId).innerText = currencyData[i][column];
                }
                var sparklineId=generateTdId(sparklineCol, i),
                    span = document.getElementById(sparklineId).children[0];

                //Re-drawing the line using the data from last 30 secs
                Sparkline.draw(span, currencyData[i].delayedMidPrice);
            }
        },
        updateSparklines:function(currencyData){
            for(var i=0;i<currencyData.length;i++){
                var id=generateTdId(sparklineCol, i),
                    span = document.getElementById(id).children[0];

                //We keep the mid-price from last 30secs in a new property
                // so that we can use that to re-render the chart when table gets sorted
                //because table gets sorted very frequently almost ones every sec
                currencyData[i].delayedMidPrice = currencyData[i].midPrice;
                currencyData[i].midPrice = [];
                Sparkline.draw(span, currencyData[i].delayedMidPrice);


            }
        }
    };
});
