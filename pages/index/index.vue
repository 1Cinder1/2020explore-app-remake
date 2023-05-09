<template>
	<view style="position: relative;">
		<navAside v-show="navShow"></navAside>
		<view class="close-btn" v-show="navShow" @click="closeNav">
			<u-icon name="close" color="#fff" size="20"></u-icon>
		</view>
		<view class="box" ref="box" id="box" :style="isStyle ? style[0]:style[1]">
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 状态栏占位 -->
				<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<u-image @click="showNav" src="../../static/icon/nav-nav.png" width="26" height="26"></u-image>
					<navigator url="../dataInput/dataInput">
						<u-image src="../../static/icon/nav-add.png" width="26" height="26"></u-image>
					</navigator>
				</view>
			</view>
			<view class="title width center">
				<view>
					寻找你的
				</view>
				<view>
					健康咨询
				</view>
			</view>

			<view class="search">
				<u-search placeholder="搜索" :showAction="false" inputAlign="left" height="50" v-model="searchValue"
					@search="search" @focus="showSearch"></u-search>
			</view>

			<view class="kind width center">
				<view class="kind-item" :class="{active:item.active}" ref="kindItem" v-for="item in kindList" :key="item.id" @click="changeActive(item,item.id)">
					{{item.name}}
				</view>
			</view>

			<view class="daily" v-show="selected == 0">
				<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab width center">
					<view class="card" @>
						<navigator url="../dailyreport/dailyreport" hover-class="none">
							<view class="pic">
								<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/0.jpg" alt="" style="width:150px;heig:100px">
							</view>
							<view class="text-one">
								Eybisi Salad Mix
							</view>
							<view class="text-two">
								Mix vegetables inggridients
							</view>
							<view class="time">
								4/23
							</view>
						</navigator>
					</view>
					<view class="card">
						<navigator url="../dailyreport/dailyreport" hover-class="none">
							<view class="pic">
								<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/1.jpg" alt="" style="width:150px;height:100px">
							</view>
							<view class="text-one">
								Eybisi Salad Mix
							</view>
							<view class="text-two">
								Mix vegetables inggridients
							</view>
							<view class="time">
								4/23
							</view>
						</navigator>
					</view>
					<view class="card">
						<navigator url="../dailyreport/dailyreport" hover-class="none">
							<view class="pic">
								<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/2.jpg" alt="" style="width:150px;height:100px">
							</view>
							<view class="text-one">
								Eybisi Salad Mix
							</view>
							<view class="text-two">
								Mix vegetables inggridients
							</view>
							<view class="time">
								4/23
							</view>
						</navigator>
					</view>
				</scroll-view>
			</view>

			<view class="daily" v-show="selected == 1">
				<view class="list width center">
					<view class="list-item" @click="gotoArticle(1)">
						<view class="left">
							<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/3.jpg" alt=""style="width:100px;height:100px;border-radius: 20px;">
						</view>
						<view class="right">
							<view class="content">
								脑健康 | 脑中风领域重要研究成果盘点
							</view>
							<view class="data">
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/eye.png" alt=""> 356
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/collect.png" alt=""> 341
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/like.png" alt=""> 315
								</view>
							</view>
							<view class="time">
								Sep, 11 2020
							</view>
						</view>
					</view>
					<view class="list-item" @click="gotoArticle(2)">
						<view class="left">
							<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/4.jpg" alt="" style="width:100px;height:100px;border-radius: 20px;">
						</view>
						<view class="right">
							<view class="content">
								梅斯盘点：2022年度缺血性卒中十大临床研究进展
							</view>
							<view class="data">
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/eye.png" alt=""> 356
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/eye.png" alt=""> 341
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/like.png" alt=""> 315
								</view>
							</view>
							<view class="time">
								Sep, 11 2020
							</view>
						</view>
					</view>
					<view class="list-item" @click="gotoArticle(3)">
						<view class="left">
							<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/5.jpg" alt="" style="width:100px;height:100px;border-radius: 20px;">
						</view>
						<view class="right">
							<view class="content">
								Front Neurol：中国140万成年人卒中患病率及风险因素研究
							</view>
							<view class="data">
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/eye.png" alt=""> 356
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/eye.png" alt=""> 341
								</view>
								<view class="">
									<img src="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/icon/like.png" alt=""> 315
								</view>
							</view>
							<view class="time">
								Sep, 11 2020
							</view>
						</view>
					</view>
			
				</view>
			</view>

			<view class="daily" v-show="selected == 2">

			</view>

			<view class="daily" v-show="selected == 3">

			</view>

		</view>
		<seatch v-if="isShowSearch"></seatch>
	</view>

</template>

<script>
	import {mapState} from 'vuex'
	import navAside from '../../components/navAside'
	import seatch from './search/search.vue'
	export default {
		components: {
			navAside,
			seatch
		},
		data() {
			return {
				navShow: false,
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				percent: 71.094,
				searchValue: '',
				kindList: [{
					'id': 0,
					'name': '日报',
					"active":true
				}, {
					'id': 1,
					'name': '中风',
					"active":false
				}, {
					'id': 2,
					'name': '心脏病',
					"active":false
				}, {
					'id': 3,
					'name': '药物',
					"active":false
				}],
				selected: 0,
				isShowSearch:false,
				style:[{
					transform :`scale(0.7,0.7)`,
					backgroundColor : '#fff',
					position :'absolute',
					zIndex : 2,
					borderRadius : '20px',
					pointerEvents : 'none',
					right:"0rpx"
				},{
					backgroundColor : '#ecebed',
					position : 'initial',
					right : 0,
					borderRadius :0,
					pointerEvents : 'initial',
				}
				],
				isStyle:false
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
		mounted() {
			this.getArticleList()
		},
		methods: {
			showNav() {
				this.navShow = true
				var right = 0
				this.isStyle=true
				var timer = setInterval(() => {
					if (right <= -230) {
						clearInterval(timer)
					} else {
						right -= 20
						this.style[0].right = right + 'px'
					}
				}, 10)
			},
			closeNav() {
				this.navShow = false
				var scale = 0.7
				this.isStyle=false
				var timer = setInterval(() => {
					if (scale >= 0.9) {
						clearInterval(timer)
					} else {
						scale += 0.1
						this.style[1].transform = `scale(${scale},${scale})`
					}
				}, 50)
			},
			search() {
				console.log(1)
			},
			showSearch(e){
				this.isShowSearch=true
			},
			changeActive(item,id) {
				this.kindList.forEach((item)=>{
					item.active=false
				})
				item.active=true
				this.selected = id
			},
			async getArticleList(){
				try{
					await this.$store.dispatch('getArticleList')
				}catch(e){
					//TODO handle the exception
					alert(e.message)
				}
			},
			gotoArticle(articleId){
				uni.navigateTo({
					url:`/pages/article/article?articleId=${articleId}`
				})
			}
		},
		computed:{
			...mapState({
				ArticleList:state=>state.articleList.articleList
			})
			
		}
	}
</script>

<style scoped>
	.box {
		height: 95vh;
		width: 100vw;
	}

	.close-btn {
		position: absolute;
		z-index: 3;
		width: 30px;
		height: 30px;
		top: 30px;
		left: 10px;
	}

	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding: 3rpx 50px 20rpx 20rpx;
		padding-bottom: 22rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		color: rgb(32, 31, 32);
		font-family: Inter;
		font-size: 30px;
		font-weight: 700;
		line-height: 36px;
	}

	.search {
		margin-top: 20px;
		width: 85%;
		margin-left: 2.5%;
	}

	.kind {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		color: rgb(136, 136, 136);
		font-family: DM Sans;
		font-size: 16px;
		font-weight: 400;
		line-height: 21px;
	}

	.kind .item {
		width: 20%;
	}

	.active {
		color: rgb(0, 0, 0);
		font-family: DM Sans;
		font-size: 20px;
		font-weight: 400;
		line-height: 6px;
		border-bottom: 2px solid #000;
	}

	.scroll-tab {
		margin-top: 20px;
		white-space: nowrap;
	}

	.card {
		display: inline-block;
		margin-left: 10px;
	}

	.card:first-child {
		margin-left: 0;
	}

	.scroll-tab .card {
		padding: 12px;
		border-radius: 10px;
		background-color: #fff;
	}

	.card .pic img {
		border-radius: 12px;
	}

	.card .text-one {
		color: rgb(32, 31, 32);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		margin: 5px 0;
	}

	.card .text-two {
		opacity: 0.7;
		color: rgb(32, 31, 32);
		font-family: Inter;
		font-size: 10px;
		font-weight: 100;
		line-height: 20px;
		margin: 5px 0;
	}

	.card .time {
		color: rgb(32, 31, 32);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
	}

	.list {
		margin-top: 20px;
	}

	.list .list-item {
		padding: 20px;
		background-color: #fff;
		border-radius: 20px;
		display: flex;
		margin-bottom: 10px;
	}

	.list .list-item .left {
		text-align: center;
		margin-right: 10px;
	}

	.list .list-item .right {}

	.list .list-item .right .content {
		color: rgb(88, 88, 88);
		font-family: DM Sans;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
	}

	.list .list-item .right .data {
		display: flex;
		margin: 10px 0;
		color: rgb(88, 88, 88);
		font-family: DM Sans;
		font-size: 10px;
		font-weight: 400;
		line-height: 13px;
	}

	.list .list-item .right .data view {
		margin-right: 20px;
	}

	.list .list-item .right .data view img {
		margin-right: 5px;
		width: 12px;
		height: 10px;
	}

	.list .list-item .right .time {
		color: rgb(136, 136, 136);
		font-family: DM Sans;
		font-size: 9px;
		font-weight: 400;
		line-height: 12px;
	}
</style>