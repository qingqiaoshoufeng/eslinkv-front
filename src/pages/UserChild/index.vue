<template lang="pug">
e-layout
	.user-child-container
		i-table(:columns="columns", :data="tableData")
			template(#createTime="{row}")
				span {{ $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') }}
			template(#password="{row}")
				.content {{ row.isSecretKeyShow ? row.password : row.password.replace(/./g, '*') }}
					.show.pointer(@click="row.isSecretKeyShow = !row.isSecretKeyShow") {{ row.isSecretKeyShow ? '隐藏' : '显示' }}
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import { childList } from '@/api/user.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
	},
})
export default class SecretKey extends Vue {
	tableData = []
	columns = [
		{
			title: '创建时间',
			key: 'userName',
		},
		{
			title: '账号昵称',
			key: 'userNickName',
		},
		{
			title: '账号密码',
			slot: 'password',
		},
	]

	async getList() {
		let res = await childList()
		res = res.map(v => {
			v.isSecretKeyShow = false
			return v
		})
		this.tableData = res
	}

	async mounted() {
		await this.getList()
	}
}
</script>
<style lang="scss" scoped>
.user-child-container {
	padding: 15px;
}

.content {
	position: relative;
	min-width: 290px;
	font-size: 12px;
	height: 32px;
	background-color: #f5f7fa;
	color: #adbcd9;
	border-radius: 4px;
	padding: 6px 12px;
	border: 1px solid #e9edf4;

	.show {
		position: absolute;
		z-index: 2;
		right: 4px;
		top: 7px;
		width: 33px;
		height: 18px;
		line-height: 18px;
		color: #fff;
		font-size: 12px;
		padding: 0;
		text-align: center;
		background-color: #b8c7e6;
		border-radius: 3px;
		user-select: none;
	}
}
</style>
