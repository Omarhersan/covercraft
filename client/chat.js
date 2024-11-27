const socket = io('/');
const chat = document.getElementById('chat-box');
const message = document.getElementById('message');
const send = document.getElementById('trigger');

socket.emit('join', {
    username: 'user',
    room: 'room'
});


send.addEventListener('click', () => {
    socket.emit('messageSent', message.value);
  

    let messagedChat = document.createElement('div');
    messagedChat.innerHTML = message.value;
    messagedChat.className = 'messageSent';
    chat.appendChild(messagedChat);
    message.value = '';
});

socket.on('messageReceived', (data) => {
    let receivedChat = document.createElement('div');
    receivedChat.innerHTML = data;
    receivedChat.className = 'messageReceived';
    chat.appendChild(receivedChat);
});