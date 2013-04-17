App = Ember.Application.create();

App.Router.map(function() {
  this.resource('user', {path: '/users/:user_id'});
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return users[params.user_id];
  }
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return users;
  }
});

var users = [
  {
    id: 1,
    first: 'Ryan',
    last: 'Florence',
    avatar: 'https://si0.twimg.com/profile_images/3123276865/5c069e64eb7f8e971d36a4540ed7cab2.jpeg'
  },
  {
    id: 2,
    first: 'Tom',
    last: 'Dale',
    avatar: 'https://si0.twimg.com/profile_images/1317834118/avatar.png'
  },
  {
    id: 3,
    first: 'Yehuda',
    last: 'Katz',
    avatar: 'https://si0.twimg.com/profile_images/3250074047/46d910af94e25187832cb4a3bc84b2b5.jpeg'
  }
];