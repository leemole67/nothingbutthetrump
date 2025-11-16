// Display current date in header
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Smooth scroll for read more links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Add animation to articles on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(article);
    });
}

// Add click tracking for analytics (placeholder)
function initializeAnalytics() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Placeholder for analytics tracking
            console.log('Article clicked:', this.closest('.article-card, .hero-article'));
        });
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeAnalytics();
});

// Update date at midnight
function scheduleNextDateUpdate() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        displayCurrentDate();
        scheduleNextDateUpdate();
    }, timeUntilMidnight);
}

scheduleNextDateUpdate();
