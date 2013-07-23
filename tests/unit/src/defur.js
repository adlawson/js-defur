(function() {

    var defur = require('../../../src/defur');
    var assert = require('chai').assert;

    suite('defur:', function() {
        var services = null;

        test('`defur` is a function', function() {
            assert.isFunction(defur);
        });

        test('`defur` defers execution of definition', function() {
            services = {
                get foo() {
                    return defur('foo', this, function() {
                        throw new Error('This should be deferred.');
                    });
                }
            };

            assert.throws(function() {
                services.foo;
            });
        });

        test('`defur` creates the service only once', function() {
            services = {
                get foo() {
                    return defur('foo', this, function() {
                        return {};
                    });
                }
            };

            assert.strictEqual(services.foo, services.foo);
        });

        test('`defur` services don\'t collide', function() {
            services = {
                get foo() {
                    return defur('foo', this, function() {
                        return {};
                    });
                },
                get bar() {
                    return defur('bar', this, function() {
                        return {};
                    });
                }
            };

            assert.notEqual(services.foo, services.bar);
        });

        test('`defur` services with same given name do collide', function() {
            services = {
                get foo() {
                    return defur('foo', this, function() {
                        return {};
                    });
                },
                get bar() {
                    return defur('foo', this, function() {
                        return {};
                    });
                }
            };

            assert.strictEqual(services.foo, services.bar);
        });

        test('`defur` works with multiple service containers', function() {
            var otherServices = {
                get foo() {
                    return defur('foo', this, function() {
                        return {};
                    });
                }
            };

            services = {
                get foo() {
                    return defur('foo', this, function() {
                        return {};
                    });
                }
            };

            assert.notEqual(services.foo, otherServices.foo);
        });

    });

    suite('defur.define:', function() {
        var services = null;

        setup(function() {
            services = {};
        });

        test('`defur.define` is a function', function() {
            assert.isFunction(defur.define);
        });

        test('`defur.define` defers execution of definition', function() {
            defur.define('foo', services, function() {
                throw new Error('This should be deferred.');
            });

            assert.throws(function() {
                services.foo;
            });
        });

        test('`defur.define` creates the service only once', function() {
            defur.define('foo', services, function() {
                return {};
            });

            assert.strictEqual(services.foo, services.foo);
        });

        test('`defur.define` services don\'t collide', function() {
            defur.define('foo', services, function() {
                return {};
            });
            defur.define('bar', services, function() {
                return {};
            });

            assert.notEqual(services.foo, services.bar);
        });

        test('`defur.define` works with multiple service containers', function() {
            var otherServices = {};

            defur.define('foo', services, function() {
                return {};
            });
            defur.define('foo', otherServices, function() {
                return {};
            });

            assert.notEqual(services.foo, otherServices.foo);
        });

    });

})();
