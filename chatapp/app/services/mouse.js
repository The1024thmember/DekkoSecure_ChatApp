import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MouseService extends Service {
  @tracked position = [];

  //get the cursor's current location
  updatePosition(position) {
    this.position = [...position];
  }

}
