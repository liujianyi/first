var app = require('http').createServer(handler)
var io = require('socket.io');

var fs = require('fs');

app.listen(8080,function(){
    console.log("server start in 8080...")
});
var ws = io.listen(app);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

ws.on('connection', function (socket) {
  
  socket.on('messages', function (data) {
    console.log(data);
    var datas=data.replace(/clien:/,"server:")
    socket.emit('news', datas);
  });
});
   