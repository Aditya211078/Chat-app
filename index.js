const socket=io('http://localhost:8001');

const form=document.getElementById('send');
const messageContainer=document.querySelector('.container')
const messageInput=document.getElementById('message')


const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
}

const name=prompt("Enter your name to join");

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    append(messageInput.value,'right');
    socket.emit('send',messageInput.value);
    messageInput.value="";
})