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
    <div>
        <div class="header">
            <router-link to="/list"  class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                console.log(this.$store.state.cartList)
                return this.$store.state.cartList;
            }
        }
    }
</script>
