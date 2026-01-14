// ================= DATA =================
const carouselData = [
  {
    image: "https://t4.ftcdn.net/jpg/05/23/57/17/360_F_523571782_HTB5SQBkfpA5TiKwI0lpHe3sK0VmCaVZ.jpg",
    title: "Cow Protection & Care",
    description: "Protecting cow wealth with shelter, food and medical care."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaEYB0tjb8-oTp3lyDPg7ZGYvTzIn5gq8Nw&s",
    title: "Animal Welfare",
    description: "Rescue, relief and rehabilitation for animals."
  }
];

const teamData = [
  {
    id: 1,
    name: "Manju Goel",
    designation: "Managing Trustee / Founder",
    photo: "https://img.freepik.com/premium-vector/portrait-business-woman_505024-2799.jpg",
    experience: "15+ years social work",
    education: "Social Worker",
    message: "Serving animals is my life’s mission.",
    bio: "Founder and First Managing Trustee holding lifetime position."
  },
  {
    id: 2,
    name: "Amit Kumar Shukla",
    designation: "Trustee",
    photo: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    experience: "8 years community service",
    education: "Social Worker",
    message: "Compassion creates change.",
    bio: "Trustee supporting animal welfare initiatives."
  }
];

// ================= SPA ROUTER =================
class SPARouter {
  constructor() {
    this.routes = {
      "/": () => this.home(),
      "/about": () => this.about(),
      "/mission": () => this.mission(),
      "/team": () => this.team(),
      "/contact": () => this.contact(),
      "/donate": () => this.donate()
    };
    this.app = document.getElementById("app");
    this.init();
  }

  init() {
    this.navigate(location.pathname);
    window.addEventListener("popstate", () => this.navigate(location.pathname));
    document.addEventListener("click", e => {
      const link = e.target.closest(".nav-link");
      if (link && link.getAttribute("href")) {
        e.preventDefault();
        this.navigate(link.getAttribute("href"));
      }
    });
    new ThemeManager();
    new MobileMenu();
    if (innerWidth > 768) new CursorTrail();
  }

  navigate(path) {
    if (!this.routes[path]) path = "/";
    history.pushState({}, "", path);
    this.render(path);
  }

  render(path) {
    this.app.innerHTML = "";
    this.routes[path]();
    window.scrollTo(0, 0);
    this.setActive(path);
    this.afterRender();
  }

  setActive(path) {
    document.querySelectorAll(".nav-link").forEach(l =>
      l.classList.toggle("active-link", l.getAttribute("href") === path)
    );
  }

  afterRender() {
    if (document.querySelector(".hero-slide")) this.initCarousel();
    if (document.querySelector(".team-card")) this.initTeamModal();
  }

  // ========== PAGES ==========
  home() {
    this.app.innerHTML = `
    <section class="h-screen relative">
      ${carouselData.map((s,i)=>`
        <div class="hero-slide ${i===0?'active':''} absolute inset-0 bg-cover bg-center"
             style="background-image:url('${s.image}')">
          <div class="h-full flex items-center bg-black/50">
            <div class="max-w-xl mx-auto glassmorphism p-8 text-center">
              <h1 class="text-4xl font-bold text-white mb-4">${s.title}</h1>
              <p class="text-white mb-6">${s.description}</p>
              <a href="/donate" class="nav-link bg-green-600 text-white px-6 py-3 rounded">Donate</a>
            </div>
          </div>
        </div>
      `).join("")}
    </section>`;
  }

  about() {
    this.app.innerHTML = `<section class="p-10 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">About Us</h1>
      <p>Registered charitable trust working for cow protection and animal welfare.</p>
    </section>`;
  }

  mission() {
    this.app.innerHTML = `<section class="p-10 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Our Mission</h1>
      <ul class="list-disc pl-6 space-y-2">
        <li>Cow protection</li>
        <li>Animal rescue</li>
        <li>Community welfare</li>
      </ul>
    </section>`;
  }

  team() {
    this.app.innerHTML = `<section class="p-10 max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Our Team</h1>
      <div class="grid md:grid-cols-2 gap-6">
        ${teamData.map(m=>`
          <div class="team-card glassmorphism p-6 rounded cursor-pointer" data-id="${m.id}">
            <img src="${m.photo}" class="w-24 h-24 rounded-full mb-3">
            <h3 class="font-bold">${m.name}</h3>
            <p class="text-green-600">${m.designation}</p>
            <p class="italic mt-2">"${m.message}"</p>
          </div>
        `).join("")}
      </div>
    </section>`;
  }

  contact() {
    this.app.innerHTML = `<section class="p-10 max-w-xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Contact</h1>
      <p>Email: info@krishnagopalgaushala.org</p>
    </section>`;
  }

  donate() {
    this.app.innerHTML = `<section class="p-10 max-w-xl mx-auto text-center">
      <h1 class="text-3xl font-bold mb-4">Donate</h1>
      <p class="mb-6">Your support helps us continue our mission.</p>
      <button class="bg-green-600 text-white px-6 py-3 rounded">Donate Now</button>
    </section>`;
  }

  // ===== COMPONENTS =====
  initCarousel() {
    let i = 0;
    const slides = document.querySelectorAll(".hero-slide");
    setInterval(()=>{
      slides[i].classList.remove("active");
      i = (i+1)%slides.length;
      slides[i].classList.add("active");
    },5000);
  }

  initTeamModal() {
    document.querySelectorAll(".team-card").forEach(card=>{
      card.onclick=()=>{
        const m = teamData.find(t=>t.id==card.dataset.id);
        ["name","designation","experience","education","message","bio"]
          .forEach(k=>document.getElementById("modal-"+k).textContent=m[k]);
        document.getElementById("modal-photo").src=m.photo;
        document.getElementById("team-modal").classList.remove("hidden");
        document.body.classList.add("modal-open");
      }
    });
    document.getElementById("close-modal").onclick=()=>{
      document.getElementById("team-modal").classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  }
}

// ================= THEME =================
class ThemeManager {
  constructor() {
    this.toggle=document.getElementById("theme-toggle");
    this.toggleMobile=document.getElementById("theme-toggle-mobile");
    this.icon=document.getElementById("theme-icon");
    this.iconMobile=document.getElementById("theme-icon-mobile");
    this.init();
  }
  init(){
    if(localStorage.theme==="dark")document.documentElement.classList.add("dark");
    this.toggle.onclick=this.toggleTheme.bind(this);
    if(this.toggleMobile)this.toggleMobile.onclick=this.toggleTheme.bind(this);
  }
  toggleTheme(){
    document.documentElement.classList.toggle("dark");
    localStorage.theme=document.documentElement.classList.contains("dark")?"dark":"light";
  }
}

// ================= MOBILE MENU =================
class MobileMenu {
  constructor(){
    this.btn=document.getElementById("mobile-menu-button");
    this.menu=document.getElementById("mobile-menu");
    if(this.btn)this.btn.onclick=()=>this.menu.classList.toggle("hidden");
  }
}

// ================= CURSOR =================
class CursorTrail {
  constructor(){
    this.c=document.getElementById("cursor-trail");
    this.ctx=this.c.getContext("2d");
    this.resize();
    window.onresize=()=>this.resize();
    document.onmousemove=e=>this.draw(e);
  }
  resize(){this.c.width=innerWidth;this.c.height=innerHeight}
  draw(e){
    this.ctx.clearRect(0,0,this.c.width,this.c.height);
    this.ctx.fillStyle="rgba(34,197,94,.5)";
    this.ctx.beginPath();
    this.ctx.arc(e.clientX,e.clientY,8,0,Math.PI*2);
    this.ctx.fill();
  }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded",()=>new SPARouter());
