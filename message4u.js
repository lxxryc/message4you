const DURATION_SECONDS = 15; 
  const TO_TEXT = "";
  const SECRET_MESSAGE = "Ni overthink ko, mao siguro ni left di melo kay gusto nya ka call kay naa syang problema, kay namugos to ganiha sa akoa eh pag mga laki dili baya na mo ingana sa iban laki, basig namugos kay gusto sya mag open up, kaso sigeg mo katawa";
  const SELF_DESTRUCT_TEXT = "Sana all overthink";
  const AFTER_TEXT = "— Josh";

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

