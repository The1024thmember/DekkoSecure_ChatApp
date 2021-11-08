import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChatdataService extends Service {
    //the key is the contact name
    @tracked current = {}; //the value is the message getting from get API, will set to none when user click on the popUp
    @tracked history = {}; //the value is an array, each of the array element is consisted of [identity_flag, message]
    @tracked unsend = {}; //the value is a string
    @tracked old = {}; //the value is the time of last current message
    @tracked currentArray = [];

    setOld(contact,time, message){
        if (this.old[contact] === undefined){
            this.old[contact] = time;
            this.setCurrent(contact,message);
        }else if(this.old[contact] !== time){
            this.old[contact] = time;
            this.setCurrent(contact,message);
        }
    }

    setCurrent(contact,current){
        this.current[contact] = current;
        this.setCurrentArray();
    }

    setHistory(contact,messgae,identity_flag){
        if (this.history[contact] === undefined){
            this.history[contact] = [[identity_flag,messgae]];
        }else{
            this.history[contact].push([identity_flag,messgae]);
        }
    }

    setUnsend(contact,messgae){
        this.unsend[contact] = messgae;
    }

    setCurrentArray(){
        const keys = Object.keys(this.current);
        this.currentArray = [];
        keys.forEach((key)=>{
          if (this.current[key]){
            this.currentArray.push({"sender":key,"message":this.current[key]});
          }
        })
        console.log("modeldata:",this.currentArray);
    }
}
