/* scripts.js */

// Smooth scroll for links with class 'scroll-link'
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Mobile menu functionality
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
  });
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  });
  
  // Language toggle: toggles the 'lang-th' class on the body and updates button text accordingly.
  // In English mode, the button shows "Thai". When toggled to Thai, the button text changes to "English".
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('click', () => {
    document.body.classList.toggle('lang-th');
    if (document.body.classList.contains('lang-th')) {
      languageToggle.textContent = "English";
    } else {
      languageToggle.textContent = "Thai";
    }
  });
  
  // GSAP animations for each section on scroll
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });
  });
  
  // Modal functionality for service cards and therapist cards
  const modal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');
  
  // Function to open modal with given content
  function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("modal-open");
    // GSAP animation for modal popup
    gsap.fromTo(modal.querySelector(".modal-box"), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
  }
  
  // Close modal when clicking the close button
  modalClose.addEventListener("click", () => {
    modal.classList.remove("modal-open");
  });
  
  // Add click events to all elements with the "modal-trigger" class
  document.querySelectorAll(".modal-trigger").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentCard = trigger.closest(".service-card, .therapist-card");
      if (parentCard) {
        const isThai = document.body.classList.contains("lang-th");
        const title = isThai ? parentCard.getAttribute("data-title-th") : parentCard.getAttribute("data-title-en");
        const description = isThai ? parentCard.getAttribute("data-description-th") : parentCard.getAttribute("data-description-en");
        openModal(title, description);
      }
    });
  });
  