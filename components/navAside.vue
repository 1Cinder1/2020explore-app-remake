<template>
	<view class="aside">
		<view class="bgw"></view>
		<view class="list">
			<view class="item">
				<navigator url="../home/home" open-type="redirect">
					<u-icon name="home" labelColor="#ffffff" color="#ffffff" size="20" label="主页"></u-icon>
				</navigator>
			</view>
			<view class="item">
				<navigator url="../index/index" open-type="redirect">
					<u-icon name="eye-fill" labelColor="#ffffff" color="#ffffff" size="20" label="发现"></u-icon>
				</navigator>
			</view>
			<view class="item">
				<navigator url="../history/history" open-type="redirect">
					<u-icon name="clock" labelColor="#ffffff" color="#ffffff" size="20" label="历史"></u-icon>
				</navigator>
			</view>
			<view class="item">
				<navigator url="../like/like" oepn-type="redirect">
					<u-icon name="heart" labelColor="#ffffff" color="#ffffff" size="20" label="收藏"></u-icon>
				</navigator>
			</view>
			<view class="item">
				<navigator url="../settings/settings">
				<u-icon name="setting" labelColor="#ffffff" color="#ffffff" size="20" label="设置"></u-icon>
				</navigator>
			</view>
			<view class="item">
				<u-icon name="question-circle" labelColor="#ffffff" color="#ffffff" size="20"
					label="帮助"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navAside",
		data() {
			return {

			};
		},
		methods: {}
	}
</script>

<style scoped>
	.aside {
		position: absolute;
		background-color: rgba(171, 158, 251, 0.95);
		height: 100vh;
		width: 100vw;
		z-index: 1;
	}

	.list {
		margin: 70px 10px 0;
	}

	.item {
		color: rgb(255, 255, 255);
		font-family: Inter;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 24px;
		margin-top: 30px;
	}

	.item:hover {
		cursor: pointer;
	}

	.bgw {
		float: right;
		width: 300px;
		height: 600px;
		margin-right: -120px;
		margin-top: 300px;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.65);
	}
</style>