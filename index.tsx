import React from 'react'

interface IOpenSticker {
	type: 'mastodon'|'pleroma'|'misskey'|'misskeylegacy'|'pixelfed'
    name: string | null,
    bgColor?: string[] | null,
    fontColor?: string | null,
    favicon: string,
    withoutCDN: string,
    domain: string,
    isDefault: boolean
}
interface OSCSS {
	background: string,
	color: string
}
const data = JSON.parse(localStorage.getItem('opensticker')) as IOpenSticker[]
setJson()
type Props = {
	acct: string
}
export default class OpenSticker extends React.Component<Props, {}> {
	getBgColor(type: 'mastodon'|'pleroma'|'misskey'|'misskeylegacy'|'pixelfed') {
		if(type == 'mastodon') return `linear-gradient(90deg, #26a, transparent)`
		if(type == 'pleroma') return `linear-gradient(90deg, #123, transparent)`
		if(type == 'misskey' || type == 'misskeylegacy') return `linear-gradient(90deg, #444, transparent)`
		if(type == 'pixelfed') return `linear-gradient(90deg, #fff, transparent)`
	}
	getFontColor(type: 'mastodon'|'pleroma'|'misskey'|'misskeylegacy'|'pixelfed') {
		if(type == 'mastodon') return '#fff'
		if(type == 'pleroma') return '#da5'
		if(type == 'misskey' || type == 'misskeylegacy') return '#3c9'
		if(type == 'pixelfed') return '#000'
	}
	render() {
		const acct = this.props.acct
		let domain
		const m = acct.match(/.+@(.+)/)
		if(m.length < 2) return null
		domain = m[1]
		let style = {} as OSCSS
		let name
		for(const instance of data) {
			if(instance.domain != domain) continue
			const bgColor = instance.bgColor
			let bgColorCSS = ''
			if (bgColor) {
				bgColorCSS = ''
				for (let j = 0; j < bgColor.length; j++) {
					const bg = bgColor[j]
					bgColorCSS = bgColorCSS + bg + ','
				}
				bgColorCSS = `linear-gradient(90deg, ${bgColorCSS} transparent)`
			} else {
				bgColorCSS = this.getBgColor(instance.type)
			}
			let fontColor
			instance.fontColor ? fontColor = instance.fontColor : fontColor = this.getFontColor(instance.type)
			instance.name ? name = instance.name : name = instance.domain
			const bg = `no-repeat url('${instance.favicon}'),${bgColorCSS}`
			style = {
				background: bg,
				color: fontColor
			}
			break
		}
		return <div style={style}>{name}</div>
	}
}
async function setJson() {
	const promise = await fetch('https://s.0px.io/json')
	const json = await promise.json()
	localStorage.setItem('opensticker', JSON.stringify(json.data))
}
