// 配置编译环境和线上环境之间的切换 font_1168543_wi7g17dq0yg.css

let baseUrl = '';
let iconfontVersion = ['1168543_wi7g17dq0yg','1096808_emiltc8ef1h'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`;
const env = process.env

if (env.NODE_ENV == 'development') {
    baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = ``; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env
}
