/* ============================================================
   1. HAMBURGER / MOBILE MENU
============================================================ */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const hamLine1     = document.getElementById('ham-line1');
const hamLine2     = document.getElementById('ham-line2');
const hamLine3     = document.getElementById('ham-line3');

let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  // Toggle class 'open' untuk animasi max-height
  mobileMenu.classList.toggle('open', isMenuOpen);

  // Ubah tombol hamburger menjadi X
  if (isMenuOpen) {
    hamLine1.style.transform = 'translateY(8px) rotate(45deg)';
    hamLine2.style.opacity   = '0';
    hamLine3.style.transform = 'translateY(-8px) rotate(-45deg)';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  } else {
    hamLine1.style.transform = '';
    hamLine2.style.opacity   = '1';
    hamLine3.style.transform = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
}

hamburgerBtn.addEventListener('click', toggleMenu);

// Tutup menu saat salah satu link mobile diklik
document.querySelectorAll('.nav-link-mobile').forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen) toggleMenu();
  });
});

// Tutup menu saat klik di luar navbar
document.addEventListener('click', function (e) {
  const navbar = document.getElementById('navbar');
  if (isMenuOpen && !navbar.contains(e.target)) {
    toggleMenu();
  }
});


/* ============================================================
   2. SMOOTH SCROLLING untuk semua anchor link
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    // Offset untuk navbar sticky (tinggi navbar ± 80px)
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const targetPos    = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  });
});


/* ============================================================
   3. ACTIVE NAV LINK — highlight saat scroll
============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY      = window.scrollY;
  const navbarHeight = document.getElementById('navbar').offsetHeight;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - navbarHeight - 20;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // panggil sekali saat load


/* ============================================================
   4. NAVBAR SCROLL EFFECT — shadow saat di-scroll
============================================================ */
const navbarEl = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbarEl.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
  } else {
    navbarEl.style.boxShadow = 'none';
  }
}, { passive: true });


/* ============================================================
   5. SCROLL REVEAL — animasi elemen saat masuk viewport
============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Hentikan observasi setelah animasi sekali jalan
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

// Observasi semua elemen dengan class 'reveal'
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
