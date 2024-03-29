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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.parseDefPassResponse = exports.parseDefRushResponse = void 0;
var def_const_1 = require("../models/defaults/def.const");
var cheerio = require('cheerio');
function parseDefRushResponse(table, url) {
    return __awaiter(this, void 0, void 0, function () {
        var defRushStats, playerSelector, rushYdsSelector, ypcSelector, tdsSelector, $, rows;
        return __generator(this, function (_a) {
            defRushStats = [];
            playerSelector = def_const_1.DEF_RUSH_STATS.team.statSelector;
            rushYdsSelector = def_const_1.DEF_RUSH_STATS.rushYds.statSelector;
            ypcSelector = def_const_1.DEF_RUSH_STATS.ypc.statSelector;
            tdsSelector = def_const_1.DEF_RUSH_STATS.td.statSelector;
            $ = cheerio.load(table);
            rows = $('tbody > tr', table);
            $(rows).each(function (rowIndex, row) {
                var defRush = {
                    url: url,
                    team: {
                        statSelector: playerSelector
                    },
                    rushYds: {
                        statSelector: rushYdsSelector
                    },
                    ypc: {
                        statSelector: ypcSelector
                    },
                    td: {
                        statSelector: tdsSelector
                    }
                };
                $('td', row).each(function (colIndex, col) {
                    var team = defRush.team, rushYds = defRush.rushYds, ypc = defRush.ypc, td = defRush.td;
                    if (colIndex === playerSelector.statColIndex) {
                        var playerParentSelector = $(".".concat(playerSelector.statName), $(row));
                        team = __assign(__assign({}, team), { value: playerParentSelector.html().trim() });
                        defRush = __assign(__assign({}, defRush), { team: team });
                    }
                    else if (colIndex === rushYdsSelector.statColIndex) {
                        rushYds = __assign(__assign({}, rushYds), { value: +$(col).html().trim() });
                        defRush = __assign(__assign({}, defRush), { rushYds: rushYds });
                    }
                    else if (colIndex === ypcSelector.statColIndex) {
                        ypc = __assign(__assign({}, ypc), { value: +$(col).html().trim() });
                        defRush = __assign(__assign({}, defRush), { ypc: ypc });
                    }
                    else if (colIndex === tdsSelector.statColIndex) {
                        td = __assign(__assign({}, td), { value: +$(col).html().trim() });
                        defRush = __assign(__assign({}, defRush), { td: td });
                    }
                });
                defRushStats = __spreadArray(__spreadArray([], defRushStats, true), [defRush], false);
            });
            return [2 /*return*/, Promise.resolve(defRushStats)];
        });
    });
}
exports.parseDefRushResponse = parseDefRushResponse;
function parseDefPassResponse(table, url) {
    return __awaiter(this, void 0, void 0, function () {
        var defPassStats, playerSelector, comppctSelector, ydsSelector, tdsSelector, intSelector, sackSelector, $, rows;
        return __generator(this, function (_a) {
            defPassStats = [];
            playerSelector = def_const_1.DEF_PASS_STATS.team.statSelector;
            comppctSelector = def_const_1.DEF_PASS_STATS.compPct.statSelector;
            ydsSelector = def_const_1.DEF_PASS_STATS.yds.statSelector;
            tdsSelector = def_const_1.DEF_PASS_STATS.td.statSelector;
            intSelector = def_const_1.DEF_PASS_STATS.int.statSelector;
            sackSelector = def_const_1.DEF_PASS_STATS.sacks.statSelector;
            $ = cheerio.load(table);
            rows = $('tbody > tr', table);
            $(rows).each(function (rowIndex, row) {
                var defPass = {
                    url: url,
                    team: {
                        statSelector: playerSelector
                    },
                    compPct: {
                        statSelector: comppctSelector
                    },
                    yds: {
                        statSelector: ydsSelector
                    },
                    td: {
                        statSelector: tdsSelector
                    },
                    int: {
                        statSelector: intSelector
                    },
                    sacks: {
                        statSelector: sackSelector
                    }
                };
                $('td', row).each(function (colIndex, col) {
                    var team = defPass.team, compPct = defPass.compPct, yds = defPass.yds, td = defPass.td, int = defPass.int, sacks = defPass.sacks;
                    if (colIndex === playerSelector.statColIndex) {
                        var playerParentSelector = $(".".concat(playerSelector.statName), $(row));
                        team = __assign(__assign({}, team), { value: playerParentSelector.html().trim() });
                        defPass = __assign(__assign({}, defPass), { team: team });
                    }
                    else if (colIndex === comppctSelector.statColIndex) {
                        compPct = __assign(__assign({}, compPct), { value: +$(col).html().trim() });
                        defPass = __assign(__assign({}, defPass), { compPct: compPct });
                    }
                    else if (colIndex === ydsSelector.statColIndex) {
                        yds = __assign(__assign({}, yds), { value: +$(col).html().trim() });
                        defPass = __assign(__assign({}, defPass), { yds: yds });
                    }
                    else if (colIndex === tdsSelector.statColIndex) {
                        td = __assign(__assign({}, td), { value: +$(col).html().trim() });
                        defPass = __assign(__assign({}, defPass), { td: td });
                    }
                    else if (colIndex === intSelector.statColIndex) {
                        int = __assign(__assign({}, int), { value: +$(col).html().trim() });
                        defPass = __assign(__assign({}, defPass), { int: int });
                    }
                    else if (colIndex === sackSelector.statColIndex) {
                        sacks = __assign(__assign({}, sacks), { value: +$(col).html().trim() });
                        defPass = __assign(__assign({}, defPass), { sacks: sacks });
                    }
                });
                defPassStats = __spreadArray(__spreadArray([], defPassStats, true), [defPass], false);
            });
            return [2 /*return*/, Promise.resolve(defPassStats)];
        });
    });
}
exports.parseDefPassResponse = parseDefPassResponse;
