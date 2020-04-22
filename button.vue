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
   <div>
       <button @click="handleClick" :style="styles">
           <slot></slot>
       </button>
   </div>
</template>

<script>
    export default {
        name: "button",
        props:{
            color: {
                type:String,
                default: 'lightblue'
            }
        },
        computed:{
          styles(){
                return  {
                    backgroundColor: this.color
                }
            }
        },
        methods:{
            handleClick(e){
                this.$emit('clickBtn','点击我')
            }
        }
    }
</script>

<style scoped>
    button{
        border : 0 ;
        outline : none ;
        color : #fff;
        padding : 4px 8px ;
    }
    button :active {
        position: relative;
        top: 1px;
        left: 1px;
    }
</style>
