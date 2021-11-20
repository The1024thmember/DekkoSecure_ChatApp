import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | contacts/nav', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('contacts',{ 
        contacts: [
           {
            userName: 'A',
            status: 'active',
           }, 
           {
            userName: 'B',
            status: 'busy',
           }, 
           {
            userName: 'C',
            status: 'offline',
           }, 
        ],
        focused: 'A', 
    });
    await render(hbs`<Contacts::Nav @contacts={{this.contacts}}/>`);
    let navItems = this.element.querySelector('.contacts-nav');
    assert.equal(navItems.childElementCount,this.contacts.contacts.length,"Nav display items correctly");
    assert.dom(navItems.children[0]).hasStyle({fontWeight:'700'});
    assert.dom(navItems.children[1]).hasStyle({fontWeight:'200'});
    });
});
