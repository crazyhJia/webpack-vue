// import './commen.css'
// document.getElementById('app') .innerHTML =' Hello webpack! Today is friday!';

//导入vue框架
import Vue from 'vue'
import App from './app.vue'
//创建根实例
new Vue({
    el: '#app',
    render: h => h(App)
})

