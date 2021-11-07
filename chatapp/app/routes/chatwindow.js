import Route from '@ember/routing/route';

export default class ChatwindowRoute extends Route {
  async model(params) {
    let response = await fetch(`/api/${params.contact_name}.json`);
    let data = await response.json();
    console.log("chatdata:",data);
    return data;
  }
}
