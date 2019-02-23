var app = require('http').createServer();

var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function(socket){
  // socket.io优点1：可直接传递对象
  socket.emit('news', {hello: 'world'});
  // socket.io优点2：接收任何自定义事件
  socket.on('my other event', function(data){
    console.log('接收前台传递过来的数据：', data);
  })
})