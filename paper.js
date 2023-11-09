const paper = document.getElementById("paper");
const ctx = paper.getContext("2d");
let isDrawing = false;
paper.height = 450;
paper.width = 450;
paper.addEventListener("mousedown", () =>{
    isDrawing = true;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
});

paper.addEventListener("mousemove",(e)=>{
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY);
});

paper.addEventListener("mouseup", ()=>{
    isDrawing = false;
    ctx.beginPath();
})

document.getElementById("clearpaper").addEventListener("click",()=>{
    ctx.clearRect(0, 0, 450,450);
})

document.getElementById("paper").style.display = "none";
document.getElementById("clearpaper").style.display = "none";

document.getElementById("showpaperBTN").style.display = "block";
document.getElementById("hidepaperBTN").style.display = "none";

document.getElementById("showpaperBTN").addEventListener("click", function() {
    document.getElementById("paper").style.display = "block";
    document.getElementById("clearpaper").style.display = "block";
    document.getElementById("showpaperBTN").style.display = "none";
    document.getElementById("hidepaperBTN").style.display = "block";
})

document.getElementById("hidepaperBTN").addEventListener("click", function() {
    document.getElementById("paper").style.display = "none";
    document.getElementById("clearpaper").style.display = "none";
    document.getElementById("showpaperBTN").style.display = "block";
    document.getElementById("hidepaperBTN").style.display = "none";
})