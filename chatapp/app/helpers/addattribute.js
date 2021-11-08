export function addAttribute(data) {
  let newData = JSON.parse(JSON.stringify(data));
  newData = newData[0];
  newData['style'] = 'onfocus';
  return newData;
}

export default Ember.Helper.helper(addAttribute);
