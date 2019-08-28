1, npx webpack -v  //查看当前安装包里webpack版本
2，npm info webpack  //查看所有webpack版本
3，npm install webpack@4.16.5 -D //安装指定版本
4, npx webpack --config webpackconfig.js  //指定webpack打包文件
5，html-webpack-plugin  //会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到html文件中
6，plugin //可以在webpack运行到某个时刻的时候，帮你做些事情
7,cleanWebpackPlugin //打包前删除文件
8,output下的publicPath //上传cdn 添加域名
9,devtool: 'cheap-module-eval-source-map' //他是一个映射关系，他知道dist目录下main.js文件96行实际对应src目录下index.html第一行
10,module.hot.accept  //html热更替。  react，vue，bable内置， css-loader已内置
11,presets:[["@babel/preset-env",{useBuiltIns:'usage'}]] //按需要babel打包es6语法解析
12，tree shaking //只支持ES module（静态） 不支持require（动态）  "sideEffects":false, 
13,"dev":"webpack-dev-server --config webpack.dev.js" //开发环境
	"build":"webpack --config webpack.prod.js" //线上环境
14，code splitting //代码拆分
15,import(/* webpackPrefetch: true */'./click.js').then(({default: fun})=>{fun()})  //预加载import文件 在主文件之后，加快首屏速度
16,libraryTarget:'umd' //不管是import 还是require都能正确引入
17,workbox-webpack-plugin //pwa缓存技术
18， npx eslint --init //初始化eslint配置

//性能优化
1，安装最新的node，npm， webpack
2，在尽可能少的模块上应用loader（合理使用include/exclude对于loader处理）
3，plugin 尽可能精简并确保可靠
4，resolve 参数合理配置
5，使用DllPlugin提高打包速度
6，控制包文件大小
7，thread-loader,parallel-webpack,happypack多进程打包
8，合理使用sourceMap
9，结合stats分析打包结果
10，开发环境内存编译
11，开发环境无用插件剔除











