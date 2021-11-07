import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ChatController extends Controller {
  @service mouse;
  @action
  getDownPosition(event) {
    this.mouse.updatePosition([event.pageX,event.pageY]);
  }

}
