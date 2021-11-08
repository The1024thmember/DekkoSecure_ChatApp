import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatwithComponent extends Component {
  @service people;
  @service router;
  @action
  setFocusPeople(name, event) {
    this.people.setFoused(name);
    this.router.transitionTo('chatwindow', `${name}`);
  }
}
