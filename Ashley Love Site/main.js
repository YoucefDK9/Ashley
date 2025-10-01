// Main JavaScript for Romantic Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initParticleSystem();
    initTypewriter();
    initCounters();
    initAnimations();
    initMobileMenu();
    
    // Particle System using p5.js - Optimized for mobile
    function initParticleSystem() {
        new p5(function(p) {
            let particles = [];
            let numParticles = window.innerWidth < 768 ? 20 : 50; // Fewer particles on mobile
            
            p.setup = function() {
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('particle-container');
                
                // Create floating hearts
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new HeartParticle(p));
                }
            };
            
            p.draw = function() {
                p.clear();
                
                // Update and display particles
                for (let particle of particles) {
                    particle.update();
                    particle.display();
                }
            };
            
            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
                // Adjust particle count on resize
                numParticles = window.innerWidth < 768 ? 20 : 50;
            };
            
            // Heart particle class
            function HeartParticle(p) {
                this.x = p.random(p.width);
                this.y = p.random(p.height);
                this.size = p.random(10, 30);
                this.speed = p.random(0.5, 2);
                this.opacity = p.random(0.1, 0.3);
                this.drift = p.random(-0.5, 0.5);
                
                this.update = function() {
                    this.y -= this.speed;
                    this.x += this.drift;
                    
                    // Reset particle when it goes off screen
                    if (this.y < -50) {
                        this.y = p.height + 50;
                        this.x = p.random(p.width);
                    }
                    
                    if (this.x < -50 || this.x > p.width + 50) {
                        this.x = p.random(p.width);
                    }
                };
                
                this.display = function() {
                    p.push();
                    p.translate(this.x, this.y);
                    p.fill(232, 180, 160, this.opacity * 255);
                    p.noStroke();
                    
                    // Draw heart shape
                    p.ellipseMode(p.CENTER);
                    p.ellipse(-this.size/4, -this.size/4, this.size/2, this.size/2);
                    p.ellipse(this.size/4, -this.size/4, this.size/2, this.size/2);
                    p.triangle(-this.size/2, -this.size/4, this.size/2, -this.size/4, 0, this.size/2);
                    
                    p.pop();
                };
            }
        });
    }
    
    // Typewriter effect for hero story
    function initTypewriter() {
        const storyText = "45 days ago, in the virtual world of Roblox Neighbors, two hearts found each other across the digital divide. What started as a chance gaming encounter became the most beautiful love story - one that proves love knows no boundaries, not even those between pixels and reality.";
        
        const typed = new Typed('#hero-story', {
            strings: [storyText],
            typeSpeed: 30,
            showCursor: true,
            cursorChar: '💕',
            autoInsertCss: true,
            onComplete: function() {
                // Add gentle glow effect when typing is complete
                document.getElementById('hero-story').style.textShadow = '0 0 10px rgba(232, 180, 160, 0.3)';
            }
        });
    }
    
    // Animated counters
    function initCounters() {
        // Days counter animation
        const daysCounter = document.getElementById('days-counter');
        let currentDays = 0;
        const targetDays = 45;
        
        const daysAnimation = anime({
            targets: { count: currentDays },
            count: targetDays,
            duration: 2000,
            easing: 'easeOutExpo',
            update: function(anim) {
                daysCounter.textContent = Math.floor(anim.animatables[0].target.count);
            }
        });
        
        // Animate achievement badges on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const badges = entry.target.querySelectorAll('.achievement-badge');
                    anime({
                        targets: badges,
                        scale: [0, 1],
                        rotate: [0, 360],
                        duration: 1000,
                        delay: anime.stagger(200),
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
            });
        }, observerOptions);
        
        const achievementSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
        if (achievementSection) {
            observer.observe(achievementSection);
        }
    }
    
    // Initialize other animations
    function initAnimations() {
        // Animate hero title on load
        anime({
            targets: '.hero-title',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutElastic(1, .8)',
            delay: 500
        });
        
        // Animate floating hearts - optimized for mobile
        const heartAnimation = {
            targets: '.floating-heart',
            translateY: [-10, 10],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            delay: anime.stagger(500)
        };
        
        // Reduce animation intensity on mobile
        if (window.innerWidth < 768) {
            heartAnimation.duration = 3000;
            heartAnimation.translateY = [-5, 5];
        }
        
        anime(heartAnimation);
        
        // Animate story cards on scroll
        const storyCards = document.querySelectorAll('.story-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            });
        }, { threshold: 0.3 });
        
        storyCards.forEach(card => {
            cardObserver.observe(card);
        });
        
        // Add touch/hover effects to buttons
        const buttons = document.querySelectorAll('.glow-effect');
        buttons.forEach(button => {
            const effectHandler = function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            };
            
            const resetHandler = function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            };
            
            // Support both touch and hover
            button.addEventListener('mouseenter', effectHandler);
            button.addEventListener('mouseleave', resetHandler);
            button.addEventListener('touchstart', effectHandler);
            button.addEventListener('touchend', resetHandler);
        });
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                // Create mobile menu if it doesn't exist
                let mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu) {
                    mobileMenu = document.createElement('div');
                    mobileMenu.id = 'mobile-menu';
                    mobileMenu.className = 'md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100';
                    mobileMenu.innerHTML = `
                        <div class="px-6 py-4 space-y-4">
                            <a href="index.html" class="block text-gray-700 hover:text-pink-400 font-medium">Home</a>
                            <a href="timeline.html" class="block text-gray-700 hover:text-pink-400 font-medium">Our Timeline</a>
                            <a href="gallery.html" class="block text-gray-700 hover:text-pink-400 font-medium">Memories</a>
                            <a href="love-letter.html" class="block text-gray-700 hover:text-pink-400 font-medium">Love Letter</a>
                        </div>
                    `;
                    nav.appendChild(mobileMenu);
                }
                
                // Toggle menu visibility
                if (mobileMenu.style.display === 'none' || !mobileMenu.style.display) {
                    mobileMenu.style.display = 'block';
                    anime({
                        targets: mobileMenu,
                        opacity: [0, 1],
                        translateY: [-10, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: mobileMenu,
                        opacity: [1, 0],
                        translateY: [0, -10],
                        duration: 300,
                        easing: 'easeOutQuad',
                        complete: function() {
                            mobileMenu.style.display = 'none';
                        }
                    });
                }
            });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        if (loader) {
            anime({
                targets: loader,
                opacity: [1, 0],
                duration: 500,
                easing: 'easeOutQuad',
                complete: function() {
                    loader.style.display = 'none';
                }
            });
        }
        
        // Animate page entrance
        anime({
            targets: '.content-layer',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuad'
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add romantic cursor trail effect
    let cursorTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Create heart at cursor position occasionally
        if (Math.random() < 0.1) {
            createHeartAtCursor(e.clientX, e.clientY);
        }
    });
    
    function createHeartAtCursor(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.fontSize = '20px';
        heart.style.opacity = '0.7';
        
        document.body.appendChild(heart);
        
        anime({
            targets: heart,
            translateY: -50,
            opacity: [0.7, 0],
            scale: [1, 0.5],
            duration: 2000,
            easing: 'easeOutQuad',
            complete: function() {
                document.body.removeChild(heart);
            }
        });
    }
    
    console.log('💖 Romantic website initialized! Love is in the code 💖');
});