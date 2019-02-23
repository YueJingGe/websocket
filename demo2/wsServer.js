var ws = require('nodejs-websocket');
var port = 3000;

var server = ws.createServer(function(conn){
  console.log('new connect');
  conn.on('text', function(str) {
    console.log('接收数据', str);
    conn.sendText(str + '!!!');
  });
  conn.on('close', function(code, reason) {
    console.log('close connect');
  });
  conn.on('error', function(err) {
    console.log('抛出异常', err);
  });
}).listen(port);

console.log('websocket server listening on port' + port);