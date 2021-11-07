import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class MouseService extends Service {
  @tracked position = [];

  updatePosition(clickedPosition) {
    this.position = [...clickedPosition];
  }

}
