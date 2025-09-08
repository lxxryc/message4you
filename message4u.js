const DURATION_SECONDS = UPDATING...; 
const TO_TEXT = "";
const SECRET_MESSAGE = "";
const SELF_DESTRUCT_TEXT = "";
const AFTER_TEXT = "— Louís Ryc";

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

// ----- Modal Handling -----
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

// ----- Form Handling (Custom Success) -----
const form = document.querySelector("form");
form.addEventListener("submit", async function(e) {
  e.preventDefault(); // stop redirect

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = "none";

      // Show success message with GIF
      const successDiv = document.createElement("div");
      successDiv.style.textAlign = "center";
      successDiv.innerHTML = `
        <h2 style="color:red;">Can't Receive Message Until 09/10/25. Developer Is Still Working</h2>
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmNnODhiYzNvZzlpdGNuMW9reWYwZWhlYzQxaGVvNTl2c3R1bG5sciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wpoLqr5FT1sY0/giphy.gif" 
             alt="success" 
             style="max-width:200px; margin-top:10px; border-radius:12px;">
      `;
      form.parentNode.insertBefore(successDiv, form);
    } else {
      alert("Oops! Something went wrong.");
    }
  } catch (error) {
    alert("Oops! Something went wrong.");
  }
});

// ----- FAQ Expand/Collapse (Smooth, Clean) -----
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      // Collapse
      answer.style.maxHeight = answer.scrollHeight + "px"; // lock height
      requestAnimationFrame(() => {
        answer.style.maxHeight = "0px";
      });
      item.classList.remove("active");
    } else {
      // Expand
      answer.style.maxHeight = answer.scrollHeight + "px";
      item.classList.add("active");

      // After animation, allow auto height for dynamic content
      answer.addEventListener("transitionend", function handler() {
        if (item.classList.contains("active")) {
          answer.style.maxHeight = "none";
        }
        answer.removeEventListener("transitionend", handler);
      });
    }
  });
});
