<template>
	<view style="margin: 0 30rpx;">
		<view class="box">
			<view class="title">
				<view>
					账号注册
				</view>
				<view>
					<view>
						已经拥有账户?
					</view>
					<view class="toSignUp" @click="toSignIn">
						登录!
					</view>
				</view>
			</view>
			<uni-forms ref="forms" class="form" @submit="formSubmit" :rules="rules" :modelValue="FormData"
				label-width="350rpx" label-position="top">
				<uni-forms-item class="formItem" label="昵称" name="Username">
					<view class="formIpt">
						<input type="text" v-model="FormData.Username" placeholder="在此输入昵称">
					</view>
				</uni-forms-item>
				<uni-forms-item class="formItem" name="Email" label="邮箱地址">
					<view class="formIpt">
						<input type="text" v-model="FormData.Email" placeholder="在此输入邮箱">
					</view>
				</uni-forms-item>
				<uni-forms-item class="formItem" name="EmailCode" label="邮箱验证码">
					<view class="formIpt" style="display: flex;">
						<input style="width: 350rpx;" type="number" v-model="FormData.EmailCode"
							placeholder="在此输入邮箱验证码">
						<button class="EmailCodeBtn" :class="{active:send}" :disabled="send"
							@click="getEmailCode">{{EmailCodeIptContent}}</button>
					</view>

				</uni-forms-item>
				<uni-forms-item class="formItem" name="Password" label="密码">
					<view class="formIpt">
						<input type="password" v-model="FormData.Password" placeholder="在此输入密码">
					</view>
				</uni-forms-item>
				<uni-forms-item class="formItem" name="Cofirmpassword" label="确认密码">
					<view class="formIpt">
						<input type="password" v-model="FormData.Cofirmpassword"
							placeholder="再次确认密码">
					</view>
				</uni-forms-item>
				<button class="submitBtn" form-type="submit" @click="formSubmit">注册</button>
			</uni-forms>

		</view>
	</view>
</template>
<script>
	import {getEmailCode} from "@/api/request.js"
	import {userRegister} from "@/api/request.js"
	export default {
		data() {
			return {
				FormData: {
					Username: '',
					Email: '',
					EmailCode: '',
					Password: '',
					Cofirmpassword: ''
				},
				rules: {
					Username: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空'
						}]
					},
					Email: {
						rules: [{
							required: true,
							errorMessage: '邮箱不能为空'
						}]
					},
					EmailCode: {
						rules: [{
							required: true,
							errorMessage: '邮箱验证码不能为空'
						}, {
							format: 'number',
							errorMessage: '邮箱验证码只能是数字'
						}]
					},
					Password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					},
					Cofirmpassword: {
						rules: [{
								required: true,
								errorMessage: '请再次确认密码'
							},
							{
								validateFunction: (rules,value,callback) => {
									if (value != this.FormData.Password) {
										return false
									}else{
										return true
									}
								},
							}
						]
					},
				},
				send: false,
				countDown: 60,
				EmailCodeIptContent: "Send"
			}
		},
		onReady() {
				// 需要在onReady中设置规则
				this.$refs.forms.setRules(this.rules)
			},
		methods: {
			formSubmit(e) {
				this.$refs.forms.validate().then(res => {
					userRegister({
									email:res.Email,
									emailCode:res.EmailCode,
									password:res.Password
								}).then(res=>{
									if(res.success == 0){
										uni.showToast({
											icon:"none",
											title:res.message
										})
									}else{
										uni.navigateTo({
											url: '/pages//SignIn/SignIn'
										})
									}
								}).catch(err=>{
									console.log(err)
								})
					// uni.showToast({
					// 	title: `校验通过`,
					// 	success: async () => {
					// 		//发送request请求，这里不许用进行数据储存，所有我们直接发送request请求
					// 		try{
					// 			let result = await this.$requests.userRegister({
					// 				email:res.Email,
					// 				emailCode:res.EmailCode,
					// 				password:res.Password
					// 			})
					// 			if(result.success==1){
					// 			//成功后跳转到start界面
					// 			uni.navigateTo({
					// 				url: '/pages/start/start'
					// 			})
					// 			}
								
					// 		}catch(e){
					// 			//TODO handle the exception
					// 			alert(e.message)
					// 		}
							
					// 	}
					// })
				})
			},
			//跳转到Sign In
			toSignIn() {
				uni.navigateTo({
					url: '/pages/SignIn/SignIn'
				})
			},
			async getEmailCode() {
				this.EmailCodeIptContent = `Resend at ${this.countDown}s later`
				this.send = true
				let timer = setInterval(() => {
					this.countDown--
					this.EmailCodeIptContent = `Resend at ${this.countDown}s later`
					this.send = true
					if (this.countDown == 0) {
						clearInterval(timer)
						this.countDown = 60
						this.send = false
						this.EmailCodeIptContent = `Resend`
					}
				}, 1000)
				await getEmailCode(this.FormData.Email)
				//await this.$requests.getEmailCode(this.FormData.Email)
				
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background-image: url('../../static/bg/startBg.jpg');
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.title {
		width: 750rpx;
		height: 325rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.title>view:nth-child(1) {
		font-size: 50rpx;
		font-weight: 600;
		margin-bottom: 30rpx;
	}

	.title>view:nth-child(2) {
		color: #8b899f;
		display: flex;
		font-size: 30rpx;
	}

	.title .toSignUp {
		color: #3371d3;
		margin-left: 10rpx;
	}

	.formItem {
		width: 700rpx;
		height: auto;
		margin-bottom: 30rpx;

	}

	.formItem .formIpt {
		display: flex;
		align-items: center;
		width: 630rpx;
		height: 70rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(241, 245, 251, 0.6);
	}

	.formItem .formIpt>input {
		width: 600rpx;
	}

	.submitBtn {
		width: 500rpx;
		color: white;
		background-color: #7f6df2;
		border-radius: 20rpx;
		position: fixed;
		bottom: 50rpx;
		left: 125rpx;
	}

	.EmailCodeBtn {
		position: absolute;
		right: 50rpx;
		width: 150rpx;
		border-radius: 20rpx;
		background-color: #9584ff;
		color: white;
	}

	.EmailCodeBtn.active {
		width: 400rpx;
		border-radius: 20rpx;
		background-color: #c0b7fa;
		color: white;
	}
</style>