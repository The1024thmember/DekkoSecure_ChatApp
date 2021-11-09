import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SignRoute extends Route {
  @service people;

  //get the all the roles information
  async model() {
    let settings = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
    };
    let response = await fetch('https://sochat.xyz/SoChat/users', settings);
    let data = await response.json();

    this.people.getContacts(data);

    return data;
  }
}
