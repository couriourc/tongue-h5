const px2viewport = require("postcss-px-to-viewport-8-plugin")
const autoprefixer = require("autoprefixer")

module.exports = () => {
	return {
		plugins: [
			px2viewport({
				viewportUnit    : "vw",
				fontViewportUnit: "vw",
				viewportWidth   : 375,
				exclude         : [/^(?!.*node_modules\/react-vant)/],
			}),
			px2viewport({
				viewportUnit    : "vw",
				fontViewportUnit: "vw",
				viewportWidth   : 750,
				exclude         : [/node_modules\/react-vant/i],
			}),
			autoprefixer(
				{
					overrideBrowserslist: [
						"Android 4.1",
						"iOS 7.1",
						"Chrome > 31",
						"ff > 31",
						"ie >= 8",
						//'last 2 versions', // 所有主流浏览器最近2个版本
					], grid             : true,
				},
			),
		],
	}
}
