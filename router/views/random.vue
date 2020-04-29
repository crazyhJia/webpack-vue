<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/4/29 16:51
    * @copyright 迪科云起
    * @description
    */
</comment>
<template>
    <div>
        {{number}}
        <button @click="addRandomClick">随机增加</button>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "random",
    props:{
        number: {
            type: Number,
        }
    },
    methods:{
        addRandomClick(){
            let num = Math.floor(Math.random()*100+1)
            this.$bus.emit('addRandom',num)
        }
    }
    }
</script>

<style scoped>

</style>
