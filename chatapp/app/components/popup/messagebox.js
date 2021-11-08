import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class MessageBoxComponent extends Component {
  @service mouse;
  @service router;
  @service people;
  @service chatdata;

  @tracked move = false;
  @tracked lastLocation = this.mouse.position; //need to change a customrized value, otherwise the popup will follow the cursor
  
  setMove(toMove) {
    this.move = toMove;
  }

  //set the location of PopUp message
  setLastLocation(location) {
    this.lastLocation = location;
  }

  //pass location into PopUp message style
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

  //mouseDown to set the PopUp message movable
  @action
  handleDown() {
    this.setMove(true);
  }

  //mouseUp to set the PopUp message fixed
  @action
  handleUp() {
    if (this.move) {
      this.setLastLocation(this.mouse.position);
    }
    this.setMove(false);
  }

  //Click on the message to direct to the chatwindow with the sender and mark the message as read
  @action
  markAsRead(contact,message) {
    this.chatdata.setCurrent(this.people.focused,contact,'');
    this.people.setFoused(contact);
    this.chatdata.setHistory(contact,[1,message]);
    this.router.transitionTo('chatwindow', `${contact}`);
  }
}
