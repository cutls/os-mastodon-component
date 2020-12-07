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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var json = localStorage.getItem('opensticker');
    if (!json)
        json = '[]';
    var data = JSON.parse(json);
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
            if (!m)
                return null;
            domain = m[1];
            var style = {};
            var name;
            if (data.length < 1)
                return React.createElement("div", null, "Please reload to show OpenSticker");
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
                instance.fontColor ? (fontColor = instance.fontColor) : (fontColor = this.getFontColor(instance.type));
                instance.name ? (name = instance.name) : (name = instance.domain);
                var bg = "no-repeat url('" + instance.favicon + "')," + bgColorCSS;
                style = {
                    background: bg,
                    color: fontColor,
                    height: '15px',
                    userSelect: 'none',
                    fontWeight: 'bolder',
                    overflow: 'hidden'
                };
                break;
            }
            if (name)
                return React.createElement("div", { style: style },
                    React.createElement("span", { style: { marginLeft: '1rem' } }, name));
            return null;
        };
        return OpenSticker;
    }(React.Component));
    exports.default = OpenSticker;
    function setJson() {
        fetch('https://s.0px.io/json')
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            if (json) {
                localStorage.setItem('opensticker', JSON.stringify(json.data));
            }
        });
    }
});
//# sourceMappingURL=index.js.map