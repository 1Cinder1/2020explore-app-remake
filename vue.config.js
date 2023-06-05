module.exports = {
	devServer:{
		disableHostCheck:true,
		proxy:{
			'/uaa':{
				target:'http://localhost:9013',
				changeOrigin:true,
			}
		}
	}
}