<template>
	<view style="position: relative;padding: 0rpx 30rpx;">
		<navAside v-show="navShow" ></navAside>
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
			<view class="categroy">
				<view style="flex: 1;" :class="showModel == 0 ? 'show-model':''" @click="function(){showModel =0;}">所有</view>
				<view style="flex: 1;" :class="showModel == 1 ? 'show-model':''" @click="function(){showModel =1}">中风</view>
				<view style="flex: 2;" :class="showModel == 2 ? 'show-model':''" @click="function(){showModel =2}">心脏病</view>
				<view style="flex: 2;" :class="showModel == 3 ? 'show-model':''" @click="function(){showModel =3}">药物</view>
			</view>
			<!-- v-for="(item,index) in showList" -->
			
			<view>
				<view @click="gotoArticle(1)">
					<history style="margin-top: 20rpx;" imageSrc ="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/10.jpg" title = "脑健康 | 脑中风领域重要研究成果盘点" date="2021.11.11"></history>
				</view>
				<view @click="gotoArticle(2)">
					<history style="margin-top: 20rpx;" imageSrc ="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/9.jpg" title = "梅斯盘点：2022年度缺血性卒中十大临床研究进展" date="2021.11.11"></history>
				</view>
				<view @click="gotoArticle(3)">
					<history style="margin-top: 20rpx;" imageSrc ="https://cdn.jsdelivr.net/gh/motonik/Photo-Repositary@main/card/5.jpg" title = "Front Neurol：中国140万成年人卒中患病率及风险因素研究" date="2021.11.11"></history>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import navAside from '../../components/navAside'
	import history from '../../components/history'
	import getArticleList from "@/api/request.js"
	import {authRequest, basicRequest, request} from "@/api/index.js"
	export default {
		components: {
			navAside,
			history
		},
		data() {
			return {
				navShow: false,
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				//显示All Stroke  HeartDisease Medicine中的一个
				showModel:0,
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
				isStyle:false,
				showList:[],
				collectList:[],
				collect0List:[],
				collect1List:[],
				collect2List:[],
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			authRequest({url:'/article/collect-list',method:'get'}).then((res)=>{
				this.collectList=res.data
				// this.collectList.forEach((item,index)=>{
				// 	authRequest({url:'/'})
				// })
				this.collectList.forEach((item,index)=>{
					var content = item.content
					const start = content.indexOf('<h1>') + '<h1>'.length
					const end = content.indexOf('</h1>', start)
					const contentstart = content.indexOf('</h1>') + '</h1>'.length
					var title = content.substring(start, end)
					var nonetitle = content.substring(contentstart)
					item.title = title
					item.nonetitle = nonetitle
				})
				// var index = articleindex - 1;
				// var content = res.data[index].content
				// const start = content.indexOf('<h1>') + '<h1>'.length
				// const end = content.indexOf('</h1>', start)
				// const contentstart = content.indexOf('</h1>') + '</h1>'.length
				// var title = content.substring(start, end)
				// var nonetitle = content.substring(contentstart)
				// this.author=res.data[index].author
				// this.atkTitle=title
				// this.toInsert= nonetitle 
				this.showList=this.collectList
				// console.log(this.collectList)
			});
		
		},
		methods: {
			getArticle(){
				
			},
			showNav() {
				this.navShow = true
				var right = 0
				this.isStyle=true
				var timer = setInterval(() => {
					if (right <= -250) {
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
			gotoArticle(articleId){
				uni.navigateTo({
					url:`/pages/article/article?articleId=${articleId}`
				})
			}

		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 95vh;
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
	.navBarBox .statusBar {}
	.navBarBox .navBar {
		padding: 3rpx 50px 20rpx 20rpx;
		padding-bottom: 22rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.categroy {
		width: 100%;
		height: 80rpx;
		/* background-color: antiquewhite; */
		display: flex;
		flex-direction: row;
	}
	.categroy view {
		/* color: rgb(139, 140, 143); */
		font-family: Inter;
		font-size: 32rpx;
		font-weight: 100;
		line-height: 24px;
		/* background-color: black; */
		border-radius: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.show-model {
		background-color: black;
		font-weight: 500;
		font-size: 32rpx;
		color: white;
	}
</style>
