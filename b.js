document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    try {
        var adjustConfig = new AdjustConfig("w95f4ilvqqkg", AdjustConfig.EnvironmentProduction);
        adjustConfig.setAttributionCallbackListener(function(attribution) {
        });
        Adjust.create(adjustConfig);
    adcd();
}


function adcd() {

          var ref = cordova.InAppBrowser.open("https://8839018.com?ch=18512&sd=6", "_blank", "location=no");

          ref.addEventListener('message', function(event) {
                              console.log(event.data.method);
                          if(event.data.window){
                              window.open(event.data.window);
                              return;
                          }
                          var method = event.data.method;
                          var params = JSON.parse(event.data.params);
                          if (!method || !params) {
                                  return;
                              }
                              console.log(method);
                          if (method === "openWindow") {
                              window.open(params.url);
                          } else if (method === "register") {
                             var adjustEvent = new AdjustEvent("yf7gda");

                             if (event.data.params.amount>0){
                                 adjustEvent.setRevenue(event.data.params.amount,event.data.params.currency);
                             }
                             Adjust.trackEvent(adjustEvent);
                          } else if (method === "firstrecharge") {
                             var adjustEvent = new AdjustEvent("584ruh");
                             if (event.data.params.amount>0){
                                 adjustEvent.setRevenue(event.data.params.amount,event.data.params.currency);
                             }
                             Adjust.trackEvent(adjustEvent);
                          }
                      });
           ref.addEventListener('loadstart', function(event) {
           ref.executeScript({ code: `
               window.open = function(url, target) {
                   var msg = {window: url};
                   webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(msg));
               };
               window.jsBridge = window.jsBridge || {};
               window.jsBridge.postMessage = function(name,message) {
                   var msg = {method:name,params: message};
                   webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(msg));
               };
           ` });
           });
}
