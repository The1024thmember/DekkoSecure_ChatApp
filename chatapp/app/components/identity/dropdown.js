import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropDownComponent extends Component {
  @service('people') confirmPeople;
  @tracked people = '';
  @action
  choosePeople(event) {
    this.people = event.target.innerHTML;
    this.confirmPeople.getIdentity(event.target.innerHTML);

    let contacts = [];
    this.confirmPeople.contacts.forEach((element) => {
      if (element.userName !== this.confirmPeople.identity) {
        let status;
        if (element.status === 0) {
          status = 'active';
        } else if (element.status === 1) {
          status = 'busy';
        } else {
          status = 'offline';
        }
        contacts.push({ userName: element.userName, status: status });
      }
    });
    this.confirmPeople.getOtherPeople(contacts);
  }
}
