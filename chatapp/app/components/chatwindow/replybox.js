import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StatusmenComponent extends Component {
  @service chatdata;
  @service people;
  @service router;

  // The current Input value
  @tracked inputValue=this.chatdata.unsend[this.people.focused];

  // set the unsent message equal to what it has in inputbox
  @action
  updateValue(event) {
    this.inputValue = event.target.value;
    this.chatdata.setUnsend(this.people.focused,event.target.value);
  }

  // Check if pressed enter
  @action
  async checkEnter(event) {
    if (event.keyCode === 13){
      let settings = {
        method: 'PUT',
        headers: {
          Accept: '/'
        }
      };
      this.inputValue=this.chatdata.unsend[this.people.focused];
      var url = new URL('https://sochat.xyz/SoChat/messages?');
      const params = {'sender':this.people.identity,
                      'recipient': this.people.focused,
                      'message': this.inputValue,
                    };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      if(this.people.identity){
        let response = await fetch(url, settings);
      }else{
        this.router.transitionTo('/');
      }
      //set the reply message into history
      this.chatdata.setHistory(this.people.focused,this.inputValue,0);
      this.chatdata.setUnsend(this.people.focused,'');
      this.inputValue = '';      
    }
  }

  @action
  async onSend() {

    let settings = {
        method: 'PUT',
        headers: {
          Accept: '/'
        }
      };
      this.inputValue=this.chatdata.unsend[this.people.focused];
      var url = new URL('https://sochat.xyz/SoChat/messages?');
      const params = {'sender':this.people.identity,
                      'recipient': this.people.focused,
                      'message': this.inputValue,
                    };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      let response = await fetch(url, settings);
      //set the reply message into history
      this.chatdata.setHistory(this.people.focused,this.inputValue,0);
      this.chatdata.setUnsend(this.people.focused,'');
      this.inputValue = '';
      
  }

}
