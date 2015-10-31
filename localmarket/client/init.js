Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  Geolocation.currentLocation();
});


Meteor.customUsers = function() {
    
    var users = {
        
        admin: {
            
            name: 'admin',
            role: 'admin',
            pw: 'adminPassword'
            
        },
        
       customer: {
           name: 'customer',
           role: 'customer',
           pw: 'customerPassword'
       }
    
    }
    
    return users;
}

Meteor.customSession = function() {
    
    function setSession(currentUserInfo) {
        
        currentUser = JSON.stringify(currentUserInfo);
        
        localStorage.setItem('customUser', currentUser);
    }
    
    function getSession() {
        
        var currentUser = localStorage.getItem('customUser');
        
        return JSON.parse(currentUser);
    }
    
    return {
        setSession: setSession,
        getSession: getSession
    }
    
}