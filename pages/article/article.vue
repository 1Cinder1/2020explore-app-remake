<template>
	<view style="position: relative;">
		<view class="image-container">
			<div class="imageTop" :style="{ backgroundImage: 'url(' + imageTopUrl + ')' }">
			</div>
		</view>
		<view class="article-self">
			<view class="title-star-like">
				<view class="leftblock article-title">
					<h3 class="atk-title">{{atkTitle}}</h3>
					<div style="display: flex; padding-top: 2px;">
						<p class="article-publisher">{{author}}</p>
						<p class="article-category">健康</p>
						<p class="article-ip">IP:Wuhan</p>
					</div>
				</view>
				<view class="rightblock">
					<div style="padding-right: 6px;">
						<u-icon ref="icon1" :name="icon1" size="30" @click="starclick"></u-icon>
						<span style="font-size: small;">{{starnum}}</span>
					</div>
					<div>
						<u-icon ref="icon2" :name="icon2" size="30" @click="thumbclick"></u-icon>
						<span style="font-size: small;">{{thumbnum}}</span>
					</div>
					
				</view>
			</view>
			<view class="toInsert">
				<p v-html="toInsert"></p>
			</view>
		</view>
	</view>
</template>

<script>
	import {authRequest, basicRequest, request} from "@/api/index.js"
	import {getArticleLike,getArticleCollect} from "@/api/request.js"
	var collectList = new Array();
	var likeList = new Array();
	var articleindex = 1;
	export default {
		data() {
			return {
				icon1:'star',
				icon2:'thumb-up',
				imageTopUrl:'../../static/icon/pill.jpg',
				starnum:0,
				thumbnum:0,
				author:'',
				atkTitle:'',
				toInsert:''
			}
		},
		onLoad(options) {
			articleindex = options.articleId
		},
		methods: {
			backOne() {
				uni.navigateBack()
			},
			starclick(){
				var index = articleindex - 1;
				getArticleCollect(articleindex)
				authRequest({url:'/article/list',method:'get'}).then((res)=>{
					this.starnum = res.data[index].collectCount
				})	
				this.icon1 = (this.icon1 == "star" ? "star-fill" : "star")
			},
			thumbclick(){		
				var index = articleindex - 1;
				getArticleLike(articleindex)
				authRequest({url:'/article/list',method:'get'}).then((res)=>{
					this.thumbnum = res.data[index].likeCount
				})				
				this.icon2 = (this.icon2 == "thumb-up" ? "thumb-up-fill" : "thumb-up")
			}		
		},
		mounted() {
			//GET：初始化时判断文章是否被用户点赞收藏
			authRequest({url:'/article/like-collect-list',method:'get'}).then((res)=>{
				
				collectList = res.data.articleCollectList
				likeList = res.data.articleLikeList
				console.log(likeList)
				
				var index = articleindex - 1;
				if(collectList.length != 0 ){
					for (let i = 0; i < collectList.length; i++) {
					  if(articleindex == collectList[i].articleId){
						  this.icon1 = "star-fill"
						  break;
					  }
					}
				}
				if(likeList.length != 0){
					for (let i = 0; i < likeList.length; i++) {
					  if(articleindex == likeList[i].articleId){
						  this.icon2 = "thumb-up-fill"
						  break;
					  }
					}
				}
			});
		    authRequest({url:'/article/list',method:'get'}).then((res) => {
				//插入文章标题与内容
				var index = articleindex - 1;
				var content = res.data[index].content
				const start = content.indexOf('<h1>') + '<h1>'.length
				const end = content.indexOf('</h1>', start)
				const contentstart = content.indexOf('</h1>') + '</h1>'.length
				var title = content.substring(start, end)
				var nonetitle = content.substring(contentstart)
				this.author=res.data[index].author
				this.atkTitle=title
				this.toInsert= nonetitle 
				//获取点赞收藏总数并渲染
				this.thumbnum = res.data[index].likeCount
				this.starnum = res.data[index].collectCount
		    });			
		}
	}
</script>

<style>
.toInsert{
	text-indent: 1em; /* 使用1个em单位的缩进 */
	letter-spacing: 0.1em;
	line-height: 1.6em;
	margin-bottom: 1.4em;
	max-width: 504px;
}
.toInsert img {
	max-width: 100%;
}
p {
	text-indent: 1em; /* 使用1个em单位的缩进 */
	letter-spacing: 0.1em;
	line-height: 1.6em;
	margin-bottom: 1.4em;
}
	
img{
	max-width: 70%;
}
.centered {
  display: flex;
  justify-content: center;
  align-items: center;

}
.image-container {
  max-width: 100%;
  height: auto;
  cursor: pointer;
  position: relative;
}
.back {
  position: fixed;
  top: 20px; /* 根据需要设置top和left的值 */
  left: 20px;
  z-index: 999; /* 确保该元素位于其他元素之上 */
}
.imageTop {
  width: 100%;
  height: 50%;
  padding-bottom: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 200rpx;
}
.title-star-like{
	padding-top: 2em;
	padding-bottom: 6em;
}
.leftblock{
	float: left;
	display: block;
}
.rightblock{
	float:right;
	display:flex;
}
.article-self{
	border-radius: 40rpx;
	background-color: white;
	padding-left: 2em;
	padding-right: 2em;
	position: absolute;
	top:160px;
	z-index: 20px;
	max-width:87.5%;
	overflow: hidden;
}
.article-self img{
	max-width: 70%;
}
.article-title{
	disp: flex;
}
.article-category{
	color: darkgray;
}
.article-publisher{
	
}
.article-ip{
	color: darkgray;
}
.article-time{
	
}
</style>
