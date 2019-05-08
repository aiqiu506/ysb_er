<template>
	<view class="content">
		<sl-filter :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
	</view>
</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	export default {
		components: {
			slFilter
		},
		data() {
			return {
				themeColor: '',
				filterResult: '',
				menuList: [{
						'title': '默认',
						'detailTitle': '请选择订单的状态',
						'isMutiple': false,
						'key': 'status',
						'detailList': [{
								'title': '默认',
								'value': [2,3,4]
							},
							{
								'title': '待支付',
								'value': 1
							},
							{
								'title': '匹配中',
								'value': 2
							},
							{
								'title': '待开工',
								'value': 3
							},
							{
								'title': '工作中',
								'value': 4
							},
							{
								'title': '已完成',
								'value': 7
							},
							{
								'title': '已取消',
								'value': -1
							},
							{
								'title': '异常',
								'value': 9
							}
						]

					},
					{
						'title': '近一个月',
						'key': 'date',
						'isMutiple': false,
						'detailTitle': '选择日期',
						'detailList': [{
								'title': '今天',
								'value': 'day'
							},
							{
								'title': '近一周',
								'value': 'week'
							},
							{
								'title': '近一个月',
								'value': 'month'
							},
							{
								'title': '近一年',
								'value': 'year'
							}
						]

					},
					{
						'title': '小时工',
						'key': 'type',
						'isMutiple': false,
						'detailTitle': '请选择类型',
						'detailList': [{
								'title': '不限',
								'value': 0
							},
							{
								'title': '小时工',
								'value': 1
							},
							{
								'title': '随时工',
								'value': 2
							}
							
						]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2)
			}
		}
	}
</script>