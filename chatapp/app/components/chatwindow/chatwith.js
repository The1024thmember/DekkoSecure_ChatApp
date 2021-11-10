import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChatwithComponent extends Component {
  @service mouse;
  @service people;
  @service chatdata;
  @service router;

  //To make the popUp render correctly
  @tracked popUps = this.chatdata.currentArray;

  //To make the history render correctly
  @tracked history = this.chatdata.history[this.people.focused];

  //To initial the setInterval
  @tracked firstLoad = true;

  //Keep records of the unsent value
  @tracked unsent = this.chatdata.unsend[this.people.focused];

  get getIdentity() {
    let identity = { userName: this.people.identity, status: 'active' };
    return identity;
  };

  get getContacts() {
    return { contacts: this.people.otherPeople, focused: this.people.focused };
  };


  // Get the Message PopUp's position, make it the same as the current location of cursor
  @action
  getDownPosition(event) {

    //Get the mouse location
    this.mouse.updatePosition([event.pageX, event.pageY]);

    //To initial the fetching data run every 1 second
    if (this.firstLoad){
      this.firstLoad = false;
      const getUserChatData = async () => {
        let data;
        var url = new URL('https://sochat.xyz/SoChat/messages?');
        const params = {'user':this.people.identity};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
        if (this.people.identity){
          let response = await fetch(url);
          if (response.status === 200) {
            [data] = await response.json();
            //when there's new data, chanege the current data accordinly
            if (data){
              this.chatdata.setOld(this.people.focused,data.sender,data.date,data.message);
            }
          }
        }else{
          this.router.transitionTo('/');
        }

        //refresh the history data
        this.history = this.chatdata.history[this.people.focused];
        //refresh the popUp data
        this.popUps = this.chatdata.currentArray;
        //refresh the unsend data
        this.unsent = this.chatdata.unsend[this.people.focused];
      }
      getUserChatData();
      
      setInterval(async () => {
        getUserChatData();

        //Adding this will allow the screen auto foucs on the last message this contact send
        //but in the mean time, when the user try to scroll the chat history, it will have bug
        /*
        let chatHistoryContainer = document.getElementById("chathistory");
        chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
        */

      }, 1000);
    }
  }

}
