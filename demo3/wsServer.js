var ws = require('nodejs-websocket');
var port = 3000;

var clientCount = 0;

var server = ws.createServer(function(conn){
  console.log('new connect');
  clientCount++;
  conn.nickName = 'user' + clientCount;
  var mes = {};
  mes.type = 'enter';
  mes.data = conn.nickName + ' common in';
  brodeCast(JSON.stringify(mes));
  conn.on('text', function(str) {
    console.log('接收数据', str);
    var mes = {};
    mes.type = 'message';
    mes.data = conn.nickName + ' says: ' + str;
    brodeCast(JSON.stringify(mes));
  });
  conn.on('close', function(code, reason) {
    console.log('close connect');
    var mes = {};
    mes.type = 'left';
    mes.data = conn.nickName + ' says: ' + ' common left';
    brodeCast(JSON.stringify(mes));
  });
  conn.on('error', function(err) {
    console.log('抛出异常', err);
  });
}).listen(port);

function brodeCast(str) {
  server.connections.forEach(function(connection){
    connection.sendText(str)
  })
};

console.log('websocket server listening on port' + port);
