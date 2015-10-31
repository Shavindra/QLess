Template.admin.helpers({
  isAdmin: function() {
    return Meteor.user() && Meteor.user().admin;
  },
  
  latestNews: function() {
    return News.latest();
  }
});

Template.admin.events({
  'submit form': function(event) {
    event.preventDefault();

    var username = $(event.target).find('[type=text]').val();
    var password = $(event.target).find('[type=password]').val();

      console.log(username, password);
      
      var currentUser,
          adminUser = Meteor.customUsers().admin,
          customer = Meteor.customUsers().customer;
      
      localStorage.clear();
      currentUser = username == adminUser.name ? adminUser : customer;
      
      Meteor.customSession().setSession(currentUser);
      
      currentUser.role == 'admin' ? Router.go('recipes') : Router.go('feed');

      
      // alert('Saved latest news');
  },
  
  'click .login': function() {
     // console.log('click login');
      
   // Meteor.loginWithTwitter();
  }
    
})

