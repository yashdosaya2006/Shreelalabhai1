// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const header = document.querySelector('.site-header');
const form = document.getElementById('contact-form');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-nav.prev');
const lightboxNext = document.querySelector('.lightbox-nav.next');
const testimonialTrack = document.querySelector('.testi-track');
const testimonialDots = document.querySelector('.testi-dots');
const testimonialCards = [];

// Menu Toggle
function toggleMenu() {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    mainNav.setAttribute('data-visible', !expanded);
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = expanded ? 'auto' : 'hidden';
}

// Close menu when clicking on a nav link
function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('data-visible', 'false');
    document.body.style.overflow = 'auto';
}

// Initialize menu state
function initMenu() {
    // Set initial state
    mainNav.setAttribute('data-visible', 'false');
    
    // Add click event to toggle button
    navToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Header scroll effect
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Height of header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Validate name
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        messageError.style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        const formSuccess = document.getElementById('form-success');
        formSuccess.style.display = 'block';
        form.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }
}

// Gallery functionality
function initGallery() {
    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', alt: 'Restaurant interior' },
        { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', alt: 'Chef preparing food' },
        { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', alt: 'Dining area' },
        { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', alt: 'Delicious dish' },
        { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', alt: 'Bar area' },
        { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', alt: 'Dessert selection' },
        { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', alt: 'Outdoor seating' }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    // Create gallery items
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('figure');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy">
        `;
        galleryGrid.appendChild(galleryItem);
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(index, galleryItems));
    });
}

// Lightbox functionality
function openLightbox(index, items) {
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    updateLightboxContent(index, items);
    
    // Set up keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Set up click events for navigation
    lightboxPrev.onclick = () => navigateLightbox('prev', index, items);
    lightboxNext.onclick = () => navigateLightbox('next', index, items);
    lightboxClose.onclick = closeLightbox;
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyDown);
}

function updateLightboxContent(index, items) {
    const item = items[index];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.alt;
    
    // Update data attributes for navigation
    lightbox.dataset.currentIndex = index;
    lightbox.dataset.totalItems = items.length;
}

function navigateLightbox(direction, currentIndex, items) {
    let newIndex;
    
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % items.length;
    } else {
        newIndex = (currentIndex - 1 + items.length) % items.length;
    }
    
    updateLightboxContent(newIndex, items);
}

function handleKeyDown(e) {
    if (lightbox.hidden) return;
    
    const currentIndex = parseInt(lightbox.dataset.currentIndex);
    const totalItems = parseInt(lightbox.dataset.totalItems);
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox('prev', currentIndex, Array(totalItems).fill().map((_, i) => ({
                src: document.querySelector(`.gallery-item[data-index="${i}"] img`).src,
                alt: document.querySelector(`.gallery-item[data-index="${i}"] img`).alt
            })));
            break;
        case 'ArrowRight':
            navigateLightbox('next', currentIndex, Array(totalItems).fill().map((_, i) => ({
                src: document.querySelector(`.gallery-item[data-index="${i}"] img`).src,
                alt: document.querySelector(`.gallery-item[data-index="${i}"] img`).alt
            })));
            break;
    }
}

// Testimonials functionality
function initTestimonials() {
    const testimonials = [
        {
            name: 'Priya Sharma',
            role: 'Food Blogger',
            rating: 5,
            text: 'Amazing food and exceptional service! The butter chicken was absolutely divine.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Rajesh Kumar',
            role: 'Regular Customer',
            rating: 5,
            text: 'Best restaurant in town! The ambiance and food quality is outstanding.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Anita Singh',
            role: 'Food Critic',
            rating: 5,
            text: 'Authentic flavors and perfect presentation. Highly recommended!',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        }
    ];
    
    const testiWrap = document.querySelector('.testi-wrap');
    const testiTrack = document.querySelector('.testi-track');
    const testiDots = document.querySelector('.testi-dots');
    
    if (!testiWrap || !testiTrack) return;
    
    // Create testimonial cards
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testi-card';
        card.innerHTML = `
            <div class="testi-inner">
                <div class="testi-avatar">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                </div>
                <div class="testi-quote">
                    ${testimonial.text}
                </div>
                <div class="testi-author">${testimonial.name}</div>
                <div class="testi-role">${testimonial.role}</div>
                <div class="testi-rating">
                    ${'★'.repeat(testimonial.rating)}
                </div>
            </div>
        `;
        testiTrack.appendChild(card);
        testimonialCards.push(card);
    });
    
    // Create dots
    const totalDots = Math.ceil(testimonials.length / getVisibleTestimonials());
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i * getVisibleTestimonials()));
        testiDots.appendChild(dot);
    }
    
    // Initialize position
    goToTestimonial(0);
    
    // Set up navigation buttons
    const prevBtn = document.querySelector('.t-prev');
    const nextBtn = document.querySelector('.t-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => navigateTestimonials('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateTestimonials('next'));
    
    // Update on window resize
    window.addEventListener('resize', updateTestimonialPosition);
}

function getVisibleTestimonials() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

let currentTestimonial = 0;

function navigateTestimonials(direction) {
    const visibleCount = getVisibleTestimonials();
    const totalTestimonials = testimonialCards.length;
    const totalDots = Math.ceil(totalTestimonials / visibleCount);
    
    if (direction === 'next') {
        currentTestimonial = (currentTestimonial + visibleCount) % (totalTestimonials - visibleCount + 1);
    } else {
        currentTestimonial = (currentTestimonial - visibleCount + totalTestimonials) % (totalTestimonials - visibleCount + 1);
    }
    
    goToTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    const visibleCount = getVisibleTestimonials();
    const cardWidth = 100 / visibleCount;
    const offset = -index * cardWidth;
    
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    const activeDotIndex = Math.floor(index / visibleCount);
    
    dots.forEach((dot, i) => {
        if (i === activeDotIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    currentTestimonial = index;
}

function updateTestimonialPosition() {
    goToTestimonial(currentTestimonial);
}

// Menu items data
function initMenuItems() {
    const menuItems = [
        {
            name: 'Butter Chicken',
            description: 'Tender chicken cooked in a rich, creamy tomato sauce with aromatic spices.',
            price: '₹350',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Paneer Tikka',
            description: 'Cubes of paneer marinated in spices and grilled to perfection.',
            price: '₹280',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Dal Makhani',
            description: 'Black lentils and kidney beans cooked with butter and cream.',
            price: '₹250',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Biryani',
            description: 'Fragrant basmati rice cooked with aromatic spices and your choice of vegetables or meat.',
            price: '₹320',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Gulab Jamun',
            description: 'Sweet, soft dough balls soaked in sugar syrup, served warm.',
            price: '₹180',
            image: 'https://images.unsplash.com/photo-1563720360170-1a61a8f3c629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Masala Chai',
            description: 'Traditional Indian tea brewed with aromatic spices and milk.',
            price: '₹60',
            image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
    ];
    
    const dishesGrid = document.querySelector('.dishes-grid');
    
    menuItems.forEach(item => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="dish-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="dish-meta">
                    <span class="price">${item.price}</span>
                    <button class="btn btn-sm">Order Now</button>
                </div>
            </div>
        `;
        
        dishesGrid.appendChild(dishCard);
    });
}

// Golden Memories Gallery Slider
function initGallerySlider() {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const itemWidth = items[0].offsetWidth + 20; // 20 for margin
    let position = 0;
    let total = items.length;

    // Clone first 3 for infinite effect
    for(let i=0; i<3; i++) {
        const clone = items[i].cloneNode(true);
        track.appendChild(clone);
    }

    function slide() {
        position++;
        track.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
        track.style.transform = `translateX(-${position * itemWidth}px)`;
        if (position === total) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                position = 0;
            }, 650);
        }
    }

    setInterval(slide, 2000);
}

// Hero Slideshow
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Start the slideshow
    slides[0].classList.add('active');
    setInterval(nextSlide, 1000); // Set to 1 second
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initGallery();
    initTestimonials();
    initMenuItems();
    initHeroSlideshow();
    initGallerySlider();
    
    // Form submission
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Trigger scroll once to set initial header state
    handleScroll();
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add loading="lazy" to all images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.loading = 'lazy';
    });
});

// Swiper.js - Testimonials Carousel
var testimonialSwiper = new Swiper('.testimonial-swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 2500,
    grabCursor: true,
    allowTouchMove: true,
    centeredSlides: false,
    breakpoints: {
      1024: { slidesPerView: 3 },
      700: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    },
    navigation: false,
    pagination: false,
    effect: 'slide',
  });

  // Menu page box animation: slide-up on load
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.modern-menu-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('show');
      }, 120 * i); // staggered animation
    });
  });

// SweetAlert2 for Add to Cart notification
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swal !== 'undefined') {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Added to cart!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: '#fffdfa',
          color: '#222'
        });
      });
    });
  }
});

// Swiper.js - Video Carousel
var videoSwiper = new Swiper('.video-swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 24,
  centeredSlides: true,
});