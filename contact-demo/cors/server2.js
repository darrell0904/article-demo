let express = require('express');
let app = express();

const cookieParase = require('cookie-parser');
//这点很重要，如果没有，下面的req.cookies 会返回undefined
app.use(cookieParase());

let whiteList = ['http://localhost:3000']

app.all('*', function (req, res, next) {
  let origin = req.headers.origin;

  if (whiteList.includes(origin)) {
    // 设置哪个源访问
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 允许前端携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'name,key');
    // 允许哪个方法访问
    res.header("Access-Control-Allow-Methods","PUT");
    // 允许携带 cookie
    res.header("Access-Control-Allow-Credentials", true);
    // 允许前端获取哪个头
    res.header("Access-Control-Expose-Headers", 'name');
    // 用来指定本次预检请求的有效期，单位为秒
    res.header("Access-Control-Max-Age","6");
  } else {
    res.end('你不在白名单中');  
  }

  next();
});

app.get('/getData', function(req, res) {
  // console.log(req.cookies);

  // res.cookie('user', 'maolei');
  res.setHeader('name', 'maolei');

  const data = {
    data: '我是 cors 的 data',
  }

  res.end(JSON.stringify(data));  
})

// 修改文件
// 发送与预请求
// options 请求
// http://www.ruanyifeng.com/blog/2016/04/cors.html
// chorme 无法显示 options
// https://blog.csdn.net/willingtolove/article/details/104461912

app.put('/getData', function(req, res) {
  console.log(req.headers);

  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  const data = {
    data: '我是 cors 的 data',
  }

  res.end(JSON.stringify(data));  
})

app.post('/getData', function(req, res) {
  console.log(req.headers);

  const data = {
    data: '我是 cors 的 data',
  }

  res.end(JSON.stringify(data));  
})

app.listen(4000, () => {
  console.log('服务器 2 已经在 4000 端口启动');
});