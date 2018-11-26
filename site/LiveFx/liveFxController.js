define(['./tracker', './fxTable'],function(tracker, table) {

     var currentTime = new Date().getTime();
     return {
         refresh:function(data){
             /*
                Approach is to first create a blank table for each unique currency pair
             *  and then when we receive update for currency we popoulate the table with correct
             *  sorted data, this avoids the heavy createElement calls on every update and we get a fast updating UI             *
             *
             *  For updating the Sparklines instead of using JS's timeout and getting into all sort of
              *  con-currency issue when updating the HTML table
              *  we are tracking the time in the controller and if 30 secs have elapsed then we first update hte sparklines
              *  and then sort the table
              *
              *
             */


                if(tracker.tryAdd(data)){
                    table.addRow();
                }
                var sortedData = tracker.getSortedFxRates(),
                    secondsPassed = (new Date().getTime() - currentTime)/1000;

                if(secondsPassed >= 30){
                    table.updateSparklines(sortedData);
                    currentTime = new Date().getTime();
                }

                table.updateTable(sortedData);
         }
    };
});