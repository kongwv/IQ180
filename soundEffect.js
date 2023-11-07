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

document.getElementById("stopMusicBTN").disabled = true;

function playMusic() {
     music.play();
     document.getElementById("stopMusicBTN").disabled = false;
     document.getElementById("playMusicBTN").disabled = true;
}

function stopMusic() {
    music.pause();
    music.currentTime = 0;
    document.getElementById("stopMusicBTN").disabled = true;
    document.getElementById("playMusicBTN").disabled = false;
}