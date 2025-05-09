
const navLinks = document.querySelector(".nav-links");

function sendMessage(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  console.log("Form submitted:", { name, email, message });


  form.reset();
  alert("Message sent!");
}


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