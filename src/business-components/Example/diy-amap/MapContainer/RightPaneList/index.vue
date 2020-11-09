<template>
	<dashboard-panel
		:delay="0"
		:show="ready"
		:speed="500"
		:transition="true"
		class="right-panel"
		enter="animate__animated  animate__animatedfadeInRight"
	>
		<PanelContainer
			:activeItem="activeItem"
			@change="handleClick"
			:data="list"
		>
			<template slot-scope="{ item }">
				<component :is="rightPaneComponentName" :data="item" />
			</template>
		</PanelContainer>
	</dashboard-panel>
</template>

<script>
import { DashboardPanel } from '@/business-components/Example/diy-amap/components/';
import PanelContainer from './PanelContainer';
import HomeList from './HomeList';
import ProjectList from './ProjectList';
import ServiceList from './ServiceList';
//模拟数据
import {
	HOMESITUATIONAWARENESSLIST,
	SERVICESITUATIONAWARENESSLIST,
	PROJECTSITUATIONAWARENESSLIST,
} from '@/business-components/Example/diy-amap/config/index';

import bus from '@/business-components/Example/diy-amap/utils/bus';
export default {
	name: 'RightPanelList',
	components: {
		PanelContainer,
		HomeList,
		ProjectList,
		ServiceList,
		DashboardPanel,
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			ready: false,
			detailData: {},
			list: HOMESITUATIONAWARENESSLIST,
			rightPaneComponentName: 'HomeList',
			//配置不同页面  list 右侧列表
			pageConfig: {
				home: {
					list: HOMESITUATIONAWARENESSLIST,
					rightPaneComponentName: 'HomeList',
				},
				service: {
					list: SERVICESITUATIONAWARENESSLIST,
					rightPaneComponentName: 'ServiceList',
				},
				project: {
					list: PROJECTSITUATIONAWARENESSLIST,
					rightPaneComponentName: 'ProjectList',
				},
			},
		};
	},
	mounted() {
		this.initPage('home');
	},
	created() {
		bus.$on('currentSceneChange', val => {
			this.initPage(val);
		});
	},
	methods: {
		//切换页面切换配置
		initPage(pageName) {
			let config = this.pageConfig[pageName];
			if (!config) return false;
			this.currentSceneName = pageName;
			Object.keys(config).forEach(prop => {
				this[prop] = config[prop];
			});
			this.$nextTick(() => {
				this.ready = true;
			});
		},
		handleClick(item) {
			this.$emit('list-click', item);
		},
	},
	beforeDestroy() {
		bus.$off(['currentSceneChange']);
	},
};
</script>


<style lang="scss" scoped>
.right-panel {
	position: absolute;
	right: 32px;
	top: 200px;
	width: 480px;
	z-index: 1;
}
</style>
