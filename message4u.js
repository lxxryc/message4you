const DURATION_SECONDS = 20;
const TO_TEXT = "";
const SECRET_MESSAGE = "Hi, if you’re reading this, love yourself… and don’t forget mee.";
const SELF_DESTRUCT_TEXT = "Message destroyed!";
const AFTER_TEXT = "— Louís";

const toEl = document.getElementById("to");
const countdownEl = document.getElementById("countdown");
const countdownTextEl = document.getElementById("countdownText");
const messageEl = document.getElementById("message");
const statusEl = document.getElementById("status");

toEl.textContent = TO_TEXT;

function hashString(str) {
let h = 0x811c9dc5;
for (const ch of str) {
h ^= ch.codePointAt(0);
h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
h >>>= 0;
}
return ("00000000" + h.toString(16)).slice(-8);
}

const UNIQUE_KEY = "msg_" + hashString(SECRET_MESSAGE);

function showDestroyed() {
messageEl.textContent = "";
countdownTextEl.innerHTML = "";
statusEl.textContent = SELF_DESTRUCT_TEXT;
const afterEl = document.createElement('span');
afterEl.className = 'after-text';
afterEl.textContent = AFTER_TEXT;
statusEl.appendChild(afterEl);
}

if (localStorage.getItem(UNIQUE_KEY) === "true") {
showDestroyed();
} else {
messageEl.textContent = SECRET_MESSAGE;
let remaining = DURATION_SECONDS;
countdownEl.textContent = remaining;
const timer = setInterval(() => {
remaining--;
countdownEl.textContent = remaining;
if (remaining <= 0) {
clearInterval(timer);
localStorage.setItem(UNIQUE_KEY, "true");
showDestroyed();
}
}, 1000);
}

const modals = {
faqBtn: 'faqModal',
aboutBtn: 'aboutModal',
contactBtn: 'contactModal'
};

Object.keys(modals).forEach(btnId => {
document.getElementById(btnId).addEventListener('click', () => {
document.getElementById(modals[btnId]).style.display = 'block';
});
});

document.querySelectorAll('.close').forEach(span => {
span.addEventListener('click', () => {
const modalId = span.getAttribute('data-close');
document.getElementById(modalId).style.display = 'none';
});
});

window.addEventListener('click', (e) => {
if(e.target.classList.contains('modal')) {
e.target.style.display = 'none';
}
});

const contactForm = document.getElementById("contactForm");
const successMessage = document.createElement("div");
successMessage.id = "successMessage";
successMessage.style.display = "none";
successMessage.style.marginTop = "1em";
successMessage.style.padding = "1em";
successMessage.style.background = "#111";
successMessage.style.color = "#0f0";
successMessage.style.borderRadius = "8px";
successMessage.textContent = "🎉 Your message has been successfully sent!";
contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

contactForm.addEventListener("submit", function(e){
e.preventDefault();
const formData = new FormData(this);
fetch("https://formspree.io/f/xpwjkayd", {
method: "POST",
body: formData,
headers: { 'Accept': 'application/json' }
}).then(response => {
if(response.ok){
contactForm.style.display = "none";
successMessage.style.display = "block";
} else {
alert("Oops! There was a problem sending your message.");
}
}).catch(error => {
alert("Oops! There was a problem sending your message.");
});
});

