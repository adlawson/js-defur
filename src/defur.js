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

    'use strict';

    var containers = [];
    var services   = {};

    /**
     * @param {String} name
     * @param {Object} context
     * @param {Function} definition
     * @return {Mixed}
     * @api public
     */
    var defur = function(name, context, definition) {
        var services = resolveContext(context);
        if (!services.hasOwnProperty(name)) {
            services[name] = definition();
        }

        return services[name];
    };

    /**
     * @param {String} name
     * @param {Object} context
     * @param {Function} definition
     * @api public
     */
    defur.define = function(name, context, definition) {
        Object.defineProperty(context, name, {
            enumerable: true,
            get: function() {
                return defur(name, context, definition);
            }
        });
    };

    function resolveContext(context) {
        var index = containers.indexOf(context);
        if (-1 === index) {
            containers.push(context);
            index = containers.indexOf(context);
            services[index] = {};
        }

        return services[index];
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
