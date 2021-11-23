import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatwithComponent extends Component {
  @service people;
  @service router;
  @service chatdata;

  //set the current contact as people to be foucsed, when do to this people's chatwindow
  //the messagePop Up from this people will disapper, and the message will show in conversation history
  @action
  setFocusPeople(name, enable, event) {
    if(enable){
      let unreadMessage = this.chatdata.current[name];
      //only set unreadMessage to history when its not empty
      if (unreadMessage){
        this.chatdata.setHistory(name,unreadMessage,1);
        this.chatdata.setCurrent(this.people.focused,name,'');
      }
      this.people.setFoused(name);
      this.router.transitionTo('chatwindow', `${name}`);

      //send hupspot choosepeople
      var currentdate = new Date(); 
      var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      _hsq.push(['trackCustomBehavioralEvent',{
        name:'pe21033607_talktoalice',
        properties:{
          "time_stamp":datetime,
        }
      }]);

    }
  }
}
