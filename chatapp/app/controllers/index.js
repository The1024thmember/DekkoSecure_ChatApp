import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignController extends Controller {
  @service people;
  @action
  confirmIdentity(event) {
    console.log(
      'Go to the chat window with identity as ',
      this.people.identity
    );
  }
}
