const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(input) {
  appendMessage('user', input);

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    appendMessage('bot', data.reply);
  } catch (err) {
    appendMessage('bot', 'Error al conectar con el servidor.');
  }
}

function handleSend() {
  const text = userInput.value.trim();
  if (text !== '') {
    getBotResponse(text);
    userInput.value = '';
  }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSend();
});
