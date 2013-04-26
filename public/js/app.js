App = Ember.Application.create({
  rootElement: "#ember-mount"
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    url: 'https://api.ticketbud.com',
    ajax: function (url, type, hash) {
      hash.url = url;
      hash.type = type;
      hash.dataType = 'jsonp';
      hash.contentType = 'application/json; charset=utf-8';
      hash.context = this;

      if (hash.data) {
        hash.data['access_token'] = $("meta[name='access_token']").attr('content');
      } else {
        hash.data = {
          access_token: $("meta[name='access_token']").attr('content')
        };
      }

      if (hash.data && type !== 'GET') {
        hash.data = JSON.stringify(hash.data);
      }

      $.ajax(hash);
    }
  })
});

App.Router.map(function() {
  this.resource('events', function() {
    this.resource('event', {path: ':event_id'}, function(){
      this.resource('tickets');
    });
  });
});

App.EventsRoute = Ember.Route.extend({
  model: function(params) {
    return App.Event.find();
  }
});

App.TicketsRoute = Ember.Route.extend({
  model: function(params) {
    var event = this.modelFor('event');
    return App.Ticket.find({event_id: event.get('id')});
  }
});

App.EventsController = Ember.ArrayController.extend({
});

App.TicketsController = Ember.ArrayController.extend({});

App.Event = DS.Model.extend({
  title: DS.attr('string'),
  eventStart: DS.attr('date'),
  eventEnd: DS.attr('date'),
  timeZone: DS.attr('string'),
  image: DS.attr('string'),
  ticketsAvailable: DS.attr('number'),
  soldOut: DS.attr('boolean'),
  over: DS.attr('boolean'),
  tickets: DS.hasMany('App.Ticket')
});

App.Ticket = DS.Model.extend({
  nameOnTicket: DS.attr('string'),
  checkedIn: DS.attr('boolean'),
  barcodeUrl: DS.attr('string'),
  ticketType: DS.attr('string'),
  event: DS.belongsTo('App.Event')
});