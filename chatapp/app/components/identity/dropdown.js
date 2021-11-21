import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropDownComponent extends Component {
  @service('people') confirmPeople;
  @tracked people = '';

  //get the user's identity
  @action
  async choosePeople(event) {
    this.people = event.target.innerHTML;
    this.confirmPeople.getIdentity(event.target.innerHTML);

    let contacts = [];
    this.confirmPeople.contacts.forEach((element) => {
      //change the status number into string
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


    //send hupspot choosepeople
    let settings = {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Identifier":"xiaoCai",
        "Event name":"pe21033607_chooseuser"
      })
    };
    let response = await fetch('https://api/hubspot.com/events/v3/send', settings);
    let data = await response.json();
  }
}
