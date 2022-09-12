"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDefStats = exports.parseQBStats = void 0;
function parseQBStats(qbStats, year) {
    return qbStats.map(function (stat) {
        return {
            player: stat.player.value,
            year: year,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value,
        };
    });
}
exports.parseQBStats = parseQBStats;
function parseDefStats(defRushStats, offPassStats, year) {
    var defs = [];
    var _loop_1 = function (def) {
        var found = defs.findIndex(function (find) { return find.team === def.team.value; });
        var updatedDef = void 0;
        var isRush = Object.keys(def).includes('rushYds');
        if (isRush) {
            updatedDef = parseDefRushingStats(def);
        }
        else {
            updatedDef = parseDefPassingStats(def);
        }
        if (found > -1) {
            defs[found] = __assign(__assign(__assign({}, defs[found]), updatedDef), { year: year });
        }
        else {
            defs = __spreadArray(__spreadArray([], defs, true), [updatedDef], false);
        }
    };
    for (var _i = 0, _a = __spreadArray(__spreadArray([], defRushStats, true), offPassStats, true); _i < _a.length; _i++) {
        var def = _a[_i];
        _loop_1(def);
    }
    return defs;
}
exports.parseDefStats = parseDefStats;
function parseDefRushingStats(def) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        team: (_b = (_a = def.team) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
        rushYdsAllowed: (_d = (_c = def.rushYds) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0,
        ydsPerCarry: (_f = (_e = def.ypc) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : 0,
        rushTdsAllowed: (_h = (_g = def.td) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0
    };
}
function parseDefPassingStats(def) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
        team: (_b = (_a = def.team) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
        completionPctAllowed: (_d = (_c = def.compPct) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0,
        passYdsAllowed: (_f = (_e = def.yds) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : 0,
        ints: (_h = (_g = def.int) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0,
        sacks: (_k = (_j = def.sacks) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : 0
    };
}
