import { io } from "socket.io-client";

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form-container');

const socket = io('http://localhost:3000');

let socket_id;

socket.on('connect', () => {
    displayMessage(`You are connected with id: ${socket.id}`);
    socket_id = socket.id;
});

socket.on('receive-message', message => {
    displayMessage(message);
})


form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if(message === '') return;
    displayMessage(message);
    socket.emit('send-message', message, room);

    messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value;
    socket.emit('join-room', room, message => {
        displayMessage(message);
    })
});

function displayMessage(message) {
    const div = document.createElement('div');
    div.setAttribute('id', 'your-message');
    div.textContent = socket_id + ': ' + message;
    document.getElementById('message-container').append(div);
}

function autoScroll() {
    document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
}

setInterval(autoScroll, 100);