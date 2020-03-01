let express = require('express');
let app = express();

app.use(express.static(__dirname));

app.get('/jsonp', function(req, res) {
  const { headers } = req;
  console.log(headers);
  const data = {
    data: '我是 jsonp 的 data',
  }

  const { cb } = req.query;

  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  if (cb) {
    res.end(`${cb}(${JSON.stringify(data)})`);
  } else {
    res.end('未传参数111');
  }
  
})

app.listen(3000, () => {
  console.log('服务器已经在3000端口启动');
});