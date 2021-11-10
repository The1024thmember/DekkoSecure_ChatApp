export function resetPopUpMessage(message) {
    //14 chars, what exceeds 14 chars will change into ...
    let newMessage = JSON.parse(JSON.stringify(message));
    newMessage = newMessage[0];
    if (newMessage.length > 14) {
      newMessage = newMessage.slice(0,12)+"...";
    }
    return newMessage;
  }
  
  export default Ember.Helper.helper(resetPopUpMessage);