// import './commen.css'
// document.getElementById('app') .innerHTML =' Hello webpack! Today is friday!';

//导入vue框架
import Vue from 'vue'
import App from './app.vue'
//导入vue-router插件
import VueRouter from 'vue-router'
//导入Vuex
import Vuex from 'vuex'
//导入vue-bus
import VueBus from './vue-bus/vue-bus'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueBus)

const Routers = [
    {
        path: '/index',
        component: (resolve) => require(['./router/views/index.vue'],resolve)
    },
    {
        path: '/about',
        component: (resolve) => require(['./router/views/about.vue'],resolve)
    },
    {
        //当访问的路径不存在时， 重定向到首页：
        path: '*',
        redirect: '/index'
    }
    //Routers 里每项的 path 属性就是指定当前匹配的路径， component 是映射的组件。
    // webpack 会把每一个路由都打包为 js 文件，在请求到该页面时，才去加载这个页面的 js,
    // 也就是异步实现的懒加载（按需加载）.
    // 这样做的好处是不需要在打开首页的时候就把所有的页面内容全部加载进来，只在访问时才加载。
    // 使用了异步路由后，编译出的每个页面的 js 都叫作 chunk （块），它们命名默认是
    // O.main. 1.main. ．．．．．．可以在 webpack配置的出口 output 里通过设置chunkFilename
    // 字段修改 chunk 命名，例

    // output: {
    // publicPath:'/dist/',
    // filename :'[name]. js',
    // chunkFilename :'[name].chunk.js'

    //     有了 chunk 后，在每个页面（ .vue 文件）里写的样式也需要配直后才会打包进 main.css
    // 否则仍然会通过 JavaScript 动态创建＜style＞标签的形式写入 配直插件：
    // II webpack.config . js
    // plug ins: [
    //     new ExtractTextPlugin({
    //         filename :’ [name] . css ’,
    // allChunks: true
    // })
    // ]

    // 如果非要一次性加载 可以这样写
    // {
    //     path:'index',
    //     component:require('./views/index.vue')
    // },

]

const RouterConfig = {
    //使用HTML5的history路由模式,RouterConfig 里，设置 mode history 会开 HTMLS Hist。
    // 可路由模式，通过“／”设置路径。如果不配置 mode ，就会使用“＃”来设置路径。
    //开启 History 路由，在生产环境时服务端必须进行配置，将所有路由都指向同一个 html ，
    // 或设置 404 页面为该 html ，否则刷新时页面会出现404
    //webpack-dev-server 也要配置下来支持 History 路由，在 package. on 中修改 dev 命令：
    //”scripts” : {
    // ” dev”:”webpack-dev-server --open --history-api-fallback --config
    // webpack . config . j s ”
    // 增加了－－history-api llback ，所有的路 由都会指向 index.html
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig);
const modulesA = {
    //state   定义
    state: {
        count: 12,
        list: [12,2,6,7,22]
    },
    //getters   相当于state的计算属性
    getters:{
        listFiltered: state =>{
            return state.list.filter(item =>item < 10)
        },
        listLength: (state, getters) =>{
            return getters.listFiltered.length;
        }
    },
    //mutations  通过mutations更改数据
    mutations: {
        increment(state,n=1){
            state.count+=n;
        },
        increment3(state,params){
            state.count+=params.num;
        },
        decrease(state){
            state.count--;
        }
    },
    actions:{
        //异步操作
        asyncIncrement(context){
            // Promise 是一种异步方案,它 种状 Pending （进行中）、 Resolved ）、
            // 提示 Rejected （已失败 ）
            return new Promise(resolve =>{
                setTimeout(()=>{
                    context.commit('increment')
                    resolve();
                },1000)
            })
        }
    }
}
const store = new Vuex.Store({
    //state   定义
    state: {
        count: 12,
        list: [12,2,6,7,22]
    },
    //getters   相当于state的计算属性
    getters:{
      listFiltered: state =>{
          return state.list.filter(item =>item < 10)
      },
      listLength: (state, getters) =>{
          return getters.listFiltered.length;
      }
    },
    //mutations  通过mutations更改数据
    mutations: {
        increment(state,n=1){
            state.count+=n;
        },
        increment3(state,params){
            state.count+=params.num;
        },
        decrease(state){
          state.count--;
        }
    },
    actions:{
        //异步操作
        asyncIncrement(context){
            // Promise 是一种异步方案,它 种状 Pending （进行中）、 Resolved ）、
            // 提示 Rejected （已失败 ）
            return new Promise(resolve =>{
                setTimeout(()=>{
                    context.commit('increment')
                    resolve();
                },1000)
            })
        }
    },

    modules: {
        a: modulesA
        // store.state.a   // moduleA 的状态
    }
})

//创建根实例
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})

