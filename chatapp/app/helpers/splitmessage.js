export function splitMessage(message) {
    var w = window.innerWidth;
    let newMessage = JSON.parse(JSON.stringify(message));
    newMessage = newMessage[0];
    let spacedMessage='';
    if (w<800){ //every 38 chars add a new space
      if (newMessage.length > 38){
        for(var i = 0; i < newMessage.length/38; i++){
            if (newMessage.slice(i*38,(i+1)*38).includes(' ')){
              spacedMessage+=newMessage.slice(i*38,(i+1)*38);
            }else{
              spacedMessage+=newMessage.slice(i*38,(i+1)*38) + ' ';
            } 
        }
        return spacedMessage;
      }
    }else{ //every 50 chars add a new space
        if (newMessage.length > 50){
            for(var i = 0; i < newMessage.length/50; i++){
              if (newMessage.slice(i*50,(i+1)*50).includes(' ')){
                spacedMessage+=newMessage.slice(i*50,(i+1)*50);
              }else{
                spacedMessage+=newMessage.slice(i*50,(i+1)*50) + ' ';
              } 
            }
            return spacedMessage;
        }
    }
    return newMessage;
  }
  
  export default Ember.Helper.helper(splitMessage);