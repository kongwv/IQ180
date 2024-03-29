
document.getElementById("game").style.display = "none"
document.getElementById("loading").style.display = "none"
document.getElementById("setting").style.display = "none"
document.getElementById("lobbyBTN").style.display = "none"
document.getElementById("Chat").style.display = "none"
document.getElementById("chatBTN").style.display = "none"
document.getElementById("showpaperBTN").style.display = "none";



document.getElementById("settingBTN").addEventListener("click", function() {
    document.getElementById("lobbyBTN").style.display = "block"
    document.getElementById("setting").style.display = "block";
    document.getElementById("settingBTN").style.display = "none"
    document.getElementById("chatBTN").style.display = "none"
    document.getElementById("game").style.display = "none"
    document.getElementById("lobby").style.display = "none"
    document.getElementById("GO").style.display = "none" 
    document.getElementById("avatarContainer").style.display = "none"
    document.getElementById("selectedAvatar").style.display = "none"
    document.getElementById("textavatar").style.display = "none"
    document.getElementById("showpaperBTN").style.display = "none";
    
}) 

document.getElementById("lobbyBTN").addEventListener("click", function() {
    document.getElementById("lobbyBTN").style.display = "none"
    document.getElementById("setting").style.display = "none";
    document.getElementById("settingBTN").style.display = "block"
    document.getElementById("game").style.display = "none"
    document.getElementById("lobby").style.display = "block"
    document.getElementById("GO").style.display = "none"
    document.getElementById("chatBTN").style.display = "none"
    document.getElementById("avatarContainer").style.display = "block"
    document.getElementById("selectedAvatar").style.display = "block"
    document.getElementById("textavatar").style.display = "block"
    document.getElementById("showpaperBTN").style.display = "none";
    
})

document.getElementById('find').addEventListener("click", function () {
    name = document.getElementById("name").value
    if (name == null || name == '') {
        alert("Please enter a name")
    }
    else {
        
        socket.emit("find", { name: name , avatar: document.getElementById("selectedAvatar").src})
        
        document.getElementById("loading").style.display = "block"
        document.getElementById("find").disabled = true;
        
    }
})
let foundObject;

let P1name =""
let P2name =""

socket.on("find", (e) => {
    alert("Welcome"+ " "+name)
    
    
    let allPlayersArray = e.allPlayers
    
    
    foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);
    P1name = foundObject.p1.p1name
    P2name = foundObject.p2.p2name
    P1avatar = foundObject.p1.p1avatar
    P2avatar = foundObject.p2.p2avatar
    
    
    if (name == P1name||name == P2name) {
        
        setup(e)
        if(e.turn==1){
            document.getElementById("turn").innerText = (P1name + "'s Turn")
        }else{
            document.getElementById("turn").innerText = (P2name + "'s Turn")
        }
        changeturn()
    }
})


let Solution = "";
let track = [];
let playct = 0;
let array = []
let Ans

document.getElementById("start").addEventListener("click",function(){
    document.getElementById("submit").disabled = false
    document.getElementById("start").disabled=true;
    document.querySelectorAll(".Q,.O").forEach(e=>e.disabled=false)
    document.getElementById("back").disabled=false;
    document.getElementById("sol").innerText = "";
    Solution = "";
    track = [];
    
    socket.emit("setup",{playct:playct});
    
    //setup question
    socket.on("start",(e)=>{
        array = e.thearray
        let i = 0;
        document.querySelectorAll(".Q").forEach(x=>{
            x.innerText=array[i];
            i++;
        })
        document.getElementById("answer").innerText=array[5];
        //     array = e.thearray
        //     Ans = e.Answer
        //     let i = 0;
        //     document.querySelectorAll(".Q").forEach(x=>{
        //         x.innerText=array[i];
        //         i++;
        //     })
        //     document.getElementById("answer").innerText=Ans;
    })
    
    //set timer 
    document.getElementById("time").style.color = "white";
    let timer = parseInt(document.getElementById("timer").innerText);
    int = setInterval(()=> {
        timer--;
        document.getElementById("timer").innerText = timer;
        if(timer <=10){
            document.getElementById("time").style.color = "red";
            if(document.getElementById("playMusicBTN").disabled){
                document.getElementById("music").src="/sounds/clockticking.mp3";
                document.getElementById("music").play();
                document.getElementById("music").playbackRate=1;
            }
        }
        if(timer == 0){
            clearInterval(int);
            if(document.getElementById("playMusicBTN").disabled){
                document.getElementById("music").playbackRate=1;
                document.getElementById("music").src="/sounds/solve-the-riddle.mp3";
                document.getElementById("music").play();
            }
            alert("time up!! please click submit");
            document.querySelectorAll(".Q,.O").forEach(e=>e.disabled=true)
            document.getElementById("back").disabled=true;
        }
    }, 1000);
})

document.getElementById("sol").innerText = Solution;
document.querySelectorAll(".Q,.O").forEach(e=>{
    e.addEventListener("click",function(){
        if(e.className=="Q" ){
            e.disabled=true;
            track.push(e.id);
        }
        let value = e.innerText;
        Solution = Solution.concat(value);
        document.getElementById("sol").innerText = Solution;
        
        
    })
})

document.getElementById('back').addEventListener("click",function(){
    
    if(['1','2','3','4','5','6','7','8','9'].includes(Solution.slice(-1))){
        document.getElementById(track.pop()).disabled=false;
        
    }
    Solution = Solution.slice(0,-1);
    document.getElementById("sol").innerText = Solution;
    
})
let P1Correct = false;
let P2Correct = false;
let P1time = 0;
let P2time = 0;

document.getElementById("submit").addEventListener("click", function () {
    if(document.getElementById("playMusicBTN").disabled){
        document.getElementById("music").playbackRate=1;
        document.getElementById("music").src="/sounds/solve-the-riddle.mp3";
        document.getElementById("music").play();
    }
    let allused = false;
    clearInterval(int); //stop timer
    //check if all number are used
    if(document.getElementById("Q1").disabled && document.getElementById("Q2").disabled && document.getElementById("Q3").disabled && document.getElementById("Q4").disabled && document.getElementById("Q5").disabled  ){   
        allused = true;
    }
    document.getElementById("start").disabled = false;
    alert("Submitted");
    document.querySelectorAll(".Q,.O").forEach(e => e.disabled = true);
    document.getElementById("back").disabled = true;
    
    socket.emit('round', { Solution: Solution ,time:document.getElementById("timer").innerText, allused:allused})
})

socket.on('done', (e) => {
    if (playct == 0) {
        if (e.check) {
            if (document.getElementById("turn").innerText == (P1name + "'s Turn")) {
                alert("P1 correct!!");
                P1time=e.time
                P1Correct = true;
                document.getElementById("turn").innerText = (P2name + "'s Turn");
            } else {
                alert("P2 correct!!");
                P2time=e.time
                P2Correct = true;
                document.getElementById("turn").innerText = (P1name + "'s Turn");
            }
        } else {
            if (document.getElementById("turn").innerText == (P1name + "'s Turn")) {
                alert("P1 wrong!!");
                document.getElementById("turn").innerText = (P2name + "'s Turn");
            } else {
                alert("P2 wrong!!");
                document.getElementById("turn").innerText = (P1name + "'s Turn");
            }
        }
    } else {
        if (e.check) {
            if (document.getElementById("turn").innerText == (P1name + "'s Turn")) {
                alert("P1 correct!!");
                P1Correct = true;
                P1time=e.time
                
            } else {
                alert("P2 correct!!");
                P2Correct = true;
                P2time=e.time
                
            }
        } else {
            if (document.getElementById("turn").innerText == (P1name + "'s Turn")) {
                alert("P1 wrong!!");
                
            } else {
                alert("P2 wrong!!");
                
            }
        }
        
        if (P1Correct && P2Correct) {
            console.log(P1time, P2time);
            if (P1time > P2time) {
                alert("P1 got a point!!");
                foundObject.p1.p1score++;
                document.getElementById("score1").innerText = foundObject.p1.p1score;
                document.getElementById("turn").innerText = (P1name + "'s Turn");
                document.getElementById("timer").innerText = 60;
            } else if (P1time < P2time) {
                alert("P2 got a point!!");
                foundObject.p2.p2score++;
                document.getElementById("score2").innerText = foundObject.p2.p2score;
                document.getElementById("turn").innerText = (P2name + "'s Turn");
                document.getElementById("timer").innerText = 60;
            } else {
                alert("It's a tie!!");
                document.getElementById("score1").innerText = foundObject.p1.p1score;
                document.getElementById("score2").innerText = foundObject.p2.p2score;
                document.getElementById("timer").innerText = 60;
                document.getElementById("turn").innerText = (P1name + "'s Turn");
            }
        } else if (P1Correct && !P2Correct) {
            alert("P1 got a point!!");
            foundObject.p1.p1score++;
            document.getElementById("score1").innerText = foundObject.p1.p1score;
            document.getElementById("turn").innerText = (P1name + "'s Turn");
            document.getElementById("timer").innerText = 60;
        } else if (!P1Correct && P2Correct) {
            alert("P2 got a point!!");
            foundObject.p2.p2score++;
            document.getElementById("score2").innerText = foundObject.p2.p2score;
            document.getElementById("turn").innerText = (P2name + "'s Turn");
            document.getElementById("timer").innerText = 60;
        } else {
            alert("No one gets a point!!");
            document.getElementById("timer").innerText = 60;
            document.getElementById("turn").innerText = (P1name + "'s Turn");
        }
        
        P1Correct = false;
        P2Correct = false;
    }
    
    if  (playct == 1) {
        playct = 0;
    } else {
        playct++
    }
    reset();
    changeturn();
    check();
})

socket.on('resetGame',()=>{
    // foundObject.p1.p1score = 0;
    // foundObject.p2.p2score = 0;
    // document.getElementById("score1").innerText = foundObject.p1.p1score;
    // document.getElementById("score2").innerText = foundObject.p2.p2score;
    // reset();
    // playct = 0;
    // document.getElementById("timer").innerText = 60;
    // clearInterval(int);
    // document.getElementById("start").disabled = false;
    location.reload()
    socket.emit("gameOver",{name:P1name})
    
    
    
})

document.getElementById("surrender").addEventListener("click", function (){
    clearInterval(int);
    socket.emit("Surrender",{name:name})
    
})
socket.on('surrendered',(e)=>{
    if(e.surrendername==P1name){
        surrender(P1name)
    }
    if(e.surrendername==P2name){
        surrender(P2name)
    }
})

function reset(){
    document.querySelectorAll(".Q").forEach(e=>e.innerText="")
    document.getElementById("O1").innerText="+"
    document.getElementById("O2").innerText="-"
    document.getElementById("O3").innerText="*"
    document.getElementById("O4").innerText="/"
    document.getElementById("O5").innerText="("
    document.getElementById("O6").innerText=")"
    document.getElementById("sol").innerText=""
    document.getElementById("answer").innerText=""
    document.getElementById("submit").disabled = true
}

function check(){
    if (foundObject.p1.p1score == 3){
        
        win(P1name,P1avatar)
    }
    else if (foundObject.p2.p2score == 3){
        
        win(P2name,P2avatar)
    }
}


function changeturn(){
    if(document.getElementById("turn").innerText==(P1name + "'s Turn")&&name==P2name){
        document.getElementById("com").style.display = "none";
    } 
    else if(document.getElementById("turn").innerText==(P2name + "'s Turn")&&name==P1name){
        document.getElementById("com").style.display = "none";
    }
    else if(document.getElementById("turn").innerText==(P2name + "'s Turn")&&name==P2name){
        document.getElementById("com").style.display = "block";
    }
    else if(document.getElementById("turn").innerText==(P1name + "'s Turn")&&name==P1name){
        document.getElementById("com").style.display = "block";
    }
    
}

function setup(){
    foundObject.p1.p1score = 0
    foundObject.p2.p2score = 0
    document.getElementById("GO").style.display = "none"
    document.getElementById("game").style.display = "block"
    document.getElementById("lobby").style.display = "none"
    document.getElementById("GO").style.display = "none"
    document.getElementById("settingBTN").style.display = "none"
    document.getElementById("Chat").style.display = "none"
    document.getElementById("ruleBTN").style.display = "none"
    document.getElementById("abtusBTN").style.display = "none"
    document.getElementById("chatBTN").style.display = "block"
    document.getElementById("avatarContainer").style.display = "none"
    document.getElementById("textavatar").style.display = "none"
    document.getElementById("selectedAvatar").style.display = "none"
    document.getElementById("showpaperBTN").style.display = "block";
    document.getElementById("dpaper").style.display = "block";
    
    document.getElementById("P1Avatar").src = P1avatar
    document.getElementById("P2Avatar").src = P2avatar
    document.getElementById("user1Name").innerText = P1name
    document.getElementById("user2Name").innerText = P2name
    document.getElementById("score1").innerText = foundObject.p1.p1score
    document.getElementById("score2").innerText = foundObject.p1.p1score
    document.querySelectorAll(".Q,.O").forEach(e => e.disabled = true);
    document.getElementById("back").disabled = true;
    document.getElementById("submit").disabled = true;
}

function win(x,y){
    document.getElementById("com").style.display = "none";
    document.getElementById("winAvatar").src = y;
    document.getElementById('winner').innerText = x + " Win!!!";
    document.getElementById("GO").style.display = "grid";
    document.getElementById("Chat").style.display = "none";
    document.getElementById("dpaper").style.display = "none";
    document.getElementById("bh").addEventListener('click',function(){
        location.reload()
        socket.emit("gameOver",{name:P1name})
    })
    document.getElementById("pa").addEventListener('click',function(){
        setup()
        changeturn()
    })
    
}

function surrender(x){
    document.getElementById("com").style.display = "none"
    document.getElementById("winAvatar").style.display = "none"
    document.getElementById('winner').innerText = x + " Surrender!!";
    document.getElementById("GO").style.display = "grid"
    document.getElementById("Chat").style.display = "none"
    document.getElementById("dpaper").style.display = "none";
    document.getElementById("bh").addEventListener('click',function(){
        location.reload()
        socket.emit("gameOver",{name:P1name})
    })
    document.getElementById("pa").addEventListener('click',function(){
        setup()
        changeturn()
        reset();
        playct = 0;
        document.getElementById("timer").innerText = 60;
        clearInterval(int);
        document.getElementById("start").disabled = false;
    })
    
}