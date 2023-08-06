const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000

const http = require('http').createServer(app);

let name;
let password;

app.use(express.static(__dirname+'/public/'))

http.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
});

app.get("/",(req,resp) => {
    resp.sendFile(__dirname+'/login.html');
})

app.post("/home",(req,resp)=>{
    name = req.name
    password = req.password
    resp.sendFile(__dirname+'/index.html')
})

// app.get("/",(req,resp)=>{
//     resp.sendFile(__dirname+'/index.html');
// })


const SocketIo = require('socket.io')(http)

SocketIo.on('connection', (socket) => {
    console.log("connected.....")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
        console.log(msg);
    })
})


module.exports = name;