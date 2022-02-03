// const nodemon = require("nodemon");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('client'));
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola Mundo desde una ruta');
});
var messages = [
    {
        id: 1,
        text: "Bienvenido al Chat Privado de Socket.IO y NodeJS de Hassan Franco",
        nickname: 'Bot - HFR'
    }
];
io.on('connection', function(socket){
    console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado...');
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
server.listen(6677, function(){
    console.log('El servidor esta funcionando en http://localhost:6677');
});