<template lang="pug">
e-layout.help-container
	ul.fn-flex.flex-column
		li.fn-flex.flex-row(v-for="item in list")
			img.help-img(:src="item.icon")
			.help-right.fn-flex.flex-column
				h2 {{ item.title }}
				.help-list.fn-flex(:class="item.className")
					a(
						rel="nofollow",
						v-for="child in item.list",
						target="_blank",
						:href="child.url") {{ child.title }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import common from '@/store/common.store'

@Component
export default class Help extends Vue {
	list = [
		{
			icon:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAQlBMVEVOuP8AAAA1pftfv/9Ru/9Ruv9Ruf9Ut/9StP9atP8lkvcnlfg3pv8un/wkkvgmk/kmlPj///8kkfdksfrn8/9jsfrt57QGAAAAEXRSTlMkAEQDGhQeEAsI6rI8WPDJvSke9ycAAAJUSURBVGje7drbTsMwDAbgnzlO0o1xCPD+r0oZsFLcNmerQ/w3u5o+qWrd1DbuMkLesbHWYsz4Y9h5yvl/MjY4g8UYNzTFSEACpEaYN0iI8fUYMZLDVIpJqp5DJSW5MsyhKK4AGywKY4dcjFERzsLIoiqW0jGP6vhUjNEgnIYZNIlJwGiyajWSmLS6aZBWJ01iwqrUBCasHprEGM3Da5hHh/hljNAltIhZzHJ/OobEHE/365hdwviX9RAy8rChscQGzHMKb6/PiXl9CyesZxCYxTzHMFlxLRyRcCGxdgYI4TkjIWAjbo4RemKgGcZ9Mf6JEfpioB8Y98Z4wgi9MdAV42osWk34iqEai1eTb8y3wA5fOT8uVxP/hZmG2KgtVxPziRGaYoeVm4UumNPB3AUzUewlLOYlCzMXDDoYPrABOpcRw4g5LcyNmNHCzIhBCxsp0sMIXg/zcHqYA+thDAOthxoGVg+zW1g0+8agh+Efa4L94btR86FWLVeqhVj1FaP78iQ9jDQPPKpHOdVDqvbx+04Lmz6Z+mNG9WNQ/TN3uo5VLcAYZkRrory5+RTDvGi6lLdtzzFMtJOKG9JPo7WN8RWjzYPPISUxjEQLsB/GornZESPRtu2HsWhId8RItNr7YU4MEfphVo5H+mFDdPAz1chzFiWbmxwfaU018jFHk21bGxnWyRpZMd6i6BhS1sjSwZ3fw4C1x+h4L0Px5uP+/SwytNQM7Wv5pNlazR4XhlqsQu11yatyfW3fi3nFK4e3sEyZyzHd0gJs8mrvbS4tt1rHfgflitTE377tLgAAAABJRU5ErkJggg==',
			title: '产品介绍',
			className: 'flex-row',
			list: [
				{
					title: '产品简介',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/ecgg9g',
				},
				{
					title: '谁在使用',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/fluu55',
				},
				{
					title: '特色优势',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/es6xmg',
				},
				{
					title: '版本及兼容',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/dh5k1g',
				},
				{
					title: '建议及反馈',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/fwydgu',
				},
			],
		},
		{
			icon:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAflBMVEVOuP8AAABRuf9fv/9Ru/9Suv9Quv9Ut/9Pu/9Vtf9Rr/8lkvg4pv5SuP9gv/8lkvcmk/gynfwmkvcmk/gnlfgunPopl/otl/glkvgkkvgkkvcnlPj///8kkffH4/1ksfq53P18vfo9nvjn8/+u1/yZzPuMxftstvpfr/lRqPk9GXwkAAAAHHRSTlMkACIDHRQaEBYMCf4/GQjptlTm1bJljv707+y8Eku+IwAAAt9JREFUaN7V2tl24jAMBmAhecnCOtB9VJZu0/d/wclkSk3bxNjY6IT/jtx8B9vkYEkwighVVhulEAEQlTLaVjSKSDBWWYPQETS2yorRAdQDUiasnEBAJmU6RhohMKgpAXNUJg58VAHRKeg0zCKcELQnYFMFJ0ZNYzENCdFRGClIiqJwrERIDJahmIYM0WFYAVlSBGBkIFMMeTH/0Ug/JuCz0jUvZiBrjA8rIHOKfkxD9ug+rIQzpOzGCOEMQerEug7i4mHGx/LryqupA8y7Yde1B3Fa4LY5bNr1vep6u3k8FmbwZ+owzyI+8NaDBGPqO2ahIzPe5MDAfsUIz4khOaz31cFpy+hSHGIEPVjaAXGhA0z3YFGZrca9mHYYYQrmcterIX1iGvqw3xF5WvPK/9VaDJMwp/GsF8M9VkIS5uI7KuUHNpHAJv8xAgkMqMWsDGZbzMhgpsVQBsN/WAUyGFQNZqUw22BGCjMNhlIYjoBACmuoSg6rwAZha/6R9efzdSBmQcthGozcMhpQcpiSxVAOQ1kMBDAXuaMPgBmwYe7ZBf3OHncRd2yV+LraxdyxDegkjDniCqXBymEWqoSjH4lVQHIYwQillhHbv3JCmGkwK4XZBquksKq9WMhguL8ySWCmxawMZluMZDDaX+AFsMm+NCGBla7ocnYMXTnp/Jj2FMpyY0ieEmBuTHuKm9kx8pRtc2NFUEH6KQuGFFBqX/H6KRB73e1eezEb0kQY3/GR7LE3bvLWgylve8Rpq1kItnlnruua3zed2NTT+IlJiz3v+H4BsLjn3XMHpj0trWjs5YaX43Ydlnzz8gNT6c06h21rnsNH5lxvv2FI2dqQNf/h+vqg4dY+8LUhE7ZtyXx7BQe5umVegovO2Doez+eLH0/G7lMxlKZ49nb/cAYZ8o5oDGv4JNtYzRAHhnKMQg11yCtxfG3Yg3knjxxewjBl/JjoJQ3ABo/2XubQcq5x7L+tZXmsoXZlWwAAAABJRU5ErkJggg==',
			title: '操作指南',
			className: 'flex-row',
			list: [
				{
					title: '基础概念',
					url:
						'https://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/hws62i',
				},
				{
					title: '导入导出',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/pbdv1b',
				},
				{
					title: '分享大屏',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/kppgub',
				},
				{
					title: '键盘/鼠标快捷键',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/bczz0o',
				},
			],
		},
		{
			icon:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAzFBMVEVOuP8AAABSuv9Suv9Quv9Qu/9kuf9Vzf9Tt/9VtP9Suf9Pu/9Vtf8nlfglk/k3pv8lkvcmk/gkkvgpl/pSuP9VuP8kkvglkvg3pvtDrv80nvxHt/8nlfklk/gzn/oomPormvounfomlPg6pvtKtf////8kkffH4/0xmPj0+v8plPhlsvp2u/vo9P/U6f5Tqfnf7/6Nxvs8nfm73f202v1gr/pbrfp+v/tGo/lMpfk3m/j3+//N5v6j0fzw+P/k8v/b7f6bzvyUyvyq1PwWaDCFAAAAJXRSTlMkACIUHBoEAw8JHxYMssc86cL1iRkS8N5EME8no+NYkHdmzEIme3iCOwAAA/tJREFUaN7c1EtugzAUheHTe/0EojCA7CDuAEWZdP9rq5umQSFAbLA96D9Hn4SOLz4iUtawFFVFAFWVkGysivk+GLO9JMxEsrdJMW1GaB40OhHWdAioa/ZjmgmBEetdmBqpME5txlSN6Gq1DTOEDZHZgFmBjQkbizF2xFGYEtiVUOFYQ9gZNaEYI0EchtVIUh2AaYlESf0O0wLJElMNOaxRW8UkkibXsBqJq5cxRvJ4CWuQoWYeU4QMkZrFBLIk5jBGpvgVs8iWfcEEsiWmmMFzx0PrgmsPR6xlnjFFE+vkojodQxaJ+dNxcMPlHNxlcId3h2TEFCa1zlsRmmuxmhqx19k7d47KOazGI6YpN0b6gTFyY+AHRvkx+sMa5MfQ3LGuBNb9Yhr7sYBrom+YSYAFXBNzw2QS7PPe13XhmsgbRikxry1cE/rBLFJivqWxWI/1pbDeY/I9NriFhhhMeoxKYfQBBaSb/nUN85Qth1kYlBqIp7gcxpDlMAlRDhOoymFVWYyw8VEP0dMnoBzmK/cbASqH0T9e43e1Zt6jJhCGcVK7dpOmJEBaxWO7PebZYbTKIQh4re33/04Nhw5s4jvrwib4+4cQE8nMvPOeD3Gp20kLJB8Jd9VSwiO5a9ERz7miMOy1F2I8Zcl73yh4uscw5jwOjy7wFOK7qmvQIC1YRKjwtMQPjaZPJTw0a4DPA9dx3CA7rSjCo6JqIlI5mn0E4TmsxPEEhGob72SSemUBH8Ff1PbUB75oJF9l+n1da2IN/8Xvf3xMFfYhC4uLTReRbFnJKhQoEcW6tjOfL3fF2gRG9JHJkoloJ/FiEc9LSDyWsRNiGaYIWYYHnTyyshgksfXin7ccU8vWMobgTv55kRwY28yRr83hGFINLFnmEjwgznaJw7C1AgtzljFHvpmbdFm+WtplPskCnuD3NxzY3q8Ym4GAZcQxywl5/ghgqAp4dSPawIrN8HOsnRjALZbyt7wHaeG9MFC2JjJ7JLGwXtV8uQmHVTiIWXG1YRK2KNtJqkNL8ahd+tg+wVb5sV61UUZhm5BWLbexZJPgyOQ2Khpl6qUZMH/V34OqM8lPjjaQXq25SfIwldFDmn4Jj/IHbfp9om1LIC91wXOxMPpSfyYa0kp0ePLMWAbprj706VY7zQhicT6yNVM54vtmQ4TJOcSk4KcQMyGGCE3GI2P9FDz/JbsyeOpjYjzSaPBj6y/TAt0mzL7hSGs8qSc8kzGxic2HdSMdZ/QRMRppZww5tIyBaQ4Ma0h4+y4MWN9jdNyVoXjr4/7uCBnalWh0S3zSmqymi4KhNqRQXRV5NZSvdVuY92bJ4S2IKa+Xid6SAPbV0t7bFC23Jcf+D5i5zHLsb8ZQAAAAAElFTkSuQmCC',
			title: '常见问题',
			className: 'flex-column',
			list: [
				{
					title: '可视化应用性能优化建议',
					url:
						'https://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/kgzi5o',
				},
				{
					title: 'API对接规范建议',
					url:
						'https://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/rw0qg8',
				},
				{
					title: '我的自定义组件打包过大，怎么处理？',
					url:
						'https://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/awvtx2',
				},
				{
					title: '如何使用组件自定义配置？',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/idz8u9',
				},
				{
					title: '如何使用外部插件？',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/iivic4',
				},
				{
					title: '如何添加自定义事件？',
					url:
						'https://www.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/mlp65z',
				},
				{
					title: '如何添加预置事件？',
					url:
						'https://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/wsh7ex',
				},
			],
		},
	]
	mounted(): void {
		common.actions.setNavIndex('/help/EslinkV')
	}
}
</script>
<style lang="scss" scoped>
.help-container {
	ul {
		padding: 60px;
	}
	li {
		margin-bottom: 80px;
	}
}
.help-img {
	width: 54px;
	height: 54px;
	margin-right: 24px;
}
.help-right {
	flex: 1;
	h2 {
		font-size: 16px;
		color: #333333;
		margin-bottom: 12px;
		width: 100%;
	}
	a {
		margin-right: 30px;
		font-size: 14px;
		margin-bottom: 12px;
	}
}
</style>
