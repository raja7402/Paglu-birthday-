function nextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 0, 30, 0, 0, 0);
  if (now >= target) target = new Date(year + 1, 0, 30, 0, 0, 0);
  return target;
}
function updateCountdown() {
  const now = new Date();
  const target = nextBirthday();
  const diff = Math.max(0, target - now);
  const units = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
  Object.entries(units).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
  const heading = document.getElementById("countdown-heading");
  if (now.getMonth() === 0 && now.getDate() === 30) {
    heading.textContent = "IT'S YOUR DAY! HAPPY BIRTHDAY! 🎂";
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("surprise-btn").addEventListener("click", function () {
  const message = document.getElementById("hidden-message");
  message.classList.toggle("show");
  this.textContent = message.classList.contains("show") ? "Aww, one more hug! 💗" : "Open your surprise ✨";
  if (message.classList.contains("show")) {
    for (let i = 0; i < 24; i++) {
      const confetti = document.createElement("span");
      confetti.textContent = ["💗", "✨", "🎀", "♡"][i % 4];
      confetti.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-30px;font-size:${14+Math.random()*18}px;z-index:99;pointer-events:none;transition:transform 2.5s linear,opacity 2.5s`;
      document.body.appendChild(confetti);
      requestAnimationFrame(() => confetti.style.transform = `translateY(${window.innerHeight+80}px) rotate(${Math.random()*500}deg)`);
      setTimeout(() => { confetti.style.opacity = "0"; }, 1800);
      setTimeout(() => confetti.remove(), 2600);
    }
  }
});
