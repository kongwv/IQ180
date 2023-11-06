function playSearchBTN() {
    var start = new Audio();
    start.src = "sounds/start.mp3";
    start.play();
}

function playAnyBTN() {
    var select = new Audio();
    select.src = "sounds/select.mp3";
    select.play();
}

var music = document.getElementById("music");
var x = new Boolean;

function playMusic() {
     music.play();
}

function stopMusic() {
    music.pause();
    music.currentTime = 0;
}