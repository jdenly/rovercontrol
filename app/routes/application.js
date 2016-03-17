import Ember from 'ember';

export default Ember.Route.extend({
  comms: Ember.inject.service(),

  model() {
    let model = Ember.Object.create({
      commands: []
    });
    model.set('noCommands', Ember.computed('commands.[]', function() {
      return this.get('commands.length') === 0;
    }));
    return model;
  },

  actions: {
    forward() {
      Ember.Logger.info('forward');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Forward', value: 'F'}));
    },

    backward() {
      Ember.Logger.info('backward');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Backward', value: 'B'}));
    },

    left() {
      Ember.Logger.info('left');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Left', value: 'L'}));
    },

    right() {
      Ember.Logger.info('right');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Right', value: 'R'}));
    },

    removeCommand(command) {
      Ember.Logger.info('removeCommand', command.name);
      this.currentModel.get('commands').removeObject(command);
    },

    clearCommands() {
      Ember.Logger.info('clearCommands');
      if(window.confirm('Clear all commands?')) {
        this.currentModel.get('commands').clear();
      }
    },

    start() {
      Ember.Logger.info('start');
      this.get('comms').sendCommands(this.currentModel.get('commands'));
      this.currentModel.get('commands').clear();
    },

    stop() {
      Ember.Logger.info('stop');
      this.get('comms').stop();
      window.alert('Emergency stop!');
    }
  }
});
