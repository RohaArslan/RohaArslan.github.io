
const navLinks = document.querySelector(".nav-links");
const templateInbox = "template_214sv0s";      // YOUR actual template ID for inbox
const templateReply = "template_3y8hej9";      // YOUR actual template ID for auto-reply

const form = document.getElementById("form");
const btn = document.getElementById("button");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  btn.value = "Sending...";

  const serviceID = "service_6s712yf"; // Your EmailJS service ID
  const publicKey = "9FnKIh0T6ilUWIQLT"; // Your public key

  // Send to your inbox
  emailjs.sendForm(serviceID, templateInbox, form, publicKey)
    .then(() => {
      // Send auto-reply to sender
      return emailjs.sendForm(serviceID, templateReply, form, publicKey);
    })
    .then(() => {
      btn.value = "📧 Send Message";
      alert("✅ Message sent! The sender will also receive a confirmation email.");
      form.reset();
    })
    .catch((err) => {
      btn.value = "📧 Send Message";
      console.error("❌ Failed to send message:", err);
      alert("Oops, something went wrong. Try again later.");
    });
});






document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.querySelector(".project-gallery");

  projects.forEach((project) => {
const card = `
  <a href="${project.codeLink}" target="_blank" class="project-card">
    <img src="${project.image}" alt="${project.title}" class="project-img">
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  </a>
`;
    projectGrid.innerHTML += card;
  });

  const toggle = document.getElementById("dark-mode-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

function updateClock(){
const now = new Date();
    const clock = document.getElementById('clock');
    const dateSpan = document.getElementById('date');

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
    dateSpan.textContent = formattedDate;
}

setInterval(updateClock, 1000);
updateClock();

});