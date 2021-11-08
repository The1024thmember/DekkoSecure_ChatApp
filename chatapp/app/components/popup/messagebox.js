import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class MessageBoxComponent extends Component {
  @service mouse;
  @tracked move = false;
  @tracked lastLocation = this.mouse.position; //need to change a customrized value, otherwise the popup will follow the cursor
  @service router;
  @service people;
  @service chatdata;

  setMove(toMove) {
    this.move = toMove;
  }
  setLastLocation(location) {
    this.lastLocation = location;
  }
  get safeStyle() {
    if (this.move) {
      return htmlSafe(
        `top: ${this.escapeCSS(
          this.mouse.position[1] - 5
        )}px; left: ${this.escapeCSS(this.mouse.position[0] - 5)}px`
      );
    } else {
      return htmlSafe(
        `top: ${this.escapeCSS(
          this.lastLocation[1] - 5
        )}px; left: ${this.escapeCSS(this.lastLocation[0] - 5)}px`
      );
    }
  }
  escapeCSS(css) {
    return css;
  }

  @action
  handleUp() {
    if (this.move) {
      this.setLastLocation(this.mouse.position);
    }
    this.setMove(false);
  }
  @action
  handleDown() {
    this.setMove(true);
  }

  @action
  markAsRead(contact,message) {
    this.people.setFoused(contact);
    this.chatdata.setCurrent(contact,'');
    this.chatdata.setHistory(contact,[1,message]);
    this.router.transitionTo('chatwindow', `${contact}`);
  }
}
