<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" clearable focus v-model="account" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<m-input class="biaoti" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>

		</view>

		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>

		<view class="xieyi">
			<navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">注册账户</navigator>
		</view>
	</view>
</template>

<script>
	var tha;
	import {
		mapState
	} from 'vuex';
	import common from '../../common.js';
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		onLoad(option) {
			tha = this;
			this.goType = option.backtype;
			this.successUrl = option.backpage;
		},
		onShow() {
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				icon.hide();
			}
		},
		onReady() {},
		data() {
			return {
				account: '',
				goType: 'switchTab',
				successUrl: "",
				password: ''
			};
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'apiUrl']),
		methods: {
			...mapState(['login']),
			bindLogin() {
				if (this.account.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				uni.setStorage({
					key: 'userInfo',
					data: {
						account: this.account,
						userName: 'test'
					},
					success: () => {
						console.log('save storage success!');
					}
				})
				this.toMain(this.account);
				/*uni.request({
					url: this.apiUrl + "/v1/login",
					method: 'POST',
					data: {
						mobile: this.account,
						password: this.password
					},
					success: (res) => {
						if (res.data.status == 200) {
							//登录成功
							uni.setStorage({
								key: 'userInfo',
								data: res.data.data.userInfo,
								success: () => {
									console.log('save storage success!');
								}
							})
							this.toMain(this.account)
						} else {
							uni.showToast({
								icon: 'none',
								title: '用户账号或密码不正确',
							});
						}
					}
				});*/
			},
			toMain(userName) {
				this.login(userName);
				if (this.goType && this.successUrl) {
					if (this.goType == "redirectTo") {
						uni.redirectTo({
							url: this.successUrl
						})
					} else {
						uni.switchTab({
							url: this.successUrl
						})
					}

				} else {
					uni.switchTab({
						url: '../index/map'
					});
				}
				var icon = plus.nativeObj.View.getViewById("icon");
				if (icon) {
					icon.show();
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 60upx;
	}

	.header {
		width: 161upx;
		height: 161upx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		border-radius: 50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
	}

	.xieyi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.xieyi text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
