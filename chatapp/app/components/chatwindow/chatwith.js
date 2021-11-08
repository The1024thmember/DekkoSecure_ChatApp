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
  @tracked firstLoad = true;

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

    if (this.firstLoad){
      this.firstLoad = false;
      const getUserChatData = async () => {
        let data;
        var url = new URL('https://sochat.xyz/SoChat/messages?');
        const params = {'user':this.people.identity};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
        let response = await fetch(url);
        [data] = await response.json();
        if (data){
          this.chatdata.setOld(data.sender,data.date,data.message);
          console.log("chatdatainmodel:",this.chatdata.current);
          //here is the problem, since if there's no new data come, it won't execute this code, so replydata won't modify
        }
        this.replydata = this.chatdata.currentArray;
      }
      getUserChatData();
      
      setInterval(async () => {
        getUserChatData();
      }, 1000);
    }
  }

  @action
  setReply(event) {
    
  }
}
