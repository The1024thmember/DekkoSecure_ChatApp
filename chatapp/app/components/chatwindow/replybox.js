import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StatusmenComponent extends Component {
  @service chatdata;
  @service people;
  @tracked inputValue=this.chatdata.unsend[this.people.focused];

  @action
  updateValue(event) {
    this.chatdata.setUnsend(this.people.focused,event.target.value);
    console.log("this.people.focused:",this.people.focused);
    console.log("this.chatdata.unsend:",this.chatdata.unsend[this.people.focused]);
  }

  @action
  async onSend() {
    console.log("chatdata.current:",this.chatdata.current);

    let settings = {
        method: 'PUT',
        headers: {
          Accept: '/'
        }
      };

      var url = new URL('https://sochat.xyz/SoChat/messages?');
      const params = {'sender':this.people.identity,
                      'recipient': this.people.focused,
                      'message': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      let response = await fetch(url, settings);
      let data = await response;

      this.chatdata.setUnsend(this.people.focused,'');
      this.inputValue = '';
      return data;
  }

}
