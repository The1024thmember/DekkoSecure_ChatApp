import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SignRoute extends Route {
  @service people;
  async model() {
    let settings = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
    };
    let response = await fetch('/api/users.json', settings);
    let data = await response.json();

    this.people.getContacts(data);

    return data;
  }
}
