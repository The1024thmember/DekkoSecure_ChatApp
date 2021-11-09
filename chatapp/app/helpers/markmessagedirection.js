export function markMessageDirection(data) {
  let tempData = JSON.parse(JSON.stringify(data))[0];
  let newData = {}
  if (tempData[0] === 1){
    newData.status='receive';
  }else{
    newData.status='send';
  }
  newData.message=tempData[1];
  return newData;
}

export default Ember.Helper.helper(markMessageDirection);
