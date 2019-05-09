<template>
	<view>
		<view class="header" :class="{ status: isH5Plus }">
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">工分:{{ userinfo.integral }}</view>
				</view>
			</view>
			<view class="setting"><image src="../../static/setting.png"></image></view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="money">
					<text class="moneyT">可用余额(元）</text>
					<text class="moneyNum">1000.00</text>
				</view>
				<view class="btn">
					<view class="label" hover-class="hover"><button class="mini-btn" type="primary" size="mini">提现</button></view>
					<view class="label" hover-class="hover"><button class="mini-btn" type="default" size="mini">充值</button></view>
				</view>
			</view>
		</view>
		<view class="list" v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="icon"><image :src="'../../static/' + li.icon"></image></view>
				<view class="text">{{ li.name }}</view>
				<image class="to" src="../../static/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
import common from '../../common.js';
export default {
	data() {
		return {
			//#ifdef APP-PLUS
			isH5Plus: true,
			//#endif
			//#ifndef APP-PLUS
			isH5Plus: false,
			//#endif
			userinfo: {},
			severList: [
				[{ name: '我的工分', icon: 'point.png', url: '/pages/my/workpoint' }],
				[{ name: '我的邀请', icon: 'invite.png', url: '/pages/my/workpoint' }],
				[{ name: '安全中心', icon: 'safe.png', url: '/pages/my/workpoint' }],
				[{ name: '在线客服', icon: 'kefu.png', url: '/pages/my/workpoint' }],
				[{ name: '意见反馈', icon: 'feedback.png', url: '/pages/my/workpoint' }]
			]
		};
	},
	onLoad() {
		//加载
		this.init();
	},
	onShow() {
		// var icon = plus.nativeObj.View.getViewById('icon');
		// if (icon) {
		// 	icon.show();
		// }
	},
	onHide() {
		// var icon = plus.nativeObj.View.getViewById('icon');
		// if (icon) {
		// 	icon.hide();
		// }
	},
	methods: {
		init() {
			//用户信息
			this.userinfo = {
				face: '../../static/face.jpeg',
				username: '用户1234',
				integral: '1435'
			};
		},
		//用户点击订单类型
		toOrderType(index) {},
		//用户点击列表项
		toPage(list_i, li_i) {
			uni.navigateTo({
				url: this.severList[list_i][li_i].url
			});
			// uni.showToast({ title: this.severList[list_i][li_i].name });
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.header {
	&.status {
		padding-top: var(--status-bar-height);
	}
	background-color: #1296db;
	width: 92%;
	height: 30vw;
	padding: 0 4%;
	display: flex;
	align-items: center;
	.userinfo {
		width: 90%;
		display: flex;
		.face {
			flex-shrink: 0;
			width: 15vw;
			height: 15vw;
			image {
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		.info {
			display: flex;
			flex-flow: wrap;
			padding-left: 30upx;
			.username {
				width: 100%;
				color: #fff;
				font-size: 40upx;
			}
			.integral {
				display: flex;
				align-items: center;
				padding: 0 20upx;
				height: 40upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 20upx;
				font-size: 24upx;
			}
		}
	}
	.setting {
		flex-shrink: 0;
		width: 6vw;
		height: 6vw;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.hover {
	background-color: #eee;
}
.orders {
	background-color: #1296db;
	width: 92%;
	height: 11vw;
	padding: 0 4%;
	margin-bottom: calc(11vw + 40upx);
	display: flex;
	align-items: flex-start;
	border-radius: 0 0 100% 100%;
	margin-top: -1upx;
	.box {
		width: 98%;
		padding: 0 1%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		margin-bottom: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		.money {
			width: 50%;
			padding-left: 20px;
			.moneyT {
				width: 100%;
				display: block;
				font-size: 22upx;
				color: #666666;
			}
		}
		.btn {
			width: 50%;

			.label {
				display: inline-block;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				margin-left: 10px;
				color: #666666;
				font-size: 26upx;
				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;
					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}
					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
			}
		}
	}
}
.list {
	width: 100%;
	font-size: 30upx;
	border-bottom: solid 26upx #f1f1f1;
	.li {
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: solid 1upx #e7e7e7;
		display: flex;
		align-items: center;
		&.noborder {
			border-bottom: 0;
		}
		.icon {
			flex-shrink: 0;
			width: 50upx;
			height: 50upx;
			image {
				width: 50upx;
				height: 50upx;
			}
		}
		.text {
			padding-left: 20upx;
			width: 100%;
			color: #666;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
