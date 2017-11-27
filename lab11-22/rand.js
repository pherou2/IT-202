var currentQuote = {};



var db = new Dexie('TalkingQOD');

	// Define a schema
	db.version(1).stores({
		quotes: 'id, category, author, quote'
	});


	// Open the database
	db.open().catch(function(error) {
		alert('Uh oh : ' + error);
	});




$("#btnSaveQuote").on("click", function() {
  
  db.quotes.add({
		id: currentQuote.id, 
		category: currentQuote.category, 
		author: currentQuote.author, 
		quote: currentQuote.quote
	});

});



$("body").on("click", ".savedQuote", function() {
  say( $(this).text() );
});



$("#getQOD").on("click", function() {
  $("#quote").text("");
  
  $.get("https://quotes.rest/qod.json?category=management ", function(response) {
    currentQuote = response.contents.quotes[0];
    
    $("#quote").append(currentQuote.quote );
  });
});

$("#btnSay").on("click", function() {
  say( $("#quote").text() );
});

$("#btnGetSavedQuotes").on("click", listSavedQuotes);


function listSavedQuotes () {
  console.log($("#quoteTemplate"));
  $("savedQuote").remove();
  db.quotes
		.each (function (quote) {
		  
		  var clone = $("#quoteTemplate").clone();
		  console.log(clone);
		  clone.text(quote.quote);
		  clone.attr("id", quote.id);
		  $("body").append(clone);
		  
		  
		  //$("#savedQuotes").append(quote.quote);
		});

  
}





function say (strText) {
  var msg = new SpeechSynthesisUtterance(strText);
  window.speechSynthesis.speak(msg);
}