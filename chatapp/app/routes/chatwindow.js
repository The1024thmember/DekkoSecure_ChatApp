import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChatwindowRoute extends Route {
  @service people;
  @service chatdata;
  async model() {
    let data;
    
    let response = await fetch(`/api/${this.people.identity}.json`);
    [data] = await response.json();
    this.chatdata.setOld(data.sender,data.date,data.message);
    console.log("data:",data);
    setInterval(async () => {
      let response = await fetch(`/api/${this.people.identity}.json`);
      [data] = await response.json();
      this.chatdata.setOld(data.sender,data.date,data.message);
    }, 1000);
    const keys = Object.keys(this.chatdata.current);
    const temp = [];
    keys.forEach((key)=>{
      if (this.chatdata.current[key]){
        temp.push({"sender":key,"message":this.chatdata.current[key]});
      }
    })
    return temp;
  }
}
