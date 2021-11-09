export function markMessageDirection(data) {
  let tempData = JSON.parse(JSON.stringify(data))[0];
  let newData = {}
  newData.status=tempData[0];
  newData.message=tempData[1];
  return newData;
}

export default Ember.Helper.helper(markMessageDirection);
