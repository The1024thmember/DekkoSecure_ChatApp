import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | identity/dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('people',[
        {
          "userName": "A",
          "status": 2
        },
        {
          "userName": "B",
          "status": 0
        },
        {
          "userName": "C",
          "status": 1
        },
        {
          "userName": "D",
          "status": 0
        },
        {
          "userName": "E",
          "status": 0
        },
        {
          "userName": "F",
          "status": 2
        }
      ])
    await render(hbs`<Identity::Dropdown @people={{this.people}}/>`);
    let dropDownItems = this.element.querySelectorAll('p');
    assert.equal(dropDownItems.length,this.people.length,"dropdown item is shown");
    assert.equal(dropDownItems[2].innerHTML,this.people[2].userName,"userName is shown in dropdown item");
    await click(dropDownItems[2]);
    assert.equal(this.element.querySelector('input').value,this.people[2].userName,"when select an item, the userName is shown in input");
  });
});
