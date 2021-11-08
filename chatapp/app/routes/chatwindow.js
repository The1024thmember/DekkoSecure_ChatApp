import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChatwindowRoute extends Route {
  @service people;
  @service chatdata;

  model() {
    let data;
    
    const getUserChatData = async () => {
      var url = new URL('https://sochat.xyz/SoChat/messages?');
      const params = {'user':this.people.identity};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      let response = await fetch(url);
      [data] = await response.json();
      if (data){
        this.chatdata.setOld(data.sender,data.date,data.message);
        //this.chatdata.setCurrentArray();
        console.log("chatdatainmodel:",this.chatdata.current);
      }
    }
    getUserChatData();
    
    setInterval(async () => {
      getUserChatData();
    }, 1000);

    const keys = Object.keys(this.chatdata.current);
    const temp = [];
    keys.forEach((key)=>{
      if (this.chatdata.current[key]){
        temp.push({"sender":key,"message":this.chatdata.current[key]});
      }
    })
    console.log("modeldata:",temp);
    return temp;
  }
}
