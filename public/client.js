const socket = io()

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let audio = new Audio("audio.mp3");

do {
    name = prompt('Please enter your name: ')
} while(!name)


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(e.target.value.trim() == "") return 
        else {
            sendMessage(e.target.value)
        }
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    if(type == "incoming") {
        audio.play();
    }

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
    scrollToBottom();
}


socket.on('message', (msg)=>{
    console.log(msg)
    appendMessage(msg,'incoming')
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}