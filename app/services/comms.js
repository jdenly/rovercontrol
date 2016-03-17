import Ember from 'ember';
import ENV from 'rovercontrol/config/environment';

/*
Sample command (using curl):
 curl https://api.spark.io/v1/devices/<DEVICEID>/commands -d access_token=<ACCESSTOKEN> -d params=<COMMANDS>
 Commands is one of F, B, L, R, S.
 */

export default Ember.Service.extend({
  stop() {
    Ember.Logger.info('comms: stop');
    Ember.$.post('https://api.spark.io/v1/devices/' + ENV.APP.device_id + '/stop',
      {access_token:ENV.APP.access_token});
  },

  sendCommands(commands) {
    Ember.Logger.info('comms: sendCommands', commands);
    let commandsString = '';
    commands.forEach(function(command) {
      commandsString += command.get('value');
    });
    Ember.$.post('https://api.spark.io/v1/devices/' + ENV.APP.device_id + '/commands',
      {access_token:ENV.APP.access_token, params:commandsString});
  }
});
