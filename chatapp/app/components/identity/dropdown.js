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
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        utk: 'string',
        email: 'zzx1786728683@gmail.com',
        eventName: 'pe21033607_chooseuser',
        properties: {
          amount: '12', city: 'Sydney', country: 'Australia'
        },
        occurredAt: '2021-11-21T08:21:04.880Z',
        objectId: 123
      })
    };
    let response = await fetch('https://api.hubspot.com/events/v3/send?hapikey=1e05d894-705e-48d3-8dec-8d859259f619', settings);
    let data = await response.json();
    
  
    /*
    var options = {
      "method": "POST",
      "hostname": "api.hubapi.com",
      "port": null,
      "path": "/events/v3/send?hapikey=1e05d894-705e-48d3-8dec-8d859259f619",
      "headers": {
        "accept": "application/json",
        "content-type": "application/json"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify({
      utk: 'string',
      email: 'zzx1786728683@gmail.com',
      eventName: 'pe21033607_chooseuser',
      properties: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      occurredAt: '2021-11-21T08:21:04.880Z',
      objectId: 'string'
    }));
    req.end();
    */
  }
}
