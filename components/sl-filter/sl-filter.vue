<template>
	<view class="content">
		<view class="select-tab" :style="{height: tabHeight+'px'}">
			<view class="select-tab-item" :style="{width: itemWidth}" v-for="(item,index) in menuList" :key="index"  @tap="showMenuClick(index)">
				<text :style="{color: statusList[index].isActive?'#1296DB':'#666666'}">{{statusList[index].txt}}</text>
				<text class="arrows iconfont" :class="statusList[index].isActive?up:down"> </text>
			</view>
		</view>
		<popup-layer ref="popupRef" :direction="'bottom'" @close="close" :isTransNav="false"  :navHeight="navHeight"
		 :tabHeight="tabHeight">
			<sl-filter-view :themeColor="themeColor" :menuList="menuListTemp" ref="slFilterView" @changeTxt="chTxt" @confirm="filterResult"></sl-filter-view>
		</popup-layer>
	</view>

</template>

<script>
	import popupLayer from '@/components/sl-filter/popup-layer.vue';
	import slFilterView from '@/components/sl-filter/filter-view.vue';
	export default {
		components: {
			popupLayer,
			slFilterView
		},
		props: {
			menuList: {
				type: Array,
				default () {
					return []
				}
			},
			themeColor: {
				type: String,
				default () {
					return '#000000'
				}
			},
		},

		computed: {
			itemWidth() {
				return 'calc(100%/2)'
			},
			menuListTemp() {
				let arr = this.menuList;
				for (let i = 0; i < arr.length; i++) {
					let item = arr[i];
					for (let j = 0; j < item.detailList.length; j++) {
						let d_item = item.detailList[j];
						if (d_item.selected == true) {
							d_item.isSelected = true
						} else {
							d_item.isSelected = false
						}
					}
				}
				return arr;
			}
		},
		onReady() {
			let arr = [];
			for (let i = 0; i < this.menuList.length; i++) {
				arr.push({
					isActive: false,
					txt:this.menuList[i].title
				});
			}
			this.statusList = arr;
		},
		data() {
			return {
				down: 'icon-down',
				up:'icon-up',
				navHeight: 0,
				tabHeight: 40,
				statusList: []
			};
		},
		methods: {
			showMenuClick(index) {
				if (this.statusList[index].isActive == true) {
					this.$refs.popupRef.close();
					this.statusList[index].isActive = false
				} else {
					this.menuTabClick(index);
					this.$refs.popupRef.show()
				}
			},
			menuTabClick(index) {
				this.$refs.slFilterView.menuTabClick(index);
				for (let i = 0; i < this.statusList.length; i++) {
					if (index == i) {
						this.statusList[i].isActive = true;
					} else {
						this.statusList[i].isActive = false;
					}
				}
			},
			filterResult(val) {
				this.$refs.popupRef.close()
				this.$emit("result", val)
			},
			close() {
				for (let i = 0; i < this.statusList.length; i++) {
					this.statusList[i].isActive = false;
				}
			},
			chTxt(ind,txt){
				this.statusList[ind].txt=txt;
			}
		}
	}
</script>

<style>
	@import 'icon.css';
	.select-tab {
		border-bottom: #F7F7F7 1px solid;
		display: flex;
	}

	.arrows {
		margin-left: 5px;
	}

	.select-tab .select-tab-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.select-tab .select-tab-item text {
		color: #666666;
		font-size: 13px;
	}
	.select-tab .select-tab-item .icon-up{
		color:#1296DB;
	}
</style>
