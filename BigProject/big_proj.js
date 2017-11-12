// JavaScript File

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw_big_proj.js')
             .then(function() { console.log('Service Worker Registered'); });
  }