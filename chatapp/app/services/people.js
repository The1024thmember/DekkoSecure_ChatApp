import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class PeopleService extends Service {
  @tracked contacts = []; //all the users include myself
  @tracked otherPeople = []; //all the users exclude myself
  @tracked identity = ''; // the identity of the signed in user
  @tracked focused = ''; // the current contact in conversation in the chatwindow

  getContacts(gotContacts) {
    this.contacts = [...gotContacts];
  }

  getOtherPeople(others) {
    this.otherPeople = [...others];
  }

  getIdentity(gotIdentity) {
    this.identity = gotIdentity;
  }
  
  setFoused(focused) {
    this.focused = focused;
  }
}
