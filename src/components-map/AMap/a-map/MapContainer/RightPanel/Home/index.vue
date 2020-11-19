<template>
	<dashboard-panel
		:delay="0"
		:show="ready"
		:speed="500"
		:transition="true"
		class="right-panel"
		enter="animate__animated animate__fadeInRight"
	>
		<component :is="rightPaneComponentName" :data="list" />
	</dashboard-panel>
</template>

<script>
// import { DashboardPanel } from '../../components/';
// // import PanelContainer from './PanelContainer';
// import HomeList from './Home/';
// // import ProjectList from './ProjectList';
// // import ServiceList from './ServiceList';
// //模拟数据
// import {
// 	SERVICESITUATIONAWARENESSLIST,
// 	PROJECTSITUATIONAWARENESSLIST,
// } from '../../config/index';

// import bus from '../../utils/bus';
// export default {
// 	name: 'RightPanelList',
// 	components: {
// 		// PanelContainer,
// 		HomeList,
// 		// ProjectList,
// 		// ServiceList,
// 		DashboardPanel,
// 	},
// 	props: {
// 		activeItem: {
// 			type: Object,
// 			default() {
// 				return {};
// 			},
// 		},
// 	},
// 	data() {
// 		return {
// 			ready: false,
// 			detailData: {},
// 			list: [],
// 			rightPaneComponentName: 'HomeList',
// 			//配置不同页面  list 右侧列表
// 			pageConfig: {
// 				home: {
// 					rightPaneComponentName: 'HomeList',
// 				},
// 				service: {
// 					rightPaneComponentName: 'ServiceList',
// 				},
// 				project: {
// 					rightPaneComponentName: 'ProjectList',
// 				},
// 			},
// 		};
// 	},
// 	mounted() {
// 		this.initPage('home');
// 	},
// 	created() {
// 		bus.$on('currentSceneChange', val => {
// 			this.initPage(val);
// 		});
// 	},
// 	methods: {
// 		//切换页面切换配置
// 		initPage(pageName) {
// 			let config = this.pageConfig[pageName];
// 			if (!config) return false;
// 			this.currentSceneName = pageName;
// 			Object.keys(config).forEach(prop => {
// 				this[prop] = config[prop];
// 			});
// 			//请求数据
// 			let listByPageMap = {
// 				home: [],
// 				service: SERVICESITUATIONAWARENESSLIST,
// 				project: PROJECTSITUATIONAWARENESSLIST,
// 			};
// 			this.list = listByPageMap[pageName];
// 			this.$nextTick(() => {
// 				this.ready = true;
// 			});
// 		},
// 		handleClick(item) {
// 			this.$emit('list-click', item);
// 		},
// 	},
// 	beforeDestroy() {
// 		bus.$off(['currentSceneChange']);
// 	},
// };
</script>


<style lang="scss" scoped>
.right-panel {
	position: absolute;
	right: 32px;
	top: 148px;
	width: 480px;
	z-index: 1;
     max-height: 860px;
}
</style>
