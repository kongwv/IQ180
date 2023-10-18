function playSearchBTN() {
    var start = new Audio();
    start.src = "sounds/start.mp3";
    start.play();
}

var music = document.getElementById("music");
var x = new Boolean;

function playMusic() {
    if (x) {
        x = false;
        music.play();
    } else {
        x = true;
        music.pause();
        music.currentTime = 0;
    }
}