<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/4/21 18:16
    * @copyright 迪科云起
    * @description
    */
</comment>
<template>
    <h1><a :href="'#' + title">{{title}}</a></h1>
</template>

<script>
    export default {
        name: "title", props:{
            title: {
                type:String,
                default: '我是链接'
            }
        }

    }
</script>

<style scoped>
    h1 a{
        font-size: 15px;
        color: green;
    }
</style>
