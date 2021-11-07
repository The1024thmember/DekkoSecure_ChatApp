import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class PeopleService extends Service {
  @tracked contacts = [];
  @tracked identity = '';
  @tracked otherPeople = [];

  getContacts(gotContacts) {
    this.contacts = [...gotContacts];
  }
  getOtherPeople(others) {
    this.otherPeople = [...others];
  }
  getIdentity(gotIdentity) {
    this.identity = gotIdentity;
  }
}
