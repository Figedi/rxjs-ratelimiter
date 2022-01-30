"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var RateLimiter = /** @class */ (function () {
    function RateLimiter(requestsPerInterval, intervalLength, scheduler) {
        if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
        this.requestsPerInterval = requestsPerInterval;
        this.intervalLength = intervalLength;
        this.scheduler = scheduler;
        this.intervalEnds = 0;
        this.nActiveInCurrentInterval = 0;
    }
    RateLimiter.prototype.limit = function (stream) {
        var _this = this;
        return (0, rxjs_1.of)(null).pipe((0, operators_1.concatMap)(function () {
            var now = _this.scheduler.now();
            if (_this.intervalEnds <= now) {
                _this.nActiveInCurrentInterval = 1;
                _this.intervalEnds = now + _this.intervalLength;
                return stream;
            }
            else {
                if (++_this.nActiveInCurrentInterval > _this.requestsPerInterval) {
                    _this.nActiveInCurrentInterval = 1;
                    _this.intervalEnds += _this.intervalLength;
                }
                var wait = _this.intervalEnds - _this.intervalLength - now;
                return wait > 0
                    ? (0, rxjs_1.of)(null).pipe((0, operators_1.delay)(wait, _this.scheduler), (0, operators_1.switchMapTo)(stream))
                    : stream;
            }
        }));
    };
    return RateLimiter;
}());
exports.default = RateLimiter;
//# sourceMappingURL=index.js.map