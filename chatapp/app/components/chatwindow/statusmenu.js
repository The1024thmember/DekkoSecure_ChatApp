import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StatusmenComponent extends Component {
  @tracked currentState;
  setStatus(status) {
    this.currentState = status;
  }
  @action
  chooseStatus(event) {
    this.setStatus(event.target.innerHTML);
  }

  get allstatus() {
    return ['active', 'offline', 'busy'];
  }
}
