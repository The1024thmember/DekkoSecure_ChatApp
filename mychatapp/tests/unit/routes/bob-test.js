import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bob', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bob');
    assert.ok(route);
  });
});
