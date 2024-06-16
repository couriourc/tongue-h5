/**@type IGlobalConfiguration*/
window.config = {
	// 后端地址路径
	baseURL: "https://yyxgx.com/api",
	// 每一阶段Loading加载间隔 单位毫秒
	loadingDuration: 1000,
	// 加载的文案阶段
	loadingStepper : [
		[20, "正在检测舌质量"],
		[40, "正在检测体质"],
		[60, "正在推理你的舌像分析"],
		[80, "正在处理推进你的药膳"],
	],
	// 某一阶段停留多久，如[20, "正在检测舌质量"]会持续多久
	loadingDurationToNextStep: 1000,
}
