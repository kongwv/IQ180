
let btn3 = document.querySelector('#btn-3');
let btn1 = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');

btn1.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/24.jpg')";
    playAnyBTN();
})
btn2.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/qq.jpg')";
    playAnyBTN();
})
btn3.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/image2.png')";
    playAnyBTN();
})