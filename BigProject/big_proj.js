// JavaScript File

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw_big_proj.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  
  
  
  
  //mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
  
  
  var currentEvent = {};
  
  
  var db2 = new Dexie('allEvents');

	// Define a schema
	db2.version(1).stores({
		events: 'id, title, address, url'
	});
	
	function saveFunction2(additem){
    //currentEvent = saveitem;
    //console.log("made it");
    //console.log(saveitem);
    db2.events.add({
      id: additem.id,
      title: additem.title,
      address: additem.venue_address,
      url: additem.url
    });
	}	
	
	
  var db = new Dexie('savedEvents');

	// Define a schema
	db.version(1).stores({
		events: 'id, title, address, url'
	});


	// Open the database
	db.open().catch(function(error) {
		alert('error : ' + error);
	});
	

	function saveFunction(saveid){

    var saveitem; 

    db2.events.get({id: saveid}, function (item) {

      saveitem={
        "id": item.id,
        "title": item.title,
        "address": item.address,
        "url": item.url
      };



      db.events.add({
        id: saveitem.id,
        title: saveitem.title,
        address: saveitem.address,
        url: saveitem.url
      });

      
    });
    

	}