let express = require('express');
let app = express();
const cookieParase = require('cookie-parser');
//这点很重要，如果没有，下面的req.cookies 会返回undefined
app.use(cookieParase());

app.use(express.static(__dirname));

app.get('/getMoney', function(req, res) {
  const { username } = req.cookies;
  const cookies1 = req.headers.cookie;
  const { name } = req.query;

  // console.log(req.cookies);
  // console.log(req.headers);
  // console.log('--cookies1---', cookies1);

  console.log(req.headers.referer);

  const data = {
    data: 'you got 1000 万',
  }

  console.log('---name---', name);

  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  if (username && username == "John Smith") {
    res.end(JSON.stringify(data));
  } else {
    res.end('请登录');
  }
})

app.listen(3000, () => {
  console.log('服务器 1 已经在3000端口启动');
});