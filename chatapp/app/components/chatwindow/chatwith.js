import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatwithComponent extends Component {
    @service mouse;
    @service people;
    get getIdentity(){
        let identity={"userName":this.people.identity,"status":"active"}
        return identity;
    }
    get getContacts(){
        return {"contacts":this.people.otherPeople,"focused":this.people.focused};
    }
    @action
    getDownPosition(event) {
        this.mouse.updatePosition([event.pageX, event.pageY]);
    }
}

