import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChatwithComponent extends Component {
  @service mouse;
  @service people;
  @service chatdata;
  @tracked replydata = this.chatdata.currentArray;
  @tracked current;

  setCurrent(value){
    this.current = value;
  };
    
  get getCurrent(){
    const keys = Object.keys(this.chatdata.current);
    const temp = [];
    keys.forEach((key)=>{
      if (this.chatdata.current[key]){
        temp.push({"sender":key,"message":this.chatdata.current[key]});
      }
    })
    this.setCurrent(temp);
    console.log("this.current:",this.current);
    return this.current;
  };
  

  get getIdentity() {
    let identity = { userName: this.people.identity, status: 'active' };
    return identity;
  };

  get getContacts() {
    return { contacts: this.people.otherPeople, focused: this.people.focused };
  };

  get getHistory() {
    return this.chatdata.history[this.people.focused];
  }

  @action
  getDownPosition(event) {
    this.mouse.updatePosition([event.pageX, event.pageY]);
    this.replydata = this.chatdata.currentArray;
  }

  @action
  setReply(event) {
    
  }
}
