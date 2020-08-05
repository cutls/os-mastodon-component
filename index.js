import * as React from 'react';
let json = localStorage.getItem('opensticker');
if (!json)
    json = '[]';
const data = JSON.parse(json);
setJson();
export default class OpenSticker extends React.Component {
    getBgColor(type) {
        if (type == 'mastodon')
            return `linear-gradient(90deg, #26a, transparent)`;
        if (type == 'pleroma')
            return `linear-gradient(90deg, #123, transparent)`;
        if (type == 'misskey' || type == 'misskeylegacy')
            return `linear-gradient(90deg, #444, transparent)`;
        if (type == 'pixelfed')
            return `linear-gradient(90deg, #fff, transparent)`;
    }
    getFontColor(type) {
        if (type == 'mastodon')
            return '#fff';
        if (type == 'pleroma')
            return '#da5';
        if (type == 'misskey' || type == 'misskeylegacy')
            return '#3c9';
        if (type == 'pixelfed')
            return '#000';
    }
    render() {
        const acct = this.props.acct;
        let domain;
        const m = acct.match(/.+@(.+)/);
        if (!m)
            return null;
        domain = m[1];
        let style = {};
        let name;
        if (data.length < 1)
            return React.createElement("div", null, "Please reload to show OpenSticker");
        for (const instance of data) {
            if (instance.domain != domain)
                continue;
            const bgColor = instance.bgColor;
            let bgColorCSS = '';
            if (bgColor) {
                bgColorCSS = '';
                for (let j = 0; j < bgColor.length; j++) {
                    const bg = bgColor[j];
                    bgColorCSS = bgColorCSS + bg + ',';
                }
                bgColorCSS = `linear-gradient(90deg, ${bgColorCSS} transparent)`;
            }
            else {
                bgColorCSS = this.getBgColor(instance.type);
            }
            let fontColor;
            instance.fontColor ? (fontColor = instance.fontColor) : (fontColor = this.getFontColor(instance.type));
            instance.name ? (name = instance.name) : (name = instance.domain);
            const bg = `no-repeat url('${instance.favicon}'),${bgColorCSS}`;
            style = {
                background: bg,
                color: fontColor,
                height: '15px',
                userSelect: 'none',
                fontWeight: 'bolder',
                textOverflow: 'ellipsis'
            };
            break;
        }
        if (name)
            return React.createElement("div", { style: style },
                React.createElement("span", { style: { marginLeft: '1rem' } }, name));
        return null;
    }
}
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
