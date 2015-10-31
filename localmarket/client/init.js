Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  Geolocation.currentLocation();
});


Meteor.customUsers = function() {
    
    var users = {
        
        admin: {
            
            name: 'admin',
            pw: 'adminPassword'
            
        },
        
       customer: {
           name: 'customer',
           pw: 'customerPassword'
       }
        
    
        
    }
}