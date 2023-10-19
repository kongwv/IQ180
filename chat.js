const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//const name = [prompt('What is ')]
//appendMessage('You Joined')

socket.on('chat-message', data =>{
    appendMessage(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault() //for the page to not refresh and clear the past messages
    const message = messageInput.value
    appendMessage(message)
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message 
    messageContainer.append(messageElement)
}