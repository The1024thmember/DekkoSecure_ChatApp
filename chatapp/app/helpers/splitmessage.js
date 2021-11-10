export function splitMessage(message) {
    var w = window.innerWidth;
    let newMessage = JSON.parse(JSON.stringify(message));
    newMessage = newMessage[0];
    let spacedMessage='';
    if (w<800){ //every 25 chars add a new space
      if (newMessage.length > 20){
        for(var i = 0; i < newMessage.length/20; i++){
            if (newMessage.slice(i*20,(i+1)*20).includes(' ')){
              spacedMessage+=newMessage.slice(i*20,(i+1)*20);
            }else{
              spacedMessage+=newMessage.slice(i*20,(i+1)*20) + ' ';
            } 
        }
        return spacedMessage;
      }
    }else{ //every 30 chars add a new space
        if (newMessage.length > 28){
            for(var i = 0; i < newMessage.length/28; i++){
              if (newMessage.slice(i*28,(i+1)*28).includes(' ')){
                spacedMessage+=newMessage.slice(i*28,(i+1)*28);
              }else{
                spacedMessage+=newMessage.slice(i*28,(i+1)*28) + ' ';
              } 
            }
            return spacedMessage;
        }
    }
    return newMessage;
  }
  
  export default Ember.Helper.helper(splitMessage);