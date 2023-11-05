
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messagesend = document.getElementById('send-button')

document.getElementById("showchatBTN").style.display = "block";
document.getElementById("hidechatBTN").style.display = "none";
document.getElementById("noti").style.display = "none";

document.getElementById("showchatBTN").addEventListener("click", function() {
    document.getElementById("Chat").style.display = "block";
    document.getElementById("showchatBTN").style.display = "none";
    document.getElementById("hidechatBTN").style.display = "block";
    document.getElementById("noti").style.display = "none";
})

document.getElementById("hidechatBTN").addEventListener("click", function() {
    document.getElementById("Chat").style.display = "none";
    document.getElementById("showchatBTN").style.display = "block";
    document.getElementById("hidechatBTN").style.display = "none";
})

//const name = [prompt('What is ')]
//appendMessage('You Joined')
socket.on('chat-message', data =>{
    appendMessage(data)
})


messagesend.addEventListener('click', function() {
    const message = name + ": " +messageInput.value
    appendMessage(message)
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

messageInput.onkeydown = function(e){
    if(e.keyCode == 13){
        const message = name + ": " +messageInput.value
        appendMessage(message)
        socket.emit('send-chat-message',message)
        messageInput.value = ''
    }
 };

function appendMessage(message){
    if(document.getElementById("Chat").style.display == "none"){
        document.getElementById("noti").style.display = "block"
    }
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.style.marginLeft = "10px"; 
    messageContainer.append(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
