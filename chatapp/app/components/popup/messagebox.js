import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class MessageBoxComponent extends Component {
    @service mouse;
    @tracked move = false;
    @tracked lastLocation = this.mouse.position;
    setMove(toMove){
        this.move = toMove;
    };
    setLastLocation(location){
        this.lastLocation = location;
    };
    get safeStyle() {
        if (this.move){
            return htmlSafe(`top: ${this.escapeCSS(this.mouse.position[1])}px; left: ${this.escapeCSS(this.mouse.position[0])}px`);
        }
        else{
            return htmlSafe(`top: ${this.escapeCSS(this.lastLocation[1])}px; left: ${this.escapeCSS(this.lastLocation[0])}px`);
        }
    };
    escapeCSS(css) {
        return css; 
    };

    @action
    handleClick(){
        if (this.move){
            this.setLastLocation(this.mouse.position);
        }
        this.setMove(!this.move);
    }
  }