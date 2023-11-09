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
let connectedArray=[]
let questionset = {
    1 : [1, 2, 3, 4, 5, 20, '5 * 4 + 1 + 2 - 3'],
    2 : [5, 4, 9, 8, 2, 99, '( 8 + 2 )* 9 + 5 + 4'],
    3: [1, 5, 3, 4, 8, 24, '(8 + 4) * (5 - 3) / 1'],
    4: [2, 7, 6, 1, 9, 11, '(7 - 1) * (9 + 2) / 6'],
    5: [4, 2, 5, 7, 8, 18, '(8 - 2) * (7 + 5) / 4'],
    6: [1, 9, 3, 2, 6, 15, '(9 - 6) * (2 + 3) / 1'],
    7: [3, 1, 4, 6, 2, 23, '(6 * 2) + (4 * 3) - 1'],
    8: [3, 7, 5, 1, 9, 61, '(7 * 9) - (5 + 1) / 3'],
    9: [2, 8, 6, 4, 1, 24, '(8 - 6) * (2 + 1) * 4'],
    10: [4, 6, 2, 9, 3, 75, '(6 * 2) + (4 + 3) * 9'],
    11: [1, 5, 8, 3, 7, 59, '(8 - 3) * (5 + 7) - 1'],
    12: [2, 7, 1, 6, 3, 27, '(7 - 1) * (6 + 3) / 2'],
    13: [5, 9, 2, 4, 8, 58, '(5 + 9) * (8 - 4) + 2'],
    14: [1, 8, 4, 7, 6, 38, '(8 - 4) * (7 + 1) + 6'],
    15: [3, 2, 7, 4, 5, 32, '(4 * 2) * (7 + 5) / 3'],
    16: [6, 4, 1, 2, 8, 40, '(8 * 4) + (6 + 2) / 1'],
    17: [9, 3, 7, 2, 1, 58, '(7 * 9) - (3 + 2) / 1'],
    18: [5, 2, 9, 3, 6, 47, '(9 * 3) + (6 - 2) * 5'],
    19: [7, 4, 2, 8, 1, 49, '(7 * 8) - 4 - 2 - 1'],
    20: [3, 9, 6, 1, 5, 69, '(9 * 5) + (6 * (3 + 1))'],
    21: [5, 3, 2, 4, 1, 15, '1 + 2 + 3 + 4 + 5'],
    22: [1, 5, 5, 5, 5, 625, '(5 *5 ) *(5 * 5) * 1'],
    23: [6, 1, 2, 5, 5, 58, '(1 + 5 + 6) * 5 - 2'],
    24: [4, 8, 3, 5, 9, 31, '(9 / 3) + (5 * 4) + 8'],
    25: [3, 2, 5, 3, 3, 1, '(3 + 2) / 5 + 3 -3'],
    26: [5, 8, 2, 2, 4, 11, '(5 * 8 + 2 + 2) / 4'],
    27: [7, 7, 1, 6, 3, 47, '7 * 7 + 1 - 6 + 3'],
    28: [6, 1, 4, 5, 2, 15, '6 - 1 + (4*5) / 2'],
    29: [8, 2, 4, 6, 6, 64, '(8 * 2 * 4) -6 + 6'],
    30: [9, 0, 3, 3, 4, 0, '(9 * 0 + 3 - 3) / 4'],
    31: [7, 6, 8, 5, 1, 1,'(7 * 6) - (8 * 5) - 1'],
    32: [5, 5, 5, 5, 1, 3, '(5 * 5 - 5)/ 5 - 1'],
    33: [2, 1, 1, 1, 1,  2, '2 - 1 - 1 + 1 + 1'],
    34: [1, 3, 5, 7, 9, 25, '1 + 3 + 5 + 7 + 9'],
    35: [4, 3, 3, 2, 3, 69, '4 * 3 * 3 * 2 - 3'],
    36: [9, 9, 1, 8, 8, 18, '(9 * 9 - 1) / 8 + 8'],
    37: [2, 7, 4, 8, 7, 66, '(2 * 7) - 4 + (8 * 7)'],
    38: [3, 1, 7, 5, 5, 100,'(3 * 1 * 7 * 5) - 5'],
    39: [8, 4, 2, 1, 9, 0, '((8 / 4) / 2 - 1) * 9'],
    40 : [4,9,9,2,1,73,'((9*9)-(4*2))*1'],
    41 : [5,1,8,3,1,24,'(5*3)+(8*1)+1'],
    42 : [0,4,9,5,9,29,'(5*4)+(9*0)+9'],
    43 : [7,2,5,9,1,40,'7*(9+1)/2+5'],
    44 : [5,8,2,6,9,100,'(9*8)-2+(5*6)'],
    45 : [3,7,1,9,4,59,'9+1+7*(4+3)'],
    46 : [2,6,1,8,3,41,'(8*6)-(3*2)-1'],
    47 : [4,7,2,5,9,26,'5*4/2+9+7'],
    48 : [3,9,1,7,2,75,'(9+1)*7+(3+2)'],
    49 : [6,2,8,4,5,13,'(8*5)/4+(6/2)'],
    50 : [1,9,5,3,7,60,'((9+1)*5+3+7)'],
    51 : [2,6,3,8,4,300,'(8+2)*(6+4)*3'],
    52 : [4,7,2,9,6,360,'(6/2+7)*(9*4)'],
    53 : [3,8,1,6,4,20,'4+3+8+6-1'],
    54 : [3,6,9,2,4,75,'9*(6+3)-4-2'],
    55 : [8,1,7,2,6,25,'(8*7-6)/2*1'],
    56 : [5,2,9,3,7,91,'(7+3)*(5*2)-9'],
    57 : [4,8,1,6,2,20,'2*1+8+4+6'],
    58 : [7,2,6,9,5,30,'6*5+9-2-7'],
    59 : [3,7,1,8,6,480,'(7+3)*1*(6*8)'],
    60 : [2,9,6,4,7,18,'(9*6-4)/2-7'],
    61 : [9,6,3,2,8,10,'8/2+3+9-6'],
    62 : [4,7,2,6,9,10,'6*4/2+7-9'],
    63 : [2,9,5,8,3,240,'8*5/2*(9+3)'],
    64 : [8,3,2,5,7,25,'5+2+(3+7)+8'],
    65 : [1,6,4,9,2,10,'(1+6+4+9)/2'],
    66 : [2,8,7,6,3,187,'(8+2)*6*3+7'],
    67 : [9,2,5,8,6,8,'9+2-5-6+8'],
    68 : [1,7,3,6,2,84,'(1+2+3+6)*7'],
    69 : [8,2,6,5,4,240,'(6+5+4)*2*8'],
    70 : [9,6,3,7,2,15,'((9-6)+7)/2*3'],
    71 : [3,8,3,6,7,105,'(8-3)*7*(6-3)'],
    72 : [4,9,2,5,7,1,'9-(7-5)-2-4'],
    73 : [3,7,2,6,5,55,'7*6-2+5*3'],
    74 : [3,6,8,2,1,100,'(3+6+1)*(8+2)'],
    75 : [1,7,4,9,2,130,'(9+1)*(7+4+2)'],
    76 : [2,8,5,6,4,34,'8/4*2+5*6'],
    77 : [9,2,5,8,6,49,'8+2+(6*5)+9'],
    78 : [1,7,3,6,2,54,'7*(6+1)+3+2'],
    79 : [8,2,6,5,4,200,'8*5*(6+4)/2'],
    80 : [9,6,3,2,8,93,'9*(3+2)+(6*8)' ],
    81 : [1,8,3,6,7,5,'7-6-1+8-3'],
    82 : [4,9,2,5,7,10,'(7*(5+2)-9)/4'],
    83 : [2,9,5,8,3,85,'(3+2)*8+9*5'],
    84 : [3,6,2,4,1,35,'6*(3+2)+4+1'],
    85 : [4,6,9,2,5,80,'(4+6)*9-10'],
    86 : [3,7,1,8,6,25,'1+8+6+7+3'],
    87 : [2,8,4,6,1,110,'(8+2)*(4+6+1)'],
    88 : [1,7,2,9,5,135,'(1+7+2+5)*9'],
    89 : [9,6,3,2,5,88,'(6+3)*9+2+5'],
    90 : [4,8,2,6,7,140,'(8+2+6+4)*7'],
    91 : [9,3,6,2,7,2,'(7+2+9)/(3+6)'],
    92 : [7,3,9,6,8,840,'(3+8+9)*(6*7)'],
    93 : [3,7,2,6,5,420,'(7*6)*(5+2+3)'],
    94 : [6,8,3,2,7,310,'(8*7+6)*(2+3)'],
    95 : [4,6,9,5,7,12,'((9*5)-(7*6))*4'],
    96 : [3,6,2,4,1,25,'3*6+2+4+1'],
    97 : [2,5,1,9,4,25,'5*2*(9+1)/4'],
    98 : [3,8,2,1,7,232,'(8*7+2)*(3+1)'],
    99 : [1,4,7,2,9,756,'4*7*(2+1)*9'],
    100 : [2,6,8,3,1,384,'8*6*2*(3+1)'],
    }
    
let i

io.on("connection",(socket)=>{
    console.log(socket.id)
    connectedArray.push({id:(socket.id),name:""})
    io.emit('admin',{ca:connectedArray})
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message',message) //send message to everyone that connected except the sender
        
    })
    
    socket.on('Surrender',(e)=>{
        io.emit("surrendered",{surrendername:e.name})
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
            arr.push([e.name,e.avatar])
            
            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0][0],
                    p1avatar:arr[0][1],
                    p1score:0
                }
                let p2obj={
                    p2name:arr[1][0],
                    p2avatar:arr[1][1],
                    p2score:0
                }
                let obj={
                    p1:p1obj,
                    p2:p2obj
                }
                playingArray.push(obj)
                
                arr.splice(0,2)
                turn = _.random(1,2)
                console.log(playingArray)
                io.emit('admin',{ca:connectedArray})
                io.emit("find",{allPlayers:playingArray,turn:turn})
                
            }
            
        }
        
    })
    
    
    socket.on("setup",(e)=>{
        if(e.playct==0){
            
            i = _.random(1,100);
            Answer = questionset[i][5]
            
            // thearray = []
            // for(i=0;i<=5;i++){
            //     thearray.push(_.random(1,9))
            // }
            // Answer = _.random(1,100)
            // io.emit("start",{thearray:thearray,Answer:Answer,turn:turn})
        }
        else{
            //io.emit("start",{thearray:thearray,Answer:Answer,turn:turn})
        }
        io.emit("start",{thearray:questionset[i],turn:turn})
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

app.get('/rule', (req, res) => {
    return res.sendFile('./views/rule.html',{root: __dirname})
});

app.get('/aboutUs', (req, res) => {
    return res.sendFile('./views/aboutUs.html',{root: __dirname})
});

server.listen(3000,()=>{
    console.log('port connected to 3000')
})

//server.listen(3000)
//server.listen(3000,"192.168.1.47") //<-- change ip address
