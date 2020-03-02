var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/socketIO.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  }); //监听socket是否连接，如果连接的话，就发送数据，chat-message
  socket.on('disconnect', function(){
    console.log('user disconnected');
  }); //监听socket是否断开，断开时执行相应的方法
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});