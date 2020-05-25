<comment>
    /**
    * @module
    * @author Administrator
    * @date 2020/5/22 11:51
    * @copyright 迪科云起
    * @description
    */
</comment>
<template>
    <div class="daily-article">
        <div class="daily-article-title">{{ data.title }}</div>
        <div class="daily-article-content" v-html="data.body"></div>
        <div class="daily-comments" v-show="comments.length">
            <span>评论（{{ comments.length }}）</span>
            <div class="daily-comment" v-for="comment in comments">
                <div class="daily-comment-avatar">
                    <img :src="comment.avatar">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{ comment.author }}</div>
                    <div class="daily-comment-time" v-time="comment.time"></div>
                    <div class="daily-comment-text">{{ comment.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Time from '../directives/time';
    import $ from '../libs/util';
    export default {
        name: "daily-article",
        directives: { Time },
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                data: {
                    title: "这茶明显是用了梅雨期的雨水,我还是喜欢用腊月的雪水",
                    body: "文章内容,格式为html",
                    id: 9395306,
                    type: 0,
                    image: "https://pic3.zhimg.com/v2-dbf5d6e5eeeccaacc67af4d625e0699a.jpg",
                    image_source: "T.Tseng / CC BY",
                    images: [" https://pic4.zhimg.com/v2-Scb4fcbd56bb6717969e9967829929b7.jpg"],
                    share_url: "http://daily.zhihu.com/story/9395306 ",
                    ga_prefix: "050311",
                    js: [],
                    css: [" http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"]
                },
                comments: [{
                    author: "滕正云",
                    conte: "善泳者溺于水佩服于极限运动者,勇气但我想这应该是小圈子内的英雄",
                    avatar: "http://picl.zhimg.com/xxx.jpg",
                    time: 1493788345,
                    id: 28885287,
                    likes: 0
                },
                    {
                    author: "二货",
                conte: "善泳者溺于水佩服于极限运动者,勇气但我想这应该是小圈子内的英雄",
                avatar: "http://picl.zhimg.com/xxx.jpg",
                time: 1493788345,
                id: 28885287,
                likes: 0
        }]
            }
        },
        methods: {
            getArticle () {
                $.ajax.get('news/' + this.id).then(res => {
                // 将文章的中的图片地址替换为代理的地址
                    res.body = res.body
                        .replace(/src="http/g, 'src="' + $.imgPath + 'http');
                    res.body = res.body
                        .replace(/src="https/g, 'src="' + $.imgPath + 'https');
                    this.data = res;
                    // 返回文章顶端
                    window.scrollTo(0, 0);
                    this.getComments();
                })
            },
            getComments () {
                this.comments = [];
                $.ajax.get('story/' + this.id + '/short-comments').then(res => {
                    this.comments = res.comments.map(comment => {
                        // 将头像的图片地址转为代理地址
                        comment.avatar = $.imgPath + comment.avatar;
                        return comment;
                    });
                })
            }
        },
        watch: {
            id (val) {
                if (val) this.getArticle();
            }
        }
    };
</script>

<style scoped>

</style>
