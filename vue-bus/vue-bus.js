/**
 * @class
 * @author    Administrator
 * @date      2020/4/29 11:54
 * @Copyright 迪科云起
 * @Description   将中央事件总线bus封装成vue插件
 *
 */

const install = function(Vue){
    const Bus = new Vue({
        methods:{
            emit(event, ...args){
                this.$emit(event, ...args);
            },
            on(event, ...args){
                this.$on(event, ...args);
            },
            off(event, ...args){
                this.$off(event, ...args);
            },
        }
    })
    Vue.prototype.$bus = Bus;
}
export default install;


