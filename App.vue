<script>
	export default {
		onLaunch: function() {
			// let token=uni.getStorageSync("uaa_token")
			// if(token == ""){
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:"未登录，请先登录"
			// 	})
			// 	uni.navigateTo({
			// 		url:"/pages/start/start"
			// 	})
			// }else{
			// 	let expireTime =uni.getStorageSync("token_expire_time")
			// 	if(expireTime <= Date.parse(new Date())){
			// 		uni.showToast({
			// 			icon:"none",
			// 			title:"登录已过期，请重新登录"
			// 		})
			// 		uni.navigateTo({
			// 			url:"/pages/start/start"
			// 		})
			// 	}
			// }
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	html,
	body {
		background-color: #ecebed;
	}

	* {
		margin: 0;
		padding: 0;
	}

	.center {
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.width {
		width: 95%;
	}

	.box {
		padding-top: 20px;
	}
</style>