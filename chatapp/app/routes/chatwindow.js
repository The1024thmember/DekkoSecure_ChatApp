import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChatwindowRoute extends Route {
  @service people;
  model() {
    console.log('this.people.contacts:', this.people.identity);
  }
}
