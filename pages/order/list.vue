<template>
	<view class="content">
		<sl-filter :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
		<scroll-view style="width:100%;height: 100%;" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore" @scroll="scrollTopFun">
			<view class="list-content">
				<nList :urls="goUrl" :list="dataList"></nList>
				<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import nList from '@/components/orderList.vue';
import common from '../../common.js';
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
	components: {
		slFilter,
		nList,
		uniLoadMore
	},
	data() {
		return {
			themeColor: '',
			filterResult: '',
			goUrl: '',
			bgShow: false, // 背景显示参数
			loadingType: 2,
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			menuList: [
				{
					title: '默认',
					detailTitle: '请选择订单的状态',
					isMutiple: false,
					key: 'status',
					detailList: [
						{
							title: '默认',
							value: [2, 3, 4],
							selected: true
						},
						{
							title: '待支付',
							value: 1,
							selected: false
						},
						{
							title: '匹配中',
							value: 2,
							selected: false
						},
						{
							title: '待开工',
							value: 3,
							selected: false
						},
						{
							title: '工作中',
							value: 4,
							selected: false
						},
						{
							title: '已完成',
							value: 7,
							selected: false
						},
						{
							title: '已取消',
							value: -1,
							selected: false
						},
						{
							title: '异常',
							value: 9,
							selected: false
						}
					]
				},
				{
					title: '近一个月',
					key: 'date',
					isMutiple: false,
					detailTitle: '选择日期',
					detailList: [
						{
							title: '今天',
							value: 'day',
							selected: false
						},
						{
							title: '近一周',
							value: 'week',
							selected: false
						},
						{
							title: '近一个月',
							value: 'month',
							selected: true
						},
						{
							title: '近一年',
							value: 'year',
							selected: false
						}
					]
				},
				{
					title: '小时工',
					key: 'type',
					isMutiple: false,
					detailTitle: '请选择类型',
					detailList: [
						{
							title: '不限',
							value: 0,
							selected: false
						},
						{
							title: '小时工',
							value: 1,
							selected: true
						},
						{
							title: '随时工',
							value: 2,
							selected: false
						}
					]
				}
			]
		};
	},
	onLoad() {
		let loginStatus = this.checkLogin('../order/list', '');
		if (!loginStatus) {
			return false;
		}
		this.requestData();
	},
	onHide() {
		// var icon = plus.nativeObj.View.getViewById('icon');
		// if (icon) {
		// 	icon.hide();
		// }
	},
	onShow(){
		// var icon = plus.nativeObj.View.getViewById('icon');
		// if (icon) {
		// 	icon.show();
		// }
	},
	methods: {
		requestData() {
			uni.request({
				url: this.apiUrl + '/v1/order/status',
				method: 'POST',
				data: {},
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token'),
					'Content-Type': 'application/json; charset=utf-8'
				},
				success: re => {
					this.dataList = re.data.data;
				}
			});
		},
		result(val) {
			console.log('filter_result:' + JSON.stringify(val));
			this.filterResult = JSON.stringify(val, null, 2);
		}
	}
};
</script>
