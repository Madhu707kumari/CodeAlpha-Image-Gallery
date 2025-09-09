const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

const clearSearch = document.getElementById("clearSearch");

// Show/hide clear button when typing
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const images = document.querySelectorAll(".gallery img"); // ✅ latest images
  images.forEach(img => {
    const altText = img.alt.toLowerCase();
    img.style.display = altText.includes(searchValue) ? "block" : "none";
  });

  clearSearch.style.display = searchValue ? "block" : "none"; // show cross only when text
});

// Clear input when ❌ clicked
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.style.display = "none";
  const images = document.querySelectorAll(".gallery img");
  images.forEach(img => (img.style.display = "block")); // show all images back
});

let currentIndex = 0;

// Open Lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Show Image in Lightbox
function showImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
}

// Prev / Next
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});

// Close on outside click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});


// Function to set active button from search
function setActiveButton(category) {
  filterBtns.forEach(btn => {
    if (btn.getAttribute("data-filter") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Filter by category

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");

    // ✅ Images + Videos dono ko select karo
    const mediaItems = document.querySelectorAll(".gallery img, .gallery video");

    mediaItems.forEach(item => {
      item.style.display =
        filter === "all" || item.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});



// Search Functionality
// ✅ Updated Search Functionality (new images bhi work karegi)
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  // Har search ke time latest images select karo
  const images = document.querySelectorAll(".gallery img");

  images.forEach(img => {
    const altText = img.alt.toLowerCase();
    img.style.display = altText.includes(searchValue) ? "block" : "none";
  });

  // Navbar button highlight based on search
if (searchValue.includes("portrait")) {
  setActiveButton("portrait");
} else if (searchValue.includes("landscape")) {
  setActiveButton("landscape");
} else if (searchValue.includes("wildlife")) {
  setActiveButton("wildlife");
} else if (searchValue.includes("street")) {
  setActiveButton("street");
} else if (searchValue.includes("fashion")) {
  setActiveButton("fashion");
} else if (searchValue === "") {
  setActiveButton("all"); // default
}

});


// ✅ Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage();
    } else if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});

// ✅ Dark / Light Mode Toggle


// ===== Theme toggle: single-click reliable version =====
(function initThemeToggle(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // ensure it's a button (prevents form submit issues)
  btn.setAttribute('type', 'button');

  // remove any previous listeners by replacing node (clean slate)
  const cleanBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(cleanBtn, btn);

  const themeBtn = document.getElementById('themeToggle');

  // update icon: Light mode => 🌙 , Dark mode => ☀
  function updateIcon() {
    themeBtn.textContent = document.body.classList.contains('light') ? '🌙' : '☀';
  }

  // initial icon on page load
  updateIcon();

  // single reliable click handler
  themeBtn.addEventListener('click', (e) => {
    e.preventDefault();                 // safe-guard
    document.body.classList.toggle('light');
    updateIcon();
  });

  // ensure button remains clickable on top
  themeBtn.style.zIndex = 9999;
})();