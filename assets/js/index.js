
// ================= Active link on scroll ==================== //

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let currentSectionId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      currentSectionId = section.getAttribute("id");
    };
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
});
// =================== Dark Mode ===================== //

const toggleBtn = document.querySelector("#theme-toggle-button");
const htmlTag = document.querySelector("html");

toggleBtn.addEventListener("click", function () {
  htmlTag.classList.toggle("dark");
});


// ================== portfolio ===================== //

const tabs = document.querySelectorAll(".portfolio-filter");
const items = document.querySelectorAll(".portfolio-item");
const activeClasses = [
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "hover:shadow-lg",
  "hover:shadow-primary/50",
];
const inactiveClasses = [
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
];

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-pressed", "false");
      t.classList.remove(...activeClasses);
      t.classList.add(...inactiveClasses);
    });
    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");
    tab.classList.remove(...inactiveClasses);
    tab.classList.add(...activeClasses);

    const filterValue = tab.getAttribute("data-filter");

    items.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue == "all" || itemCategory === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// =================== testimonials ==================== //

const nextBtn = document.querySelector("#next-testimonial");
const prevBtn = document.querySelector("#prev-testimonial");
const testimonialsCarousel = document.querySelector("#testimonials-carousel");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const carouselIndicator = document.querySelectorAll(".carousel-indicator");
let currentIndex = 0;

function updateSlider() {
    let amountTomove = 100;
    if (window.innerWidth >= 1024) {
        amountTomove = 33.3333;
    } else if (window.innerWidth >= 640) {
        amountTomove = 50;
    }
  testimonialsCarousel.style.transform = `translateX(${currentIndex * amountTomove}%)`;

  carouselIndicator.forEach((indicator, index) => {
    if (index == currentIndex) {
        indicator.style.background = '#a855f7';
        indicator.style.width = '14px';
        indicator.style.height = '14px';
      indicator.setAttribute("aria-selected", "true");
    } else {
      indicator.style.background = '#45556c';
      indicator.setAttribute("aria-selected", "false");
        indicator.style.width = '12px';
        indicator.style.height = '12px';
    }
  });
};
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= (testimonialCards.length - 2)) {
      currentIndex = 0;
    };
    updateSlider();
});
prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = testimonialCards.length - 3;
  };
  updateSlider();
});
carouselIndicator.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});
updateSlider();

// ================== Settings Toggle Button ==================== //

const settingToggle = document.querySelector("#settings-toggle");
const settingSidebar = document.querySelector("#settings-sidebar");
const closeBtn = document.querySelector("#close-settings");

settingToggle.addEventListener("click", () => {
  settingSidebar.classList.remove("translate-x-full");
  settingToggle.style.transform = "translate(-20rem , -50%)";
});

function closeSidebar() {
  settingSidebar.classList.add("translate-x-full");
  settingToggle.style.transform = "translateY(-50%)";
}

closeBtn.addEventListener("click", () => {
  closeSidebar();
});

document.addEventListener("click", (event) => {
  if (
    !settingSidebar.contains(event.target) &&
    !settingToggle.contains(event.target)
  ) {
    closeSidebar();
  }
});

// ========== font switcher ==========

const fontButtons = document.querySelectorAll("[data-font]");
const allFontClasses = ["font-alexandria" , "font-tajawal" , "font-cairo"];

fontButtons.forEach(button => {
  button.addEventListener("click" , () => {
    const selectedFont = button.getAttribute("data-font");

    document.body.classList.remove(...allFontClasses);
    document.body.classList.add(`font-${selectedFont}`);
    fontButtons.forEach(btn => btn.classList.remove("active"))
      button.classList.add("active");

    localStorage.setItem("selected-font" , selectedFont);
  });
});

window.addEventListener('DOMContentLoaded' , () => {
  const savedFont = localStorage.getItem('selected-font');

  if (savedFont) {
    document.body.classList.remove(...allFontClasses);
    document.body.classList.add(`font-${savedFont}`);

    fontButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-font="${savedFont}"]`);

    if (activeBtn) activeBtn.classList.add('active');
  }
});

// ========== reset setting ==========

const resetSetting = document.getElementById("reset-settings");

resetSetting.addEventListener("click" , () => {
  document.body.classList.remove(...allFontClasses);
  document.body.classList.add("font-tajawal");

  fontButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-font="tajawal"]`).classList.add("active");

  localStorage.setItem("selected-font" , "tajawal");
});

// =================== scroll to top button ==================== //

const scrollBtn = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});