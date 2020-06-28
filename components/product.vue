<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/5/25 18:27
    * @copyright 迪科云起
    * @description   商品简介组件，鼠标经过时，显示出加入购物车的按钮。
    * router-link最终会渲染为一个a标签，链接到:to 定义的 url，也就是商品详情页， id 会作为
    * 参数通过Vue-router 传递.
    “加入购物车”按钮对@click 事件使用了 prevent 修饰符来阻止冒泡，否则在点击按钮的同时，
    也会点击到a标签进入详情页.
    “加入购物车”按钮先设置了 handleCart 方法，通过 Vuex 触发 mutation 保存到购物车，
    参数为商品的 id.
    */
</comment>
<template>
    <div class="product">
        <router-link :to="'/product/' + info.id" class="product-main">
            <img :src="info.image">
            <h4>{{ info.name }}</h4>
            <div class="product-color" :style="{ background: colors[info.color]}"></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: "product",
        props: {
            info: Object
        },
        data () {
            return {
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e'
                }
            }
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
            }
        }
    };
</script>
<style scoped>
    .product{
        width: 25%;
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        position: relative;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .product-main:hover h4{
        color: #0070c9;
    }
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
</style>


