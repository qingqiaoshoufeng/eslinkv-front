<template>
	<div>
		<Overlay
			v-for="(overlay, index) in projectOverlay"
			:key="index"
			:visable="!!overlay.isShow"
			:marker="overlay"
		/>
	</div>
</template>
<script>
import heatMapData from '@/assets/amap/json/heatMap.json';
import { Overlay } from '../../../components/';
import {
	PROJECTSITUATIONAWARENESSLIST,
	OVERLAYTYPEMAP,
} from '../../../config/index';
let propInfo = {
	content: {
		style: {
			fontSize: '24px',
		},
	},
	address: {
		style: {
			fontSize: '18px',
			color: '#fff',
		},
	},
	status: {
		style: {
			fontSize: '18px',
			color: '#00DDFF',
		},
		errColor: '#FF7217',
		formatter: row => {
			let { status, progress, stage, remainday, outday } = row;
			if (stage == '开工') {
				return status === 0
					? `剩余${remainday}天 进度${progress}`
					: `超期${outday}天 进度${progress}`;
			} else {
				return progress;
			}
		},
	},
};
export default {
	components: {
		Overlay,
	},
	data() {
		return {
			projectOverlay: [],
		};
	},
	created() {
		//获取数据
		this.getData();
	},
	beforeDestroy() {
		this.clearProjectMap();
	},
	methods: {
		getData() {
			this.projectOverlay = PROJECTSITUATIONAWARENESSLIST.map(project => {
				let { stage } = project;
				let { icon, type } = OVERLAYTYPEMAP[stage];
				project.icon = icon;
				project.overlayType = type;
				return project;
			});
		},
		clearProjectMap() {
			this.projectOverlay = [];
		},
	},
};
</script>

