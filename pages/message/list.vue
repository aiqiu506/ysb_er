<template>
	<view>
	<view class="list-content">
				<nList :urls="goUrl" :list="dataList"></nList>
				<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>
	</view>
	</view>
</template>

<script>
import nList from '@/components/msgList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import common from '../../common.js';
import { mapState } from 'vuex';

export default {
	components: {
		nList,
		uniLoadMore
	},
	data() {
		return {
			dataList:[],
			loadingType: 2,
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
		};
	},
	onLoad() {
		common.showIcon();
	}
};
</script>

<style></style>
