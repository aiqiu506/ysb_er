<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
		   uni.setTabBarBadge({
			  index: 0,
			  text: '1'
		   })
		   this.CreateIcon();
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
