import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let model = Ember.Object.create({
      commands: []
    });
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

    stop() {
      Ember.Logger.info('stop');
    }
  }
});
