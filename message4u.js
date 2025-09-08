const DURATION_SECONDS = 120; 
const TO_TEXT = "";
const SECRET_MESSAGE = "hi Good evening everyone,I want to talk about something that unites us all—food.More specifically,dinner.After a long day of work,study,or endless responsibilities,most of us just want something quick,delicious,and nourishing.But here’s the challenge:how do we create meals that are fast without sacrificing flavor,health,or a little bit of trendiness?The truth is,we live in a time when food inspiration is everywhere—on TikTok,Instagram,and countless food blogs.The good news?Many of these ideas are designed for busy weeknights,which means you don’t need to spend hours in the kitchen to make something that feels special.Take the famous salmon rice bowl for example,made popular online by Emily Mariko.It’s incredibly simple—leftover salmon,warm rice,soy sauce,and a drizzle of mayo—yet somehow it feels comforting,creative,and modern.Or think about sheet pan dinners—like Greek chicken roasted with potatoes,peppers,and onions—all baked together,saving both time and dishes.It’s efficiency with flavor.We also see a rise in global-inspired recipes that bring restaurant-level excitement to our homes.Gochujang honey chicken bowls give you the sweet,spicy depth of Korean cooking in under 30 minutes.Harissa shrimp tacos pack bold Mediterranean flavors into a quick handheld meal.And for pasta lovers,creamy sun-dried tomato linguine or miso butter udon prove that comfort food doesn’t have to be heavy or complicated.What’s even more exciting is how many plant-based options are trending.Buffalo cauliflower wraps or crispy tofu with chili crisp broccoli show us that meatless meals can be just as satisfying.It’s proof that weeknight dinners don’t have to feel repetitive or uninspired.The key lesson here is this:cooking on a weeknight doesn’t need to be a burden.With a few smart shortcuts—like pre-chopped vegetables,rotisserie chicken,or frozen dumplings—you can make food that is nourishing,exciting,and yes,a little trendy.Dinner can be the highlight of your day,not just another task to get through.So the next time you’re tempted to settle for plain takeout,remember—great meals can be made quickly,and they can be just as creative as anything you’d order at a restaurant.Thank you. hehe frm j";
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



