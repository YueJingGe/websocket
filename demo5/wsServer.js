var app = require('http').createServer();
var io = require('socket.io')(app);
var port = 3000;
var clientCount = 0;

app.listen(port);

io.on('connection', function(socket){
  clientCount++;
  socket.nickName = 'user' + clientCount;

  io.emit('enter', socket.nickName + ' common in')

  socket.on('message', function(str){
    io.emit('message', socket.nickName + ' says: ' + str)
  })
  socket.on('left', function(str) {
    io.emit('left', socket.nickName + ' says: ' + str)
  })
  socket.on('error', function(err) {
    console.log('抛出异常', err);
  })
})

console.log('websocket server listening on port' + port);
