const msg = document.getElementById('msg');
const reply = document.getElementById('reply');
const btn = document.getElementById('btn');
const usernameInput = document.getElementById('username');
const themeToggle = document.getElementById('toggleTheme');
const body = document.getElementById('theme');

const socket = io();

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('bg-gray-900')) {
        body.classList.replace('bg-gray-900', 'bg-white');
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        body.classList.replace('bg-white', 'bg-gray-900');
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

// Send Message
btn.addEventListener('click', () => {
    const message = msg.value.trim();
    const username = usernameInput.value.trim() || "Anonymous";

    if (message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        socket.emit('mess', { username, message, timestamp });
        msg.value = ""; // Clear input after sending
    }
});

// Receive Message
socket.on('reply', (data) => {
    const newMsg = document.createElement('div');
    newMsg.classList.add('bg-gray-800', 'p-2', 'rounded-md');

    newMsg.innerHTML = `<strong>${data.username}:</strong> ${data.message} <span class="text-gray-400 text-xs">(${data.timestamp})</span>`;
    reply.appendChild(newMsg);
    
    // Auto-scroll to the bottom
    reply.scrollTop = reply.scrollHeight;
});
