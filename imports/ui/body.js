import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/task.js';
 
import './body.html';
 
Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: {createdAt: -1}});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    Tasks.insert({
      text,
      createdAt: new Date(),
    });
    target.text.value = '';
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});