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
					<view class="">血糖</view>
					<view class="">血液中葡萄糖含量</view>
				</view>
			</view>
		</view>
		<view class="pic">
			<view class="text">
				<view class="title">
					血糖平均值
				</view>
				<view class="context">
					<view class="data">{{avgGlucoseLevelAverage.length==0 ? "0":avgGlucoseLevelAverage[avgGlucoseLevelAverage.length-1].avgGlucoseLevel}}mmol/L</view>
					<view class="percent">
						<img src="../../static/icon/up.png" alt="">
						0.1(5.58%)
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
				6.8mmol/L
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
			<view class="past30Daytitle center">过去30天</view>
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
						降糖药物的正确使用
					</view>
					<view>
						
					</view>
				</view>
				<view class="context">
					光是控制饮食效果并不明显，要坚持使用胰岛素等降糖类的药物，但需要在医生的建议下来使用，最好是定期的去医院检查身体的情况。
				</view>
			</view>
			<view class="card center">
				<view class="notice">
					健康建议2
				</view>
				<view class="title">
					<view>
						停止吸烟和限制饮酒
					</view>
					<view class="gpt">
						Powered by GPT
					</view>
				</view>
				<view class="context">
					吸烟和饮酒会增加血糖波动的风险，并且对健康也有害...
				</view>
			</view>
			<view class="card center">
				<view class="notice">
					健康建议3
				</view>
				<view class="title">
					<view>
						定期检测血糖
					</view>
					<view>
						1次/周
					</view>
				</view>
				<view class="context">
					定期检测血糖可以帮助您了解自己的血糖控制情况。
				</view>
			</view>
		</view>
		<view class="glucose">
			<view class="glucosetitle center">About Glucose</view>
			<view class="card center" style="background: linear-gradient(90.00deg, rgba(249, 245, 242, 1.00) -1.79%, rgba(218, 213, 255, 1.00) 100%);">
				<view class="glucoseImg">
					<image mode="aspectFill" src="../../static/glucose.jpg" alt="">
				</view>
				<view class="title">
					<view>
						血糖含量过高的风险及危害
					</view>
				</view>
				<view class="context">
					长期血糖过高，是糖尿病的表现，很有可能导致糖尿病肾病的发生，因为高血糖或血糖波动大是糖尿病肾病发生的最根本原因。
		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
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
		onLoad() {
			this.getAveGlucoseLevelAge()
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
			},
			//获取avgGlucoseLevelAverage的值
			async getAveGlucoseLevelAge(){
				await this.$store.dispatch('getHeartHistory')
			}
		},
		computed:{
			...mapState({
				avgGlucoseLevelAverage:state=>state.glucose.avgGlucoseLevelAverage
			})
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