import Ember from 'ember';

export default Ember.Service.extend({
  stop() {
    Ember.Logger.info('comms: stop');
  },

  sendCommands(commands) {
    Ember.Logger.info('comms: sendCommands', commands);
  }
});
