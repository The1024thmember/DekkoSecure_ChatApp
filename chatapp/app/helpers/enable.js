export function enable(data) {
    let newData = JSON.parse(JSON.stringify(data));
    newData = newData[0];
    newData['enable'] = true;
    return newData;
  }
  
  export default Ember.Helper.helper(enable);