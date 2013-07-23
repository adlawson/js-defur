/*
 * This file is part of Defur
 *
 * Copyright (c) 2013 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see  http://github.com/adlawson/defur/blob/master/LICENSE
 * @link http://github.com/adlawson/defur
 */
(function(globals) {

    var definitions = {};
    var containers  = [];

    /**
     * @param {String} name
     * @param {Object} container
     * @param {Function} definition
     * @api public
     */
    var defur = function(name, container, definition) {
        var services = resolveContainer(container);

        Object.defineProperty(container, name, {
            enumerable: true,
            get: function() {
                if (!services.hasOwnProperty(name)) {
                    services[name] = definition();
                }

                return services[name];
            }
        });
    };

    function resolveContainer(container) {
        var index = containers.indexOf(container);
        if (-1 === index) {
            containers.push(container);
            index = containers.indexOf(container);
            definitions[index] = {};
        }

        return definitions[index];
    };

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return defur;
        });
    } else if (typeof module !== 'undefined' && null !== module) {
        module.exports = defur;
    } else {
        globals.defur = defur;
    }

})(this);
