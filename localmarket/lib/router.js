var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  feedSubscription = Meteor.subscribe('feed');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});





if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('latestActivity', function () {
      dataReadyHold.release();
    });
  }
});

FeedController = RouteController.extend({
  onBeforeAction: function () {
    this.feedSubscription = feedSubscription;
  }
});

RecipesController = RouteController.extend({
  data: function () {
    return _.values(RecipesData);
  }
});

BookmarksController = RouteController.extend({
  onBeforeAction: function () {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else
      Overlay.open('authOverlay');
  },
  data: function () {
    if (Meteor.user())
      return _.values(_.pick(RecipesData, Meteor.user().bookmarkedRecipeNames));
  }
});

RecipeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('recipe', this.params.name);
  },
  data: function () {
    return RecipesData[this.params.name];
  }
});

AdminController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('news');
  }
});


//Access control
var OnBeforeActions;
OnBeforeActions = {
    loginRequired: function(pause) {
        var userRole = 'user';
      if (userRole != 'admin') {
        console.log('not authorised');
        this.redirect('/feed');
        return pause();
      } 
    }
};

Router.route('home', {
  path: '/'
});

Router.route('feed');

Router.route('recipes', {
    before: OnBeforeActions.loginRequired
 });

Router.route('bookmarks', {
    
    before: OnBeforeActions.loginRequired
});

Router.route('about');

Router.route('recipe', {
  path: '/recipes/:name'
});

Router.route('admin', {
  layoutTemplate: null
});

Router.onBeforeAction('dataNotFound', {
  only: 'recipe'
});
