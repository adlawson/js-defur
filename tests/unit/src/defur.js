(function() {

    var defur = require('../../../src/defur');
    var assert = require('chai').assert;

    suite('defur:', function() {
        var services = null;

        setup(function() {
            services = {};
        });

        test('`defur` is a function', function() {
            assert.isFunction(defur);
        });

        test('`defur` defers execution of definition', function() {
            defur('foo', services, function() {
                throw new Error('This should be deferred.');
            });

            assert.throws(function() {
                services.foo;
            });
        });

        test('`defur` creates the service only once', function() {
            defur('foo', services, function() {
                return {};
            });

            assert.strictEqual(services.foo, services.foo);
        });

        test('`defur` works with multiple service containers', function() {
            var otherServices = {};

            defur('foo', services, function() {
                return {};
            });
            defur('foo', otherServices, function() {
                return {};
            });

            assert.notEqual(services.foo, otherServices.foo);
        });

    });

})();
