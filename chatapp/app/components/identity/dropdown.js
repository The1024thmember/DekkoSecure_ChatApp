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

    
    //set HUBSPOT identity
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(["identify",{
      email: `${this.confirmPeople.identity}@test.com`,
      id: this.confirmPeople.identity.charCodeAt(0),
      chosenIdentity:`${this.confirmPeople.identity}`,
    }]);


    //send hupspot choosepeople
    _hsq.push(['trackCustomBehavioralEvent',{
      name:'pe21033607_chooseuser',
      properties:{
        amount:12,
        city:'ACT',
        country:'Australia',
        chosenIdentity:`${this.confirmPeople.identity}`
      }
    }]);

    /*//Make API CALL to track event using Hupspot
    let settings = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '1e05d894-705e-48d3-8dec-8d859259f619',
        'mode':'no-cors',
      },
      body: JSON.stringify({
        utk: 'string',
        email: 'zzx1786728683@gmail.com',
        eventName: 'pe21033607_chooseuser',
        properties: {
          amount: '112', city: 'CANS', country: 'Australia'
        },
        occurredAt: '2021-11-21T08:21:14.880Z',
        objectId: 2
      })
    };
    let response = await fetch('https://api.hubspot.com/events/v3/send?hapikey=1e05d894-705e-48d3-8dec-8d859259f619', settings);
    let data = await response.json();
    */

  }
}
