
function getContextualAddOn(event) {
  
  var threads = [];
  var startIndex = 0;
  var MAX_RETURNED = 200;
  var ENTRIES_PER_OUTPUT = 150;
  
  var totalMessages = 0;
  var allAddresses = [];
  var query = '-from:*@fiu.edu -"Florida International University"'
  
  Logger.log('for query: ' + query)
  
  do {
    threads = GmailApp.search(query, startIndex, MAX_RETURNED);
    Logger.log('Found ' + threads.length + ' more results.');
    startIndex += MAX_RETURNED;
    
    for(var i = 0; i < threads.length; i++) {
      totalMessages++;
      if (threads[i].getMessageCount() == 1) { //if never responded to      
        var curAddress = threads[i].getMessages()[0].getFrom();
        var alreadySaved = allAddresses.some(function(x) {return (x.includes(curAddress));})
        //Logger.log(totalMessages +': '+curAddress); Logger.log('----- ' + alreadySaved);
        if(!alreadySaved) {
          allAddresses.push(curAddress);
        }
      }
    }
  } while (threads.length != 0);
  
  Logger.log('Total processed: '+ totalMessages);
  Logger.log('Total unique: (' + allAddresses.length + ') ');
  
  for(var i = 0; i < allAddresses.length; i += ENTRIES_PER_OUTPUT) {
      Logger.log(allAddresses.slice(i, i + ENTRIES_PER_OUTPUT));
  }
}

