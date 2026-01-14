/******************************
 * DATA (From Trust Deed)
 ******************************/
const carouselData = [
  {
    image: "https://t4.ftcdn.net/jpg/05/23/57/17/360_F_523571782_HTB5SQBkfpA5TiKwI0lpHe3sK0VmCaVZ.jpg",
    title: "Cow Protection & Care",
    description: "Dedicated to protecting cow wealth from sickness, starvation and slaughtering."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaEYB0tjb8-oTp3lyDPg7ZGYvTzIn5gq8Nw&s",
    title: "Animal Welfare",
    description: "Rescue, relief and rehabilitation of animals and birds."
  },
  {
    image: "https://images.maher.ac.in/wp-content/uploads/2025/11/Awareness-Session-on-Pediatric-Liver-Health-by-MCOP-2.jpeg",
    title: "Education & Awareness",
    description: "Promoting education and awareness on animal welfare and environment."
  },
  {
    image: "https://www.aljazeera.com/wp-content/uploads/2020/01/f7a36fa136804e5a9feb606cdc7e2f9f_18.jpeg",
    title: "Community Service",
    description: "Health, education and welfare programmes for women and children."
  }
];

const teamData = [
  {
    id: 1,
    name: "Manju Goel",
    designation: "Managing Trustee / Founder",
    photo: "https://img.freepik.com/premium-vector/portrait-business-woman_505024-2799.jpg",
    experience: "15+ years of social work",
    education: "Social Worker",
    message: "Protecting cow wealth with compassion.",
    bio: "Founder and First Managing Trustee. Holds office for lifetime as per Trust Deed."
  },
  {
    id: 2,
    name: "Amit Kumar Shukla",
    designation: "Trustee",
    photo: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    experience: "8 years community service",
    education: "Social Worker",
    message: "Together for animals and humanity.",
    bio: "Trustee working actively in animal welfare and social initiatives."
  }
];

/******************************
 * SPA ROUTER
 ******************************/
const routes = {
  "/": homePage,
  "/about": aboutPage,
  "/mission": missionPage,
  "/team": teamPage,
  "/contact": contactPage,
  "/donate": donatePage
};

function navigate(path) {
  history.pushState({}, "", path);
  renderRoute();
}

function renderRoute() {
  const path = window.location.pathname;
  const view = routes[path] || homePage;
  document.getElementById("app").innerHTML = view();
  setActiveLink(path);
  initCarousel();
  initTeamModal();
}

window.addEventListener("popstate", renderRoute);

document.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

/******************************
 * PAGES
 ******************************/
function homePage() {
  return `
  <section class="relative h-[80vh] overflow-hidden">
    ${carouselData.map((s,i)=>`
      <div class="slide absolute inset-0 transition-opacity duration-1000 ${i===0?'opacity-100':'opacity-0'}"
           style="background:url('${s.image}') center/cover fixed">
        <div class="h-full flex items-center justify-center bg-black/40">
          <div class="bg-white/20 backdrop-blur p-8 rounded text-center max-w-xl">
            <h2 class="text-3xl font-bold mb-3 text-white">${s.title}</h2>
            <p class="text-white">${s.description}</p>
          </div>
        </div>
      </div>
    `).join("")}
  </section>
  `;
}

function aboutPage() {
  return `<section class="p-10 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">About Us</h2>
    <p>Krishna Gopal Gaushala Sewa Trust is a charitable trust working for cow protection, animal welfare and social upliftment.</p>
  </section>`;
}

function missionPage() {
  return `<section class="p-10 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li>Protect cow wealth</li>
      <li>Animal rescue & rehabilitation</li>
      <li>Education & awareness</li>
      <li>Community welfare</li>
    </ul>
  </section>`;
}

function teamPage() {
  return `<section class="p-10 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">Our Team</h2>
    <div class="grid md:grid-cols-2 gap-6">
      ${teamData.map(m=>`
        <div data-id="${m.id}"
             class="team-card cursor-pointer bg-white/20 backdrop-blur p-6 rounded shadow hover:scale-105 transition">
          <img src="${m.photo}" class="w-24 h-24 rounded-full mb-3">
          <h3 class="font-bold">${m.name}</h3>
          <p>${m.designation}</p>
          <p class="italic text-sm mt-2">"${m.message}"</p>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function contactPage() {
  return `<section class="p-10 max-w-xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">Contact</h2>
    <p>Email: info@krishnagopaltrust.org</p>
    <p>Delhi, India</p>
  </section>`;
}

function donatePage() {
  return `<section class="p-10 max-w-xl mx-auto text-center">
    <h2 class="text-3xl font-bold mb-4">Support Our Cause</h2>
    <p class="mb-6">Your donation helps us care for cows, animals and communities.</p>
    <button class="bg-green-600 text-white px-6 py-3 rounded">Donate Now</button>
  </section>`;
}

/******************************
 * CAROUSEL
 ******************************/
let slideIndex = 0;
function initCarousel() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  setInterval(()=>{
    slides[slideIndex].classList.remove("opacity-100");
    slides[slideIndex].classList.add("opacity-0");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.remove("opacity-0");
    slides[slideIndex].classList.add("opacity-100");
  }, 4000);
}

/******************************
 * TEAM MODAL
 ******************************/
function initTeamModal() {
  document.querySelectorAll(".team-card").forEach(card=>{
    card.onclick = ()=>{
      const m = teamData.find(t=>t.id == card.dataset.id);
      document.getElementById("modalContent").innerHTML = `
        <h3 class="text-xl font-bold mb-2">${m.name}</h3>
        <p><strong>${m.designation}</strong></p>
        <p class="mt-2">${m.bio}</p>
        <p class="mt-2"><strong>Experience:</strong> ${m.experience}</p>
        <p><strong>Education:</strong> ${m.education}</p>
      `;
      document.getElementById("modal").classList.remove("hidden");
    };
  });
}

document.getElementById("closeModal").onclick =
()=> document.getElementById("modal").classList.add("hidden");

/******************************
 * DARK MODE
 ******************************/
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.theme === "dark") root.classList.add("dark");

toggle.onclick = ()=>{
  root.classList.toggle("dark");
  localStorage.theme = root.classList.contains("dark") ? "dark" : "light";
};

/******************************
 * ACTIVE LINK
 ******************************/
function setActiveLink(path){
  document.querySelectorAll(".nav-link").forEach(l=>{
    l.classList.toggle("text-green-600", l.getAttribute("href")===path);
  });
}

/******************************
 * CURSOR CANVAS
 ******************************/
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let dots=[];

window.onmousemove=e=>{
  dots.push({x:e.clientX,y:e.clientY,life:20});
};

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach((d,i)=>{
    ctx.fillStyle=`rgba(0,200,100,${d.life/20})`;
    ctx.beginPath();
    ctx.arc(d.x,d.y,6,0,Math.PI*2);
    ctx.fill();
    d.life--;
    if(d.life<=0) dots.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

/******************************
 * INIT
 ******************************/
renderRoute();
