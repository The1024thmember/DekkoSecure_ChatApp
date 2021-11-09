export function setMessagePosition(message,index) {
    let newMessage = JSON.parse(JSON.stringify(message));
    let left = parseInt(JSON.parse(JSON.stringify(index)).index);
    newMessage = newMessage[0];
    newMessage['position'] = `top:300px;left:${200+left*120}px`;
    return newMessage;
  }
  
  export default Ember.Helper.helper(setMessagePosition);
  