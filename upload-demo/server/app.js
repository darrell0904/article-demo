var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var fs = require('fs');
var Koa = require('koa2');
const bodyParser = require('koa-bodyparser')


var app = new Koa();
var port = process.env.PORT || '3000';

var uploadHost= `http://localhost:${port}/uploads/`;

app.use(koaBody({
    formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下  
        uploadDir: path.resolve(__dirname, '../static/uploads')
    },
    multipart: true // 支持文件上传
}));

app.use(bodyParser());

app.use(koaStatic(
    path.resolve(__dirname, '../static')
));

//允许跨域
app.use(async (ctx, next) => {
  console.log('----ctx.headers.origin----', ctx.headers.origin);
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set("Access-Control-Max-Age", 864000);
  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  await next();
})

//二次处理文件，修改名称
app.use((ctx) => {
  console.log(ctx.request.files);
  var body = ctx.request.body;
  var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
  var result=[];
  var fileToken = ctx.request.body.token;// 文件标识
  var fileIndex=ctx.request.body.index;//文件顺序

  console.log('files');
  console.log(files);
  console.log('=-====', ctx.request.body);
  console.log(fileToken);
  console.log(fileIndex);


  if(files &&  !Array.isArray(files)){//单文件上传容错
      files=[files];
  }

  files && files.forEach(item=>{
      var path = item.path.replace(/\\/g, '/');
      var fname = item.name;//原文件名称
      var nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
      if (item.size > 0 && path) {
          //得到扩展名
          var extArr = fname.split('.');
          var ext = extArr[extArr.length - 1];
          //var nextPath = path + '.' + ext;
          //重命名文件
          fs.renameSync(path, nextPath);

          result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
      }
  });

  ctx.body = `{
      "fileUrl":${JSON.stringify(result)}
  }`;

  if(body.type==='merge'){
      //合并文件
      var filename = body.filename,
      chunkCount = body.chunkCount,
          folder = path.resolve(__dirname, '../static/uploads')+'/';
      
      var writeStream = fs.createWriteStream(`${folder}${filename}`);

      var cindex=0;
      //合并文件
      function fnMergeFile(){
          var fname = `${folder}${cindex}-${fileToken}`;
          var readStream = fs.createReadStream(fname);

          readStream.pipe(writeStream, { end: false });
          readStream.on("end", function () {
              fs.unlink(fname, function (err) {
                  if (err) {
                      throw err;
                  }
              });
              if (cindex+1 < chunkCount){
                  cindex += 1;
                  fnMergeFile();
              }
          });
      }

      try {
          fnMergeFile();
      } catch (error) {
          
      }
   

      ctx.body='merge ok 200';
  }
});

/**
 * Create HTTP server.
 */
 var server = http.createServer(app.callback());
 server.listen(port);
 console.log('demo13 server start ......   ');
