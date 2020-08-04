"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var react_1 = require("react");
var data = JSON.parse(localStorage.getItem('opensticker'));
setJson();
var OpenSticker = /** @class */ (function (_super) {
    __extends(OpenSticker, _super);
    function OpenSticker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenSticker.prototype.getBgColor = function (type) {
        if (type == 'mastodon')
            return "linear-gradient(90deg, #26a, transparent)";
        if (type == 'pleroma')
            return "linear-gradient(90deg, #123, transparent)";
        if (type == 'misskey' || type == 'misskeylegacy')
            return "linear-gradient(90deg, #444, transparent)";
        if (type == 'pixelfed')
            return "linear-gradient(90deg, #fff, transparent)";
    };
    OpenSticker.prototype.getFontColor = function (type) {
        if (type == 'mastodon')
            return '#fff';
        if (type == 'pleroma')
            return '#da5';
        if (type == 'misskey' || type == 'misskeylegacy')
            return '#3c9';
        if (type == 'pixelfed')
            return '#000';
    };
    OpenSticker.prototype.render = function () {
        var acct = this.props.acct;
        var domain;
        var m = acct.match(/.+@(.+)/);
        if (m.length < 2)
            return null;
        domain = m[1];
        var style = {};
        var name;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var instance = data_1[_i];
            if (instance.domain != domain)
                continue;
            var bgColor = instance.bgColor;
            var bgColorCSS = '';
            if (bgColor) {
                bgColorCSS = '';
                for (var j = 0; j < bgColor.length; j++) {
                    var bg_1 = bgColor[j];
                    bgColorCSS = bgColorCSS + bg_1 + ',';
                }
                bgColorCSS = "linear-gradient(90deg, " + bgColorCSS + " transparent)";
            }
            else {
                bgColorCSS = this.getBgColor(instance.type);
            }
            var fontColor = void 0;
            instance.fontColor ? fontColor = instance.fontColor : fontColor = this.getFontColor(instance.type);
            instance.name ? name = instance.name : name = instance.domain;
            var bg = "no-repeat url('" + instance.favicon + "')," + bgColorCSS;
            style = {
                background: bg,
                color: fontColor
            };
            break;
        }
        return <div style={style}>{name}</div>;
    };
    return OpenSticker;
}(react_1["default"].Component));
function setJson() {
    return __awaiter(this, void 0, void 0, function () {
        var promise, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://s.0px.io/json')];
                case 1:
                    promise = _a.sent();
                    return [4 /*yield*/, promise.json()];
                case 2:
                    json = _a.sent();
                    localStorage.setItem('opensticker', JSON.stringify(json.data));
                    return [2 /*return*/];
            }
        });
    });
}
