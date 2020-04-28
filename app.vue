<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/4/21 17:43
    * @copyright 迪科云起
    * @description
    */
</comment>
<template>
    <div class="appClass">
        <!--hello {{name}}-->
        <!--<vtitle title="title组件"></vtitle>-->
        <!--<vbutton @clickBtn="handleClick">我是按钮</vbutton>-->
        <!--<div>-->
            <!--<img src="images/cat.png" style="width: 200px"/>-->
        <!--</div>-->

        <router-view></router-view>
    </div>
</template>

<script>
    import vtitle from './title.vue'
    import vbutton from './button.vue'
    export default {
        name: "app.vue",
        components:{
          vtitle,
          vbutton
        },
        data(){
            return{
                name: 'vue单文件，真是不容易啊！'
            }
        },
        methods:{
            handleClick(e){
                console.log(e)
            }
        }
    }
</script>

<style scoped>
    /*此处的样式，插件extract-text-webpack-plugin已经配置了，
    会被提取统一打包到main.css中，*/
    /*scoped属性是只对当前组件有效。*/
    .appClass{
        font-size: 20px;
        color: darkorange;
    }
</style>
