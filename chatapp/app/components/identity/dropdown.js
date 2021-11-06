import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropDownComponent extends Component {
  @service ('people') confirmPeople;
  @tracked people = 'Alice';
  @action
  choosePeople(event) {
    console.log(event.target.innerHTML);
    this.people = event.target.innerHTML;
    this.confirmPeople.getIdentity(event.target.innerHTML);
  }

}
