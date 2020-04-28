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
        <div>介绍页</div>
        <div>数字：{{count}}</div>
        <button @click="incrementClick">增加</button>
        <button @click="incrementClick3">增加3</button>
        <button @click="decreaseClick">减少</button>
        <div >{{list}}</div>
        <div >{{listFilter}}</div>
        <div>{{listCount}}</div>
        <button @click="bakcClick">back</button>
    </div>
</template>
<script>
    export default {
        name: "about",
        computed:{
            count(){
                return this.$store.state.count
            },
            list(){
                console.log(this.$store.state.list.filter(item => item < 10))
                return this.$store.state.list;
            },
            listFilter(){
                console.log(this.$store.getters.listFiltered)
                return this.$store.getters.listFiltered;
            },
            listCount(){
                return this.$store.getters.listLength;
            }
        },
        methods:{
            incrementClick(){
              this.$store.commit('increment',2)
            },
            incrementClick3(){
              this.$store.commit({
                  type: 'increment3',
                  num: 3
              })
            },
            decreaseClick(){
              this.$store.commit('decrease')
            },
            bakcClick(){
                this.$router.push('/index')
            }
        }
    }
</script>

<style scoped>

</style>
