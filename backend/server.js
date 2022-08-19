const io=require('socket.io')(8001,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
require('cors')
const users={}
// io.on refers to all the connections possible //
io.on('connection',socket=>{
    //  socket.on refers to a particular connection //
    socket.on('new-user-joined',name=>{
        console.log(name)
       users[socket.id]=name;
       socket.broadcast.emit('user-joined',name)
    })

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    })
})