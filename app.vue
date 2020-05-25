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
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                 @click="handleToRecommend"
                 :class="{ on: type === 'recommend' }">每日推荐
            </div>
            <div class="daily-menu-item"
                 :class="{ on: type === 'daily' }"
                 @click="handleToDaliy">主题日报
            </div>
            <ul v-show="showThemes">
                <li v-for="item in themes">
                    <a
                            :class="{ on: item.id === themeId && type === 'daily' }"
                            @click="handleToTheme(item.id)">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref="list">
            <template v-if="type === 'recommend'">
                <div v-for="list in recommendList">
                    <div class="daily-date">{{ formatDay(list.date) }}</div>
                    <Item
                            v-for="item in list.stories"
                            :data="item"
                            :key="item.id"
                            @click.native="handleClick(item.id)"></Item>
                </div>
            </template>
            <template v-if="type === 'daily'">
                <Item
                        v-for="item in list"
                        :data="item"
                        :key="item.id"
                        @click.native="handleClick(item.id)"></Item>
            </template>
        </div>
        <daily-article :id="articleId"></daily-article>
    </div>
</template>
<script>
    import Item from './components/item.vue';
    import dailyArticle from './components/daily-article.vue';
    import $ from './libs/util';
    import axios from 'axios'
    export default {
        components: {Item, dailyArticle},
        data() {
            return {
                themes: [],
                showThemes: false,
                type: 'daily',
                recommendList: [

                ],
                dailyTime: $.getTodayTime(),
                list: [],
                themeId: 0,
                articleId: 0,
                isLoading: false
            }
        },
        methods: {
            handleToRecommend() {
                this.type = 'recommend';
                this.recommendList = [];
                this.dailyTime = $.getTodayTime();
                this.getRecommendList();
            },
            handleToDaliy(){
                this.type = 'daliy';
                this.showThemes = !this.showThemes
            },
            handleToTheme(id) {
            //改变菜单分类
                this.type = 'daily';
                //设置当前点击子类的主题日报 id
                this.themeId = id;
                //清空中间栏的数据
                this.list = [];
                $.ajax.get('theme/' + id).then(res => {
                    res.stories = [{
                        type: 0,
                        id: 7097426,
                        title: "人们在虚拟生活中投入的精力是否对现实生活的人际关系有积极意义？"
                    },
                        {
                            type: 0,
                            id: 7101963,
                            title: "写给想成成为心理咨询师的学生同仁",
                            images: ["http://picl.zhimg.com/xxx.jpg"]
                        }
                    ]
                // 过滤掉类型为1的文章，该类型下的文章为空
                    this.list = res.stories.filter(item => item.type !== 1);
                })
            },
            getThemes() {
                debugger;
                // $.ajax.get('/file/theme.json').then(res => {
                axios.get('/file/theme.json').then(res => {
                    this.themes = res.others;
                })
            },

            getRecommendList() {
            // 加载时设置为 true ，加载完成后置为 false
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('news/before/' + prevDay).then(res => {
                    res = {
                        date: " 20170502 ",
                        stories: [{
                            id: 9394848,
                            title: " 在庞大的体系中像齿轮一样工作 如何避免 '去能力化'？",
                            images: ["https//pic4.zhimg.com/xxx.jpg"],
                            ga_prefix: "050220",
                            type: 0
                        }]
                    }
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
            },
            formatDay(date) {
            // 转换为带汉字的月日
                let month = date.substr(4, 2);
                let day = date.substr(6, 2);
                if (month.substr(0, 1) === '0') month = month.substr(1, 1);
                if (day.substr(0, 1) === '0') day = day.substr(1, 1);
                return `${month} 月 ${day} 日`;
            },
            handleClick(id) {
                this.articleId = id;
            }
        },
        mounted() {
            this.getRecommendList();
            this.getThemes();
            // ／／获取到 DOM
            const $list = this.$refs.list;
            $list.addEventListener('scroll', () => {
            // 在“主题日报”或正在加载推荐列表时停止操作
                if (this.type === 'daily' || this.isLoading) return;
                // 己经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
                if
                (
                    $list.scrollTop + document.body.clientHeight >= $list.scrollHeight
                ) {
                //时间相对减少一天
                    this.dailyTime -= 86400000;
                    this.getRecommendList();
                }
            });
        }
    }
</script>
