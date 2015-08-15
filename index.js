'use strict';

/*
 *  ______                     _________
 *  ___  /_____________ _____________  /
 *  __  __ \  __ \  __ `/_  ___/  __  /
 *  _  /_/ / /_/ / /_/ /_  /   / /_/ /
 *  /_.___/\____/\__,_/ /_/    \__,_/
 *      a minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see `LICENSE.md` file for details.
 *
 * Send your comments and suggestions to…
 * <https://github.com/v0lkan/board/issues>
 */

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boardQueue = require('board.queue');

var _boardLog = require('board.log');

var _boardLog2 = _interopRequireDefault(_boardLog);

var _runner = require('./runner');

var noop = function noop() {};

var create = function create(config, delegate, callback) {
    var sock = (0, _boardQueue.createPushSocket)();

    // TODO: throw if target not specified.
    // TODO: throw if target not in config.
    // callback(new Error(), noop);

    var send = function send(data) {
        data.ts = data.ts || new Date().getTime();

        var targets = config.targets || [];

        targets.forEach(function (target) {
            data.target = target;

            //log(`sending:: '${JSON.stringify(data)}'`);
            sock.send(data);
        });
    };

    (0, _runner.every)(config.interval || 30, function () {
        try {
            delegate(send);
        } catch (err) {}
    });

    callback(null);
};

exports.create = create;

//# sourceMappingURL=index.js.map