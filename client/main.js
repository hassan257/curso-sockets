// var socket = io.connect('http://localhost:6677', {'forceNew': true});
var socket = io.connect('http://10.144.25.94:6677', {'forceNew': true});
socket.on('messages', function(data){
    // console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return(`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    // console.log('nickname', document.getElementById('nickname'));
    // console.log('valorNickname', document.getElementById('nickname').value);
    var message = {
        nickname : document.getElementById('nickname').value,
        text : document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}