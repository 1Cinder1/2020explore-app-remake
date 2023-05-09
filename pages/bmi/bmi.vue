<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<u-icon name="arrow-left" size="19" @click="backOne"></u-icon>
				<view class="nav-pic">
					<u-image class="img" src="../../static/icon/heartWhite.png" width="16" height="16"></u-image>
				</view>
				<view class="text">
					<view class="">Bmi</view>
					<view class="">体重指数</view>
				</view>
			</view>
		</view>
		<view class="pic">
			<view class="text">
				<view class="title">
					体重指数
				</view>
				<view class="context">
					<view class="data">20.4</view>
					<view class="percent">
						<img width="16px" height="16px" src="../../static/icon/down.png" alt="">
						0.5(18.7%)
					</view>
				</view>
			</view>
			<view class="echarts">
				<l-echart ref="chart" @finished="init"></l-echart>
			</view>
		</view>
		<view class="range center">
			<view style="color: rgba(26, 33, 49, 0.4);">
				最高
			</view>
			<view style="color: color: rgb(26, 33, 49);font-weight: 600;">
				23.2
			</view>
			<view style="font-size: 32px;">
				·
			</view>
			<view style="color: rgba(26, 33, 49, 0.4);">
				浮动
			</view>
			<view style="color: color: rgb(26, 33, 49);font-weight: 600;">
				-2.7(37.5%)
			</view>
		</view>
		<view class="past30Day">
			<view class="past30Daytitle center">过去30日</view>
			<view class="card center" v-for="(item,index) in PastDayContent" :key="index">
				<view class="past30DayCardTitle">
					<view>
						{{item.title}}
					</view>
					<view>
						{{item.status}} 🥰
					</view>
				</view>
				<view style="border: 1px solid black;width:100%;
    padding: 0 15.2px;margin-left: -16px;"></view>
				<view class="past30Daycontext" ref="past30Daycontext" :style="!item.isShow ? style:''">
					{{item.content}}
				</view>
				<view v-if="item.isShow" class="showMore" @click="showContent(item,index)">展开更多</view>
			</view>
			
		</view>
		<view class="Advise">
			<view class="Advisetitle center">健康建议</view>
			<view class="card center">
				<view class="notice">
					健康建议1
				</view>
				<view class="title">
					<view>
						适量的运动
					</view>
					<view>
						1.2H
					</view>
				</view>
				<view class="context">
					您需要进行一些适量的运动，包括慢跑、散步等，来降低您的体脂率…
				</view>
			</view>
			<view class="card center">
				<view class="notice">
					健康建议2
				</view>
				<view class="title">
					<view>
						适宜的饮食
					</view>
					<view class="gpt">
						Powered by GPT
						
					</view>
				</view>
				<view class="context">
					香蕉、苹果和葡萄是近日适合您的水果，您可以尝试多吃些绿色蔬菜。
				</view>
			</view>
			<view class="card center">
				<view class="notice">
					健康建议3
				</view>
				<view class="title">
					<view>
						更加充足的睡眠
					</view>
					<view>
						2.5H
					</view>
				</view>
				<view class="context">
					您的睡眠时长严重低于正常人的平均值，您应该尝试延长您的睡眠时间。
				</view>
			</view>
		</view>
		<view class="glucose">
			<view class="glucosetitle center">关于血糖</view>
			<view class="card center" style="background: linear-gradient(90.00deg, rgba(249, 245, 242, 1.00) -1.79%, rgba(218, 213, 255, 1.00) 100%);">
				<view class="glucoseImg">
					<image mode="aspectFill" src="../../static/glucose.jpg" alt="">
				</view>
				<view class="title">
					<view>
						BMI的分类
					</view>
				</view>
				<view class="context">
					18.5以下为体重过轻；18.5-24.9为正常体重；25.0-29.9为超重；30.0-34.9为一级肥...
		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	export default {
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				option: {
					xAxis: {
						type: 'category',
						data: ['NOV', '2', '3', '4', '5', '6', '7'],
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					series: [{
						data: [34.8, 55.2, 43.6, 60.1, 57.3, 70.2, 74.6],
						type: 'line',
						smooth: true
					}],

				},
				PastDayContent:[
					{
						title:'Range of fluctuation:',
						status:'Large',
						content:'In order to help users better manage theircardiovascular and cerebrovascular health,Mailuoqingquanalso provides practical.',
						isShow:true
					},
					{
						title:'General trend:',
						status:'Upwards',
						content:'In order to help users better manage theircardiovascular and cerebrovascular health,Mailuoqingquanalso provides practical.',
						isShow:true
					},
					{
						title:'Average Value',
						status:'High',
						content:'In order to help users better manage theircardiovascular and cerebrovascular health,Mailuoqingquanalso provides practical.',
						isShow:true
					}
				],
				style:{
					webkitLineClamp :"10"
				}
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'] + 20;
		},
		methods: {
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			},
			backOne() {
				uni.navigateBack()
			},
			showContent(item,index) {
				console.log(event)
				item.isShow = false
			}
		}
	}
</script>

<style scoped>
	.navBarBox {
		background-color: rgb(171, 158, 251);
	}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding: 3rpx 50px 20rpx 20rpx;
		padding-bottom: 22rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.nav-pic {
		background-color: #000;
		padding: 5px;
		border-radius: 50%;
		margin: 0 8px;
	}

	.navBar .text :first-child {
		color: rgb(26, 33, 49);
		font-family: Inter;
		font-size: 16px;
		font-weight: 600;
	}

	.navBar .text :last-child {
		color: rgba(26, 33, 49, 0.4);
		font-family: Inter;
		font-size: 8px;
		font-weight: 600;
	}


	.pic {
		background-color: rgb(171, 158, 251);
		border-radius: 0 0 24px 24px;
		padding: 10px;
		box-sizing: border-box;
	}

	.text .title {
		color: rgba(26, 33, 49, 0.6);
		font-family: Inter;
		font-size: 18px;
		font-weight: 500;
		line-height: 22px;
	}

	.text .context {
		margin-top: 10px;
		position: relative;
		display: flex;
	}

	.text .context .data {
		color: rgb(26, 33, 49);
		font-family: Inter;
		font-size: 36px;
		font-weight: 700;
		line-height: 44px;
	}

	.text .context .percent {
		position: absolute;
		left: 240px;
		bottom: 0;
		vertical-align: middle;
	}

	.text .context .percent img {
		margin-right: 10px;
	}

	.pic .echarts {
		margin: -20px 0;
	}

	.range {
		width: 85%;
		font-family: Inter;
		font-size: 16px;
		font-weight: 500;
		line-height: 19px;
		display: flex;
		justify-content: space-between;
		height: 41px;
		align-items: center;
		padding: 16px;
		background: rgb(242, 242, 244);
		border-radius: 20px;
		margin-top: 20px;
	}

	.Advise {
		margin-top: 20px;
	}

	.Advisetitle {
		margin-left: 36%;
		font-weight: 600;
	}

	.past30Daytitle {
		margin-top: 20rpx;
		margin-left: 36%;
		font-weight: 600;
	}
	.glucosetitle{
		margin-left: 36%;
		font-weight: 600;
	}
	.card {
		width: 85%;
		background: linear-gradient(90.00deg, rgba(249, 245, 242, 1.00) -1.79%, rgba(242, 229, 251, 1.00) 100%);
		padding: 20px 16px 20px 16px;
		border-radius: 20px;
		margin-top: 0.5rem;
	}

	.card .notice {
		color: rgba(26, 33, 49, 0.4);
		font-family: Inter;
		font-size: 13px;
		font-weight: 600;
		line-height: 16px;
	}

	.card .title {
		color: rgb(26, 33, 49);
		font-family: Inter;
		font-size: 24px;
		font-weight: 600;
		line-height: 29px;
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}

	.card .context {
		color: rgba(26, 33, 49, 0.5);
		font-family: Inter;
		font-size: 15px;
		font-weight: 400;
		line-height: 1.350000023841858;
		overflow: hidden; //超出的文本隐藏
		display: -webkit-box;
		word-break: break-all;
		-webkit-line-clamp: 2; // 超出多少行
		-webkit-box-orient: vertical;
	}

	.past30DayCardTitle {
		color: rgb(26, 33, 49);
		font-family: Inter;
		font-size: 20px;
		font-weight: 600;
		line-height: 29px;
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}

	.past30Daycontext {
		width: 80%;
		overflow: hidden;
		margin-top: 20rpx;
		font-size: 16px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		word-break: break-all;
		-webkit-box-orient: vertical;
	}

	.showMore {
		width: 100%;
		height: 70rpx;
		display: flex;
		justify-content: flex-end;
		line-height: 50rpx;
		font-size: 20rpx;
		position: absolute;
		bottom: 10rpx;
		right: 0rpx;
		background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
	}
	.glucose{
		margin-top: 20px;
	}
	.glucoseImg{
		width:640rpx;
		height: 300rpx;
	}
	.glucoseImg>image{
		width: 100%;
		height: 100%;
		border-radius:20rpx;
	}
	.gpt{
		background: linear-gradient(90.00deg, #FBCF83 -1.79%, #FFB22E 100%); 
		-webkit-background-clip: text; 
		-webkit-text-fill-color: transparent;
		/* background: linear-gradient(90.00deg, rgba(0, 245, 242, 1.00) -1.79%, rgba(242, 229, 251, 1.00) 100%); */
	}
</style>
