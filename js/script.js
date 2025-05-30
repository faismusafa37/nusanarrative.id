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

   // Team Slider
// Team Slider Function
function initTeamSlider() {
    const teamGrid = document.getElementById('teamGrid');
    const teamMembers = document.querySelectorAll('.team-member');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!teamGrid || !dotsContainer) return; // Exit if elements not found
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots
    teamMembers.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Update active slide
    const updateActiveSlide = (index) => {
        teamMembers.forEach((member, i) => {
            member.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };
    
    // Go to specific slide
    const goToSlide = (index) => {
        currentIndex = index;
        const memberWidth = teamMembers[0].offsetWidth + 30; // width + margin
        teamGrid.style.transform = `translateX(-${currentIndex * memberWidth}px)`;
        updateActiveSlide(currentIndex);
        resetAutoSlide();
    };
    
    // Next slide
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % teamMembers.length;
        goToSlide(currentIndex);
    };
    
    // Previous slide
    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length;
        goToSlide(currentIndex);
    };
    
    // Auto slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    };
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    // Initialize
    updateActiveSlide(0);
    startAutoSlide();
    
    // Pause on hover
    teamGrid.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    teamGrid.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    const teamSlider = function() {
        const teamGrid = document.getElementById('teamGrid');
        const teamMembers = document.querySelectorAll('.team-member');
        const dotsContainer = document.getElementById('sliderDots');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (!teamGrid || !teamMembers.length) return;
        
        let currentIndex = 0;
        let autoSlideInterval;
        const slideDuration = 5000; // 5 detik
        
        // Fungsi untuk membuat dots
        const createDots = () => {
            dotsContainer.innerHTML = '';
            teamMembers.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        };
        
        // Fungsi update slide
        const updateSlide = () => {
            const slideWidth = teamMembers[0].offsetWidth;
            teamGrid.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update active class
            teamMembers.forEach((member, index) => {
                member.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Pergi ke slide tertentu
        const goToSlide = (index) => {
            currentIndex = index;
            if (currentIndex >= teamMembers.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = teamMembers.length - 1;
            updateSlide();
        };
        
        // Slide otomatis
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                currentIndex++;
                if (currentIndex >= teamMembers.length) currentIndex = 0;
                updateSlide();
            }, slideDuration);
        };
        
        // Reset interval
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            goToSlide(currentIndex);
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            goToSlide(currentIndex);
            resetAutoSlide();
        });
        
        // Inisialisasi
        createDots();
        updateSlide();
        startAutoSlide();
        
        // Pause saat hover
        teamGrid.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        teamGrid.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    };
    
    // Panggil fungsi slider
    teamSlider();

}

    initTeamSlider();
    
});



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