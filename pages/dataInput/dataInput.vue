<template>
	<view class="box con center" style="width: 90%;">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="back">
					<u-icon name="arrow-left" size="19" @click="backOne"></u-icon>
				</view>
				<view class="top">
					<view>
						填写数据
					</view>
					<view>
						填入您的健康信息
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view class="list width center">
			<view class="item">
				<view class="title">
					平均血糖水平
				</view>
				<view class="data">
					<u-input placeholder="输入您的平均血糖水平" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
			
			
			<view class="item">
				<view class="title">
					身高
				</view>
				<view class="data">
					<u-input placeholder="以m为单位输入您的身高" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					体重
				</view>
				<view class="data">
					<u-input placeholder="以kg为单位输入您的体重" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
			
			
			<view class="item">
				<view class="title">
					生理健康(过去30天)
				</view>
				<view class="data">
					<u-input placeholder="您感到不适的天数" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					心理健康(过去30天)
				</view>
				<view class="data">
					<u-input placeholder="您感到不适的天数" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					行走困难
				</view>
				<view class="pick">
					<view class="pick-item diffwalking" :class="{active:item.active}" ref="diffwalking" v-for="(item,index) in diffwalkingBtn" :key="index" @click="activePick(diffwalkingBtn,item)">
						{{item.name}}
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					睡眠时长
				</view>
				<view class="data">
					<u-input placeholder="输入您今日的睡眠时长" shape="circle" border="surround" clearable
						style="background-color: rgb(255, 255, 255);"></u-input>
				</view>
			</view>
		
			<view class="item">
				<view class="title">
					运动 (一日之内)
				</view>
				<view class="pick">
					<view class="pick-item physical" :class="{active:item.active}" ref="physical" v-for="(item,index) in physicalBtn" :key="index" @click="activePick(physicalBtn,item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="btn width center" @click="submit">Submit</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diffwalkingBtn:[
					{
						name:"Yes",
						active:true
					},
					{
						name:"No",
						active:false
					}
				],
				physicalBtn:[
					{
						name:"Yes",
						active:true
					},
					{
						name:"No",
						active:false
					}
				],
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				workType: [{
					title: 'Govt_job',
					value: 0
				}, {
					title: 'Self-employed',
					value: 1
				}, {
					title: 'Private',
					value: 2
				}],
				workTypeValue: '',
				diabetes: [{
					title: 'No',
					value: 0
				}, {
					title: 'No,borderline diabetes',
					value: 1
				}, {
					title: 'Yes',
					value: 2
				}, {
					title: 'Yes(during pregnancy)',
					value: 3
				}],
				diabetesValue: '',
				general: [{
					title: 'Excellent',
					value: 0
				}, {
					title: 'Fair',
					value: 1
				}, {
					title: 'Good',
					value: 2
				}, {
					title: 'Poor',
					value: 3
				}, {
					title: 'Very Good',
					value: 4
				}],
				generalValue: '',
				showList: [{
					'name': 'workType',
					'show': false
				}, {
					'name': 'diabetes',
					'show': false
				}, {
					'name': 'general',
					'show': false
				}]
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
		methods: {
			backOne() {
				uni.navigateBack()
			},
			changeShow(index) {
				this.showList[index].show = !this.showList[index].show
			},
			changeValue(name, value) {
				console.log(name, value)
				var arr = this.$refs[name]
				for (var i = 0; i < arr.length; i++) {
					arr[i].classList.remove('active')
				}
				arr[value].classList.add('active')
				if (name == 'workType') {
					this.workTypeValue = this.workType[value].title
				} else if (name == 'diabetes') {
					this.diabetesValue = this.diabetes[value].title
				} else if (name == 'general') {
					this.generalValue = this.general[value].title
				}

				for (var i = 0; i < this.showList.length; i++) {
					if (this.showList[i].name == name) {
						this.showList[i].show = !this.showList[i].show
					}
				}

			},
			activePick(name, item) {
				name.forEach((item)=>{
					item.active=false
				})
				item.active=true
			},
			submit() {
				this.$refs.uToast.show({
					type: 'success',
					title: '',
					message: "提交成功",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			}
		}
	}
</script>

<style scoped>
	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.back {
		position: absolute;
	}

	.top {
		width: 100%;
		text-align: center;
	}

	.top view:first-child {
		color: rgb(23, 23, 37);
		font-family: Inter;
		font-size: 24px;
		font-weight: 700;
		line-height: 32px;
	}

	.top view:last-child {
		color: rgb(102, 112, 122);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 22px;
	}


	.down-menu {
		height: 38px;
		background: rgb(255, 255, 255);
		line-height: 38px;
		position: relative;
		font-size: 13px;
	}

	.down-menu .icon {
		float: right;
		margin-right: 10px;
	}

	.down-menu .menu-list {
		position: absolute;
		top: 38px;
		background-color: #fff;
		width: 100%;
		z-index: 3;
		padding-left: 5px;
		box-sizing: border-box;
		z-index: 3;
	}

	.down-menu .menu-list .menu-item {
		font-size: 12px;
		line-height: 28px;
	}

	.down-menu .menu-list .active {
		color: #a6b142;
	}



	.list {
		margin-top: 30px;
	}

	.list .item {
		margin-bottom: 20px;
	}

	.list .item .title {
		color: rgb(120, 130, 138);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 22px;
		margin-bottom: 6px;
	}

	.list .item .pick {
		display: flex;
		justify-content: space-between;
	}

	.list .item .pick .pick-item {
		width: 40%;
		height: 38px;
		border-radius: 16px;
		line-height: 38px;
		text-align: center;
		color: rgb(156, 164, 171);
		font-family: Inter;
		font-size: 16px;
		font-weight: 500;
		background: rgb(248, 248, 248);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	}

	.list .item .pick .active {
		background: rgb(255, 255, 255);
		box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.fui-filter__item {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		background-color: #fff;
	}

	.fui-filter__icon {
		transition: all .15s linear;
	}

	.fui-icon__ani {
		transform: rotate(180deg);
	}

	.btn {
		height: 62px;
		text-align: center;
		background-color: rgb(26, 33, 49);
		border-radius: 16px;
		color: rgb(255, 255, 255);
		font-family: Inter;
		font-size: 18px;
		font-weight: 600;
		line-height: 62px;
		margin-top: 60px;
	}
</style>