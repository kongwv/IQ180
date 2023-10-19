const express = require('express');
const app = express();
const _ = require('lodash');

const path = require('path');
const http = require('http');
const {Server} = require('socket.io');
const { Socket } = require('dgram');



const server = http.createServer(app);
const io = new Server(server)
app.use(express.static(path.resolve("")));


let Answer;
let arr=[]
let playingArray=[]
let thearray = []
let connectedArray=[]

io.on("connection",(socket)=>{
    console.log(socket.id)
    connectedArray.push({id:(socket.id),name:""})
    io.emit('admin',{ca:connectedArray})
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message',message) //send message to everyone that connected except the sender
    
    })


    socket.on('disconnect', () => {
        connectedArray = connectedArray.filter(e => (e.id != socket.id))
        io.emit('user-disconnected', {ca:connectedArray});
    })

    socket.on("find",(e)=>{


        if(e.name!=null){
            found = connectedArray.find((element) => element.id == socket.id);
            connectedArray[connectedArray.indexOf(found)].name = e.name
            console.log(connectedArray)
            arr.push(e.name)

            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1score:0
                }
                let p2obj={
                    p2name:arr[1],
                    p2score:0
                }
                let obj={
                    p1:p1obj,
                    p2:p2obj
                }
                playingArray.push(obj)
                

                arr.splice(0,2)
                turn = _.random(1,2)
                io.emit('admin',{ca:connectedArray})

                io.emit("find",{allPlayers:playingArray,turn:turn})

            }

        }

    })

   
    socket.on("setup",(e)=>{
        if(e.playct==0){
            thearray = []
            for(i=0;i<=5;i++){
                thearray.push(_.random(1,9))
            }
            Answer = _.random(1,100)
    
            io.emit("start",{thearray:thearray,Answer:Answer,turn:turn})
            }
        else{
            io.emit("start",{thearray:thearray,Answer:Answer,turn:turn})
        }
    })

    socket.on('round',(e)=>{
        try{
            if (eval(e.Solution) == Answer){
                check = true;
                
            }else{
                check = false;
            }
        }catch{
            check = false;
        }
        if(/\d{2}/.test(e.Solution)||!e.allused){
            check = false;
        }
        io.emit("done",{check:check,time:parseInt(e.time)})
    })

    socket.on("gameOver",(e)=>{
        playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.name)
    })

    socket.on('resetGame',()=>{
        io.emit('resetGame')
    })
})



app.get('/',(req,res)=>{
    return res.sendFile('./views/index.html',{root: __dirname});
});

app.get('/admin', (req, res) => {
    return res.sendFile('./views/admin.html',{root: __dirname})
});
 
server.listen(3000,()=>{
    console.log('port connected to 3000')
})

