
let btn3 = document.querySelector('#btn-3');
let btn1 = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');

btn1.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('views/image1.jpg')";
})
btn2.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('views/arttt.jpg')";
})
btn3.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('views/image2.png')";
})