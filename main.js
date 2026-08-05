// Navbar scroll & position effect with notice banner support
const navbar = document.getElementById('navbar');
const noticeBanner = document.querySelector('.notice-banner');

function adjustNavbarPosition() {
  if (!navbar) return;
  
  if (noticeBanner) {
    const bannerHeight = noticeBanner.offsetHeight;
    if (window.scrollY > bannerHeight) {
      navbar.style.top = '0';
      navbar.classList.add('scrolled');
    } else {
      navbar.style.top = `${bannerHeight - window.scrollY}px`;
      navbar.classList.remove('scrolled');
    }
  } else {
    navbar.style.top = '0';
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', adjustNavbarPosition);
window.addEventListener('resize', adjustNavbarPosition);
document.addEventListener('DOMContentLoaded', adjustNavbarPosition);
window.addEventListener('load', adjustNavbarPosition);
adjustNavbarPosition();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  });
});

// Scroll Reveal Animation Hook
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing once revealed
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Parallax Mouse Effect for Orbitals
document.addEventListener('mousemove', (e) => {
  const orbits = document.querySelectorAll('.orbit');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  orbits.forEach((orbit, index) => {
    const depth = (index + 1) * 20;
    const moveX = (x - 0.5) * depth;
    const moveY = (y - 0.5) * depth;
    orbit.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
