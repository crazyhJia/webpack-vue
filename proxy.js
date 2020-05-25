/**
 * @class
 * @author    Administrator
 * @date      2020/5/20 17:56
 * @Copyright 迪科云起
 * @Description   因为跨域限制，接口地址前缀开启了跨域限制，无法自前端直接使用，所以需要开发一个代理。
 *          跨域限制是服务端的一个行为，当开启对某些域名的访问限制后，只有同域或者指定域下的页面可以调用，这样相对来说安全，图片也可以防盗链，
 *          跨域限制一般子在浏览器端存在，对于服务器端或者IOS、Android等客户端是不存在的，使用代理是开发过程中一种常见的解决方案。
 */
const http = require('http');
const request = require('request');
const hostname = '127.0.0.1';
const port = 8081;
const imgPort = 8011;

//创建一个API代理服务
const apiServer = http.createServer((req, res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    const options = {
        url: url
    };
    function callback(error, response, body) {
        if(!error && response.statusCode === 200){
            //设置编码类型，否则中文会显示为乱码
            res.setHeader('Content-Type','text/plain;charset=UTF-8');
            //设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin','*');
            //返回代理后的内容
            res.end(body);
        }
    }
    request.get(options, callback);
});

//监听8010 端口  8010用于接口代理
apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在http://${hostname}:${port}/`);
});

//创建一个图片代理服务
const imgServer = http.createServer((req, res) => {
    const url = req.url.split('/img/')[1];
    const options = {
        url: url,
        encoding: null
    };
    function callback(error, response, body) {
        if(!error && response.statusCode === 200){
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(body);
        }
    }
    request.get(options, callback);
})

//监听8011端口   8081用于图片代理
imgServer.listen(imgPort, hostname, () => {
    console.log(`图片代理运行在http://${hostname}:${imgPort}/`);
});

//比如请求的真实接口为 http://news-at.zhihu.com/api/news/3892357, 开发时改写为 http://127.0.0.1:801O/news/3892357
// 图片的真实地址为 https://pic4.zhimg.com/v2-b446362affac97ccc0759a0f46f7f.jpg, 开发时改写为 http://127.0.0.1:8011/img/https://pic4.zhimg.com/v2-b44636ccd2affac97ccc0759a0f46f.jpg
//代理的核心是在返回的头部（response header ）中添加 Access-Con I-Allow-Origin 为“*”，也就是允许所有的域访问。



