<template lang="pug">
  e-layout
    .secret-ket-container 密钥管理
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'

@Component
	export default class SecretKey extends Vue {
		mounted () {
		  // todo
      // 获取当前用户密钥列表
      // 参考七牛云，密钥管理UI
      // 如果length===0 显示友好提示让我们创建第一个密钥吧

      // 功能：创建、停用、启用
      // list：创建时间 	AccessKey/SecretKey 		状态	操作

		}
	}
</script>
<style lang="scss" scoped>
</style>
