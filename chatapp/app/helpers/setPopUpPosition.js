export function setPopUpPosition(message,index) {
    var w = window.innerWidth;
    let newMessage = JSON.parse(JSON.stringify(message));
    let left = parseInt(JSON.parse(JSON.stringify(index)).index);
    newMessage = newMessage[0];
    if (w<800){
      newMessage['position'] = `top:400px;left:${100+left*120}px`;
    }else{
      newMessage['position'] = `top:400px;left:${600+left*120}px`;
    }
    
    return newMessage;
  }
  
  export default Ember.Helper.helper(setPopUpPosition);
  