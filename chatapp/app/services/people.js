import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class PeopleService extends Service {
  @tracked contacts = [];
  @tracked identity = 'Alice';

  getContacts(gotContacts) {
    this.contacts = [...gotContacts];
    console.log('service:', this.contacts);
  }

  getIdentity(gotIdentity) {
    console.log('service:', gotIdentity);
    this.identity = gotIdentity;
  }
}
