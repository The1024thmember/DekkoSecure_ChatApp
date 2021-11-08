import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignController extends Controller {
  @service people;
  get getFousedPeople() {
    if (this.people.identity) {
      this.people.setFoused(this.people.otherPeople[0].userName);
      return this.people.otherPeople[0].userName;
    }
  }
}
