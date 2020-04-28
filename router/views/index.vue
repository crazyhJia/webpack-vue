<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/4/27 16:54
    * @copyright 迪科云起
    * @description
    */
</comment>
<template>
    <div>
        <div>首页</div>
        <div>数字：{{count}}</div>
        <button @click="asyncIncrementClick">async+1</button>
        <router-link to="/about">skip</router-link>
    </div>
</template>
<script>
    export default {
        name: "index.vue",
        computed:{
            count(){
                return this.$store.state.count
            },
        },
        methods:{
            asyncIncrementClick(){
                // this.$store.commit('increment')
                //修改数据用mutations
                //操作业务逻辑用actions
                this.$store.dispatch('asyncIncrement').then(()=>{
                  console.log(this.$store.state.count)
                })
            }
        }
    }
</script>

<style scoped>

</style>
