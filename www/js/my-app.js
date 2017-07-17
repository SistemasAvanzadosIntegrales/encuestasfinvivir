// Initialize your app
var myApp = new Framework7({

});

// Export selectors engine
//var $$ = Dom7;

// Add view
//var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    //dynamicNavbar: true,
    //swipeBackPage: false,
    //notificationMedia: '',
    //modalStack: false,

function _mensaje(titulo,texto,btnLabel,callback){
                myApp.modal({
                    title: titulo,
                    text: texto,
                    buttons: [
                      {
                        text: btnLabel,
                        onClick: function(){
                            if(callback!==undefined){
                                callback();
                            }//if
                        }//function
                      }
                    ]
                  })
}