const myForm = document.querySelector("#my-form");
const message = document.querySelector("#message");
const chatMessagesContainer = document.getElementById('chat-messages');
let intervalId; // Variable to store the interval ID

myForm.addEventListener('submit', saveToStorage);

window.addEventListener('DOMContentLoaded', () => {
    try {
        // Start the interval and store the ID in intervalId
        intervalId = setInterval(fetchAndUpdateMessages, 1000);
    } catch (error) {
        handleError('Error fetching messages:', error);
    }
});

async function saveToStorage(e) {
    e.preventDefault();
    try {
        const userMessage = message.value;
        const token = localStorage.getItem('Token');
        const data = { userMessage };

        await axios.post('http://localhost:4000/user/send-message', data, { headers: {"Authorization" : token} });
        document.querySelector("#message").value = '';
        fetchAndUpdateMessages();
    } catch (error) {
        handleError('Error saving message:', error);
    }
}

async function fetchAndUpdateMessages() {
    try {
        const messages = await getMessages();
        updateChatWindow(messages);
    } catch (error) {
        handleError('Error fetching messages:', error);
    }
}

async function getMessages() {
    const res = await axios.get('http://localhost:4000/user/allmessages');
    return res.data.messages;
}

function updateChatWindow(messages) {
    // Clear existing messages
    chatMessagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${message.chatMessage}`; // Assuming the property is named 'name'
        chatMessagesContainer.appendChild(messageElement);
    });
}

function handleError(message, error) {
    console.error(message, error);
}
