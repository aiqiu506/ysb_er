<template>
	<view>
		<view class="home-section" style="padding: 0px 0px;">
			<view class="filter-content" v-for="(item, index) in menuList" :key="index" v-if="menuIndex == index">
				<view >
					<view class="filter-content-title">
						<text>{{item.detailTitle}}</text>
					</view>
					<view class="filter-content-detail">
						<text v-for="(detailItem,idx) in selectDetailList" :key="idx" class='filter-content-detail-item-default' 
						:style="{'background-color':detailItem.isSelected?themeColor:'#ffffff','color':detailItem.isSelected?'#FFFFFF':'#666666'}"
						 @tap="itemTap(idx,selectDetailList,item.key,detailItem.title,index)">
							{{detailItem.title}}
						</text>
					</view>
					<view class="filter-content-footer">
						<view class="filter-content-footer-item" style="color: #777777; background-color: #ffffff;" @tap="resetClick(selectDetailList,item.key)">
							<text>重置</text>
						</view>
						<view class="filter-content-footer-item" :style="{'color': '#ffffff', 'background-color': '#1296db'}" @tap="sureClick">
							<text>确定</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectArr: [],
				result: {},
				menuIndex: 0,
				selectDetailList: []
			};
		},
		props: {
			color: {
				type: String,
				default () {
					return '#666666'
				}
			},
			themeColor: {
				type: String,
				default () {
					return '#D1372C'
				}
			},
			menuList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed:{
			selectedObj() {
				let obj = {}
				for (let i = 0;i < this.menuList.length;i++) {
					let item = this.menuList[i];
					if (item.isMutiple) {
						obj[item.key] = [];
					} else{
						obj[item.key] = '';
					}
				}
				return obj;
			}
		},
		methods: {
			menuTabClick(index) {
				this.menuIndex = index;
				this.selectDetailList = this.menuList[index].detailList
			},
			itemTap(index, list, key,title,mIndex) {
						this.$emit("changeTxt",mIndex,title)
						list[0].isSelected = false
						this.selectedObj[key] = list[index].value;
						this.result = this.selectedObj;
						for (let i = 0; i < list.length; i++) {
							if (index == i) {
								list[i].isSelected = true
							} else {
								list[i].isSelected = false
							}
						}
					
				
			},
			resetSelected(list, key) {
				if (typeof this.result[key] == 'object') {
					this.result[key] = [];
				} else{
					this.result[key] = '';
				}
				for (let i = 0; i < list.length; i++) {
					if (i == 0) {
						list[i].isSelected = true;
					} else {
						list[i].isSelected = false;
					}
				}
			},
			sureClick() {
				this.$emit("confirm", this.result);
			},
			resetClick(list,key) {
				this.resetSelected(list,key)
			}
		}
	}
</script>

<style>
	.filter-content {
		background-color: #F6F7F8;
	}

	.filter-content-title {
		border-bottom: #EEEEEE 1px solid;
		padding: 10px 15px;
		font-size: 13px;
		color: #999999;
	}

	.filter-content-detail {
		padding: 5px 15px;
	}

	.filter-content-detail-item-active {
		background-color: #D1372C;
		color: #1296db;
		padding: 5px 15px;
		border-radius: 20px;
		margin-right: 10px;
		margin-top: 10px;
		display: inline-block;
	}

	.filter-content-detail-item-default {
		background-color: #1296db;
		color: #666666;
		padding: 5px 15px;
		border-radius: 20px;
		margin-right: 10px;
		font-size: 13px;
		margin-top: 10px;
		display: inline-block;
	}

	.filter-content-footer {
		display: flex;
		font-size: 13px;
		justify-content: space-between;
		width: 100%;
		height: 45px;
		margin-top: 10px;
	}

	.filter-content-footer-item {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.filter-content-list {

		padding: 5px 15px;
	}

	.filter-content-list-item-default {
		color: #666666;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-default text {
		width: 90%;
		font-size: 13px;
		display: inline-block;
	}

	.filter-content-list-item-active {
		color: #D1372C;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-active text {
		font-size: 13px;
		width: 90%;
		display: inline-block;
	}

	.filter-content-list-item-active:after {
		content: '✓';
	}
</style>
