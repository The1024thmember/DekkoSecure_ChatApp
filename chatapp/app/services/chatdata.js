import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChatdataService extends Service {
    //the key is the contact name
    @tracked current = {}; //the value is the message getting from get API, will set to none when user click on the popUp
    @tracked history = {}; //the value is an array, each of the array element is consisted of [identity_flag, message]
    //identity_flag = 1 means from others. identity_flag = 1 means from self.
    @tracked unsend = {}; //the value is a string
    @tracked old = {}; //the value is the time of last current message
    @tracked currentArray = [];

    //compare the time stamp to determine if new message arrives
    setOld(focused, contact,time, message){
        if (this.old[contact] === undefined){
            this.old[contact] = time;
            this.setCurrent(focused, contact,message);
        }else if(this.old[contact] !== time){
            this.old[contact] = time;
            this.setCurrent(focused, contact,message);
        }
    }

    //set the new arrived message either inside history or show as popUp
    //depends on the current chat window
    setCurrent(focused,contact,current){
        if(focused === contact){ //put into history if the current window is the one who sending message
            this.setHistory(contact,current,1);
        }else if (this.current[contact] && current){ //if there's old unread message from some one who is not in current window, 
            //set the unread as history, and the new information as popUp
            this.setHistory(contact,this.current[contact],1);
            this.current[contact] = current;
            this.setCurrentArray();
        }
        else{ //put into popUp message
            this.current[contact] = current;
            this.setCurrentArray();
        }
    }

    //set a message as history
    setHistory(contact,messgae,identity_flag){
        if (this.history[contact] === undefined){
            this.history[contact] = [[identity_flag,messgae]];
        }else{
            this.history[contact].push([identity_flag,messgae]);
        }
    }

    //save the unsend message
    setUnsend(contact,messgae){
        this.unsend[contact] = messgae;
    }

    //change the data structure of current message, make it iterable
    setCurrentArray(){
        const keys = Object.keys(this.current);
        this.currentArray = [];
        keys.forEach((key)=>{
          //if the current massage is not empty
          if (this.current[key]){
            this.currentArray.push({"sender":key,"message":this.current[key]});
          }
        })
    }
}
