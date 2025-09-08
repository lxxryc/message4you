const DURATION_SECONDS = 60; 
const TO_TEXT = "";
const SECRET_MESSAGE = "HI BABY";
const SELF_DESTRUCT_TEXT = "Message destroyed!";
const AFTER_TEXT = "Source: unknown";

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
        <h2 style="color:#0f0;">Message Sent Successfully</h2>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg0dnBmODZrNmE0aHJxeG9oa2N2a2RuZXpuNjZlNmFybHJybTh1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/McO9I90Llu3BrCy5wb/giphy.gif" 
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

// ----- Smooth FAQ Animation -----
document.querySelectorAll("#faqModal details").forEach(detail => {
  const summary = detail.querySelector("summary");
  const content = detail.querySelector("p");

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (detail.classList.contains("open")) {
      // Collapse
      content.style.maxHeight = "0px";
      content.style.paddingTop = "0";
      detail.classList.remove("open");
    } else {
      // Expand
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.paddingTop = "8px";
      detail.classList.add("open");
    }
  });
});



