import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatwithComponent extends Component {
  @service mouse;
    @action
    getDownPosition(event) {
    this.mouse.updatePosition([event.pageX, event.pageY]);
    }
}

