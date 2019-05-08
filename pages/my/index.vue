<template>
	<view class="content">
		<scroll-view style="width:100%;height: 100%;" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore" @scroll="scrollTopFun">
			<view class="fliter-content">
				<view class="fliter-item" :class="[tabIndex == 0 ? 'active-fliter-item' : '']" @click="tapTab(0)">
					<view class="fliter-item-name" v-text="param.statusTxt"></view>
					<view class="fliter-item-icon"></view>
				</view>
				<view class="fliter-item" :class="[tabIndex == 1 ? 'active-fliter-item' : '']" @click="tapTab(1)">
					<view class="fliter-item-name" v-text="param.dateTxt"></view>
					<view class="fliter-item-icon"></view>
				</view>
				<view class="fliter-item" :class="[tabIndex == 2 ? 'active-fliter-item' : '']" @click="tapTab(2)">
					<view class="fliter-item-name" v-text="param.typeTxt"></view>
					<view class="fliter-item-icon"></view>
				</view>
			</view>
			<view class="list-content">
				<nList :urls="goUrl" :list="dataList"></nList>
				<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>
			</view>
		</scroll-view>
		<view class="fliter-dialog" v-show="dialog == 0">
			<view class="fliter-dialog-content">
				<view
					class="fliter-dialog-item"
					:class="{ active: param.statusVal == item.id }"
					v-for="(item, index) in tabNar[0].item"
					:key="index"
					@click="dialogTap('status', item)"
					v-text="item.value"
				></view>
			</view>
		</view>
		<view class="fliter-dialog" v-show="dialog == 1">
			<view class="fliter-dialog-content">
				<view
					class="fliter-dialog-item"
					:class="{ active: param.dateVal == item.id }"
					v-for="(item, index) in tabNar[1].item"
					:key="index"
					@click="dialogTap('date', item)"
					v-text="item.value"
				></view>
			</view>
		</view>
		<view class="fliter-dialog" v-show="dialog == 2">
			<view class="fliter-dialog-content">
				<view
					class="fliter-dialog-item"
					:class="{ active: param.typeVal == item.id }"
					v-for="(item, index) in tabNar[2].item"
					:key="index"
					@click="dialogTap('type', item)"
					v-text="item.value"
				></view>
			</view>
		</view>
		<view class="bg" v-show="bgShow" @click="clear"></view>
	</view>
</template>

<script>
import nList from '@/components/orderList.vue';
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
			scrollTop: 0,
			goUrl: '',
			top: 0,
			tabIndex: null,
			dialog: null, // 筛选面板
			bgShow: false, // 背景显示参数
			loadingType: 2,
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			param: {
				token: '',
				PSize: 20,
				PIndex: 1,
				statusVal: 0,
				statusTxt: '',
				dateVal: 0,
				dateTxt: '',
				typeVal: 0,
				typeTxt: ''
			},

			tabNar: [
				{
					value: 'one',
					name: '默认',
					item: [
						{ id: 0, value: '默认' },
						{ id: 1, value: '待支付' },
						{ id: 2, value: '匹配中' },
						{ id: 3, value: '待开工' },
						{ id: 4, value: '工作中' },
						{ id: 5, value: '待结算' },
						{ id: 7, value: '已完成' },
						{ id: -1, value: '已取消' },
						{ id: 9, value: '异常' }
					]
				},
				{
					value: 'two',
					name: '最近一个月',
					item: [{ id: 0, value: '今天' }, { id: 1, value: '近一周' }, { id: 2, value: '近一个月' }, { id: 2, value: '近一年' }]
				},
				{
					value: 'three',
					name: '小时工',
					item: [{ id: 0, value: '全部' }, { id: 1, value: '小时工' }, { id: 2, value: '随时工' }]
				}
			],
			dataList: []
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'apiUrl']),
	onLoad() {
		
	},
	onShow() {
		this.LoginOut();	
	},
	methods: {
		
		init(e) {
			this.requestData(0, 10);
		},
		// 监听滑动事件
		scrollTopFun(e) {
			let _this = this;
			_this.top = e.detail.scrollTop;
			_this.scrollTop = e.detail.scrollTop;
		},
		// 加载更多
		loadMore(e) {
			let _this = this;
			let list = _this.dataList;
			_this.loadingType = 1;
			setTimeout(() => {
				let li = {
					img: '../../static/logo.png',
					title: '幻灯' + e.timeStamp.toString(),
					info: '简介',
					another: '额外',
					id: e.timeStamp.toString()
				};
				list.push(li);
				_this.loadingType = 0;
			}, 1200);
		},
		// 顶部点击事件
		async tapTab(e) {
			let _this = this;
			if (_this.tabIndex != e) {
				_this.tabIndex = e;
			}
			_this.dialog = e;
			_this.bgShow = true;
		},
		getDataList(e) {
			let _this = this;
			return new Promise((res, rej) => {
				// 请求数据逻辑
				_this.requestData(0, 10);
				setTimeout(function() {
					_this.scrollTop = _this.top;
					uni.hideLoading();
					res(e);
				}, 1000);
			});
		},
		requestData(page, limit) {
			uni.request({
				url: this.apiUrl + '/v1/order/status',
				method: 'POST',
				data: {
					status: this.param.statusVal,
					page: page,
					limit: limit
				},
				header: {
					Authorization: 'Bearer ' + this.param.token,
					'Content-Type': 'application/json; charset=utf-8'
				},
				success: re => {
					this.dataList = re.data.data;
				}
			});
		},
		async dialogTap(e, o) {
			let _this = this;
			uni.showLoading({
				title: '加载中'
			});

			_this.scrollTop = 0;
			switch (e) {
				case 'status':
					_this.param.statusVal = o.id;
					_this.param.statusTxt = o.value;
					break;
				case 'date':
					_this.param.dateVal = o.id;
					_this.param.dateTxt = o.value;
					break;
				case 'type':
					_this.param.typeVal = o.id;
					_this.param.typeTxt = o.value;
					break;
			}
			_this.tabIndex = null;
			_this.bgShow = false;
			_this.dialog = null;
			await this.getDataList(o);
		},
		clear() {
			let _this = this;
			_this.bgShow = false;
			_this.dialog = null;
		}
	}
};
</script>
<style lang="less">
.content {
	position: fixed;
	width: 100%;
	height: 100%;
	text-align: center;
	background: #f2f2f5;
	.fliter-content {
		position: fixed;
		font-size: 23upx;
		display: flex;
		width: 100%;
		align-items: center;
		background: #fff;
		padding: 10upx 0;
		border-bottom: 1upx solid #f2f2f5;
		z-index: 99;
		.fliter-item {
			border-right: 1upx solid #f2f2f5;
			color: #666;
			text-align: center;
			flex: 1;
			box-sizing: border-box;
			margin: 10upx 0;
			line-height: 1;
			.fliter-item-name {
				display: inline-block;
			}
			.fliter-item-icon {
				display: inline-block;
				border-top: 2upx solid;
				border-right: 2upx solid;
				width: 20upx;
				height: 20upx;
				border-color: #666;
				transform: rotate(-45deg);
				margin: 10upx auto auto 20upx;
			}
		}
		:last-child {
			border-right: 1upx solid #fff;
		}
		.active-fliter-item {
			color: red;
			.fliter-item-icon {
				border-color: red;
				transform: rotate(135deg);
			}
		}
	}
	.list-content {
		padding-top: 67upx;
	}
	.fliter-dialog {
		position: fixed;
		top: 78upx;
		width: 100%;
		background: #fff;
		max-height: 70%;
		overflow-y: auto;
		z-index: 99;
		box-sizing: border-box;
		.fliter-dialog-content {
			padding: 20upx;
			box-sizing: border-box;
			.fliter-dialog-item {
				color: #666;
				padding: 10upx;
				border-bottom: 1upx solid #f2f2f5;
			}
			:last-child {
				border-bottom: 1upx solid #fff;
			}
			.active {
				color: red;
			}
		}
	}
	.bg {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}
}
</style>
