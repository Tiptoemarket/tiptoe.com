/* sections/section-1-home/home.js */
// Tiptoe.com - Section 1 Home Page JavaScript
// GitHub Pages Safe - Vanilla JS Only

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSearch();
    initNavCubes();
    initEvents();
    initNewsletter();
    initPerformance();
    initAccessibility();
});

// Search Component
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchCategory = document.querySelector('.search-category');
    
    if (!searchInput || !searchBtn) return;
    
    // Search functionality
    function performSearch() {
        const query = searchInput.value.trim();
        const category = searchCategory ? searchCategory.value : 'all';
        
        if (!query) {
            searchInput.focus();
            return;
        }
        
        // Simulate search - in production this would make an API call
        console.log('Searching for:', { query, category });
        
        // Show loading state
        const originalText = searchBtn.textContent;
        searchBtn.innerHTML = '<span class="search-icon">⏳</span> Searching...';
        searchBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // Reset button
            searchBtn.innerHTML = '<span class="search-icon">🔍</span> Search';
            searchBtn.disabled = false;
            
            // In production, redirect to search results page
            // window.location.href = `/search?q=${encodeURIComponent(query)}&category=${category}`;
            
            // For demo purposes, show alert
            if (query.length > 2) {
                alert(`Searching for "${query}" in ${category} category`);
            }
        }, 500);
    }
    
    // Event Listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Popular search suggestions (simulated)
    const popularSearches = [
        'discounted iPhone',
        'damaged laptop',
        'unwanted clothes',
        'flash auctions',
        'free gifts'
    ];
    
    let currentSuggestion = 0;
    
    // Cycle through popular searches in placeholder (optional)
    function rotatePlaceholder() {
        if (searchInput.value === '') {
            searchInput.placeholder = `Search for ${popularSearches[currentSuggestion]}...`;
            currentSuggestion = (currentSuggestion + 1) % popularSearches.length;
        }
    }
    
    // Uncomment to enable rotating placeholders
    // setInterval(rotatePlaceholder, 3000);
}

// Navigation Cubes Component
function initNavCubes() {
    const cubes = document.querySelectorAll('.cube');
    
    if (cubes.length === 0) return;
    
    cubes.forEach(cube => {
        // Add click tracking
        cube.addEventListener('click', function(e) {
            const cubeId = this.getAttribute('data-cube');
            const cubeTitle = this.querySelector('.cube-title').textContent;
            
            console.log(`Cube ${cubeId} clicked: ${cubeTitle}`);
            
            // Analytics tracking (simulated)
            trackEvent('cube_click', {
                cube_id: cubeId,
                cube_title: cubeTitle
            });
        });
        
        // Add keyboard navigation support
        cube.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styling
        cube.addEventListener('focus', function() {
            this.style.outline = '2px solid #FF6A00';
            this.style.outlineOffset = '2px';
        });
        
        cube.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Cube hover effects enhancement
    cubes.forEach(cube => {
        cube.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.cube-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        cube.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.cube-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Events Component
function initEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    const videoBtn = document.querySelector('.video-play-btn');
    
    // Event items interaction
    eventItems.forEach(item => {
        item.addEventListener('click', function() {
            const day = this.querySelector('.event-day').textContent;
            const eventName = this.querySelector('strong').textContent;
            
            console.log(`Event selected: ${day} - ${eventName}`);
            
            // Show event details (simulated)
            showEventModal(day, eventName);
        });
        
        // Make event items keyboard accessible
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Video button functionality
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            console.log('Video play button clicked');
            
            // In production, this would open a video modal
            showVideoModal();
            
            // Track video engagement
            trackEvent('video_play', {
                location: 'hero',
                button_type: 'play'
            });
        });
    }
    
    // Current day highlight
    function highlightCurrentDay() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        const todayName = days[today];
        
        eventItems.forEach(item => {
            const dayElement = item.querySelector('.event-day');
            if (dayElement && dayElement.textContent.includes(todayName)) {
                item.style.background = 'rgba(255, 106, 0, 0.1)';
                item.style.borderRadius = '8px';
                item.style.padding = '16px';
                item.style.margin = '0 -16px';
                
                // Add "Today" badge
                const todayBadge = document.createElement('span');
                todayBadge.className = 'today-badge';
                todayBadge.textContent = 'TODAY';
                todayBadge.style.cssText = `
                    background: #00A854;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    padding: 2px 6px;
                    border-radius: 10px;
                    margin-left: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                `;
                
                const strongElement = item.querySelector('strong');
                if (strongElement) {
                    strongElement.appendChild(todayBadge);
                }
            }
        });
    }
    
    // Call on DOM ready
    highlightCurrentDay();
}

// Newsletter Component
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (!newsletterForm || !newsletterInput || !newsletterBtn) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            newsletterInput.focus();
            return;
        }
        
        // Simulate API call
        subscribeToNewsletter(email);
    });
    
    newsletterBtn.addEventListener('click', function() {
        newsletterForm.dispatchEvent(new Event('submit'));
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Performance Optimizations
function initPerformance() {
    // Lazy load images (if added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle responsive behaviors
            console.log('Window resized');
        }, 250);
    });
}

// Accessibility Features
function initAccessibility() {
    // Skip to content link (hidden until focused)
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #FF6A00;
        color: white;
        padding: 8px;
        z-index: 1001;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // Add skip link at the beginning of body
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
    mainContent.style.cssText = 'outline: none;';
    
    // Move hero and cubes into main content
    const hero = document.querySelector('.hero');
    const cubes = document.querySelector('.nav-cubes');
    const events = document.querySelector('.events-teaser');
    
    if (hero && cubes && events) {
        document.body.insertBefore(mainContent, hero);
        mainContent.appendChild(hero);
        mainContent.appendChild(cubes);
        mainContent.appendChild(events);
    }
    
    // ARIA Live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
    
    // Store reference for announcements
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

// Helper Functions
function trackEvent(eventName, data = {}) {
    // Simulated analytics tracking
    console.log(`Event tracked: ${eventName}`, data);
    
    // In production, this would send to Google Analytics, etc.
    // gtag('event', eventName, data);
}

function showEventModal(day, eventName) {
    // Simulated modal for event details
    const modalContent = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
        ">
            <h3 style="color: #FF6A00; margin-bottom: 16px;">${eventName}</h3>
            <p>Every <strong>${day}</strong> on Tiptoe.com</p>
            <p style="margin: 20px 0;">Special deals, flash auctions, and community events happen every week!</p>
            <button onclick="this.parentElement.remove()" style="
                background: #FF6A00;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
            ">
                Got it!
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.remove(); this.previousElementSibling.remove()"></div>
    `;
    
    // Create and inject modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer.firstElementChild);
    document.body.appendChild(modalContainer.lastElementChild);
}

function showVideoModal() {
    // Simulated video modal
    const modalContent = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            padding: 20px;
            border-radius: 16px;
            z-index: 10000;
            max-width: 800px;
            width: 90%;
        ">
            <div style="
                background: linear-gradient(135deg, #FF6A00, #FF8C40);
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                margin-bottom: 20px;
            ">
                <div style="text-align: center; color: white;">
                    <div style="font-size: 60px; margin-bottom: 20px;">▶</div>
                    <h3 style="margin: 0;">How Tiptoe Works</h3>
                    <p>Video coming soon!</p>
                </div>
            </div>
            <button onclick="this.parentElement.remove(); this.nextElementSibling.remove()" style="
                background: #FF6A00;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
            ">
                Close Preview
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
        " onclick="this.remove(); this.previousElementSibling.remove()"></div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer.firstElementChild);
    document.body.appendChild(modalContainer.lastElementChild);
}

function subscribeToNewsletter(email) {
    const btn = document.querySelector('.newsletter-btn');
    const originalText = btn.textContent;
    
    // Show loading state
    btn.textContent = 'Subscribing...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        btn.textContent = 'Subscribed! ✓';
        btn.style.background = '#00A854';
        
        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Successfully subscribed to newsletter');
        }
        
        // Reset after delay
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            
            // Clear input
            document.querySelector('.newsletter-input').value = '';
            
            // Show success message
            showMessage('Thanks for subscribing! Check your email for confirmation.', 'success');
        }, 2000);
    }, 1000);
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'error' ? '#FF3333' : type === 'success' ? '#00A854' : '#FF6A00'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    // Add CSS for animation
    if (!document.querySelector('#message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageEl);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Export functions for potential module use (if ES6 modules supported)
if (typeof window !== 'undefined') {
    window.TiptoeHome = {
        initSearch,
        initNavCubes,
        initEvents,
        initNewsletter,
        trackEvent,
        showMessage
    };
}

/*
REACT/NEXT.JS CONVERSION NOTES:

This JavaScript will be converted into React hooks and components:

1. Search Component -> useSearch() hook
   - useState for query and category
   - useEffect for debouncing
   - API call function

2. NavCubes -> CubeGrid component
   - map() over cubes data
   - Each cube: <Cube key={id} {...cubeProps} />

3. Events -> EventsSection component
   - useEffect for current day highlight
   - useState for selected event
   - Modal component for event details

4. Newsletter -> NewsletterForm component
   - useState for email and status
   - useCallback for submit handler
   - useEffect for cleanup

5. Performance -> Custom hooks:
   - useIntersectionObserver()
   - useWindowSize()
   - useDebounce()

6. Accessibility -> Custom provider:
   - SkipToContent component
   - AriaLiveProvider context
   - useAnnounce() hook

Component Structure:
   <App>
     <SkipToContent />
     <Header />
     <Main>
       <Hero />
       <SearchBar />
       <CubeGrid />
       <EventsSection />
     </Main>
     <Footer />
     <NewsletterModal />
     <EventModal />
   </App>

WordPress Integration Notes:

This JavaScript can be integrated with WordPress as follows:

1. Enqueue scripts in functions.php:
   wp_enqueue_script('tiptoe-home', get_template_directory_uri() . '/js/home.js', [], '1.0.0', true);

2. Localize script for WordPress data:
   wp_localize_script('tiptoe-home', 'tiptoeData', [
     'ajax_url' => admin_url('admin-ajax.php'),
     'nonce' => wp_create_nonce('tiptoe_nonce')
   ]);

3. WordPress REST API endpoints:
   - POST /wp-json/tiptoe/v1/search
   - POST /wp-json/tiptoe/v1/newsletter
   - GET /wp-json/tiptoe/v1/events

4. WooCommerce integration:
   - Use WooCommerce REST API for product search
   - WC_AJAX for cart/checkout functionality
   - WC shortcodes for product display

Elementor/Widget Integration:

1. Create custom widgets for:
   - Search Bar Widget
   - Cube Grid Widget
   - Events Widget
   - Newsletter Widget

2. Each widget has settings in Elementor panel

3. Dynamic content via:
   - Elementor Dynamic Tags
   - WordPress queries
   - Custom fields
*/