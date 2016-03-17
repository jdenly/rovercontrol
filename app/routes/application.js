import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let model = Ember.Object.create({
      commands: []
    });
    model.set('startDisabled', Ember.computed('commands.[]', function() {
      return this.get('commands.length') === 0;
    }));
    return model;
  },

  actions: {
    forward() {
      Ember.Logger.info('forward');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Forward'}));
    },

    backward() {
      Ember.Logger.info('backward');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Backward'}));
    },

    left() {
      Ember.Logger.info('left');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Left'}));
    },

    right() {
      Ember.Logger.info('right');
      this.currentModel.get('commands').pushObject(Ember.Object.create({label: 'Right'}));
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
      // Send to rover here
      this.currentModel.get('commands').clear();
    },

    stop() {
      Ember.Logger.info('stop');
    }
  }
});
