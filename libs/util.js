/**
 * @class
 * @author    Administrator
 * @date      2020/5/21 10:38
 * @Copyright 迪科云起
 * @Description    util.js  项目中使用的工具函数在这里封装，
 */

import axios from 'axios'

//对axios的封装，写入请求地址的前缀，在业务中只用写相对路径，这样可以灵活控制。
//另外，可以全局拦截axios返回的数据，简单处理，只需返回我们需要的数据。

//基本配置
const Util = {
    imgPath: 'http://127.0.0.1:8011/img',
    apiPath: 'http://127.0.0.1:8010'
}
// 获取今天时间戳
Util.getTodayTime = function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

// 获取上一天日期
Util.prevDay = function (timestamp = (new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10
        ? '0' + date.getDate()
        : date.getDate();
    return year + '' + month + '' + day;
};

//Ajax通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
})

//添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
})

export default Util;
