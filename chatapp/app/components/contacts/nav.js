import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NavComponent extends Component {
  @service people;
  get contact() {
    console.log(this.people.contacts);
    console.log(this.people.identity);
    let contacts = this.people.contacts.map((value) => {
      let status;
      if (value.status === 0) {
        status = 'active';
      } else if (value.status === 1) {
        status = 'busy';
      } else {
        status = 'offline';
      }
      return { userName: value.userName, status: status };
    });
    console.log(contacts);
    return contacts;
  }
}
