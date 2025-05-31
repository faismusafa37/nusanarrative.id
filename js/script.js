// Pastikan ini dijalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });

    // Counter animation
    const animateCounters = () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target + '+';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    };

    // Intersection Observer untuk animasi
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Form Submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    //         contactForm.reset();
    //     });
    // }
    const teamGrid = document.querySelector(".team-grid");
    const allMembers = Array.from(document.querySelectorAll(".team-member"));
    const dotsContainer = document.querySelector(".slider-dots");
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds
    let visibleItems = getVisibleItems();
    
    function getVisibleItems() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    function initSlider() {
        // Clear existing slides
        teamGrid.innerHTML = '';
        
        // Create slides based on visibleItems
        const totalSlides = Math.ceil(allMembers.length / visibleItems);
        
        for (let i = 0; i < totalSlides; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            // Add members to this slide
            const startIdx = i * visibleItems;
            const endIdx = startIdx + visibleItems;
            
            for (let j = startIdx; j < endIdx && j < allMembers.length; j++) {
                slide.appendChild(allMembers[j]);
            }
            
            teamGrid.appendChild(slide);
        }
        
        updateDots();
        updateSlide();
        activateCurrentMembers();
    }
    
    function updateDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = Math.ceil(allMembers.length / visibleItems);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlide() {
        teamGrid.style.transform = `translateX(-${currentIndex * 100}%)`;
        activateCurrentMembers();
    }
    
    function activateCurrentMembers() {
        // Reset all members
        allMembers.forEach(member => {
            member.classList.remove('active');
        });
        
        // Activate current slide members
        const startIdx = currentIndex * visibleItems;
        const endIdx = startIdx + visibleItems;
        
        for (let i = startIdx; i < endIdx && i < allMembers.length; i++) {
            setTimeout(() => {
                allMembers[i].classList.add('active');
            }, 100 * (i - startIdx));
        }
    }
    
    function goToSlide(index) {
        const totalSlides = Math.ceil(allMembers.length / visibleItems);
        currentIndex = (index + totalSlides) % totalSlides;
        updateSlide();
        updateDots();
        resetAutoSlide();
    }
    
    function nextSlide() {
        const totalSlides = Math.ceil(allMembers.length / visibleItems);
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
        updateDots();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newVisibleItems = getVisibleItems();
        if (newVisibleItems !== visibleItems) {
            visibleItems = newVisibleItems;
            currentIndex = 0;
            initSlider();
        }
    });
    
    // Pause on hover
    teamGrid.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    teamGrid.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    initSlider();
    startAutoSlide();
});
    
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          // Filter cards with animation
          serviceCards.forEach(card => {
              card.style.transition = 'all 0.5s ease';
              
              if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                  card.style.display = 'flex';
                  setTimeout(() => {
                      card.style.opacity = '1';
                      card.style.transform = 'scale(1)';
                  }, 50);
              } else {
                  card.style.opacity = '0';
                  card.style.transform = 'scale(0.9)';
                  setTimeout(() => {
                      card.style.display = 'none';
                  }, 500);
              }
          });
      });
  });
  
  // Scroll functionality
  const slider = document.querySelector('.services-grid');
  const scrollLeftBtn = document.querySelector('.scroll-btn.left');
  const scrollRightBtn = document.querySelector('.scroll-btn.right');
  
  scrollLeftBtn.addEventListener('click', () => {
      slider.scrollBy({left: -300, behavior: 'smooth'});
  });
  
  scrollRightBtn.addEventListener('click', () => {
      slider.scrollBy({left: 300, behavior: 'smooth'});
  });
  
  // Touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
          // Swipe left - scroll right
          slider.scrollBy({left: 200, behavior: 'smooth'});
      }
      if (touchEndX > touchStartX + 50) {
          // Swipe right - scroll left
          slider.scrollBy({left: -200, behavior: 'smooth'});
      }
  }
  
  // Hide scroll buttons when at edges
  function checkScrollPosition() {
      const scrollLeft = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      
      scrollLeftBtn.style.display = scrollLeft > 10 ? 'flex' : 'none';
      scrollRightBtn.style.display = scrollLeft < maxScroll - 10 ? 'flex' : 'none';
  }
  
  slider.addEventListener('scroll', checkScrollPosition);
  window.addEventListener('resize', checkScrollPosition);
  checkScrollPosition();

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });