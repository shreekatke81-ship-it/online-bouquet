// ============================================
//   BloomLove – Romantic Bouquet Sender JS
// ============================================

// --- Bouquet Data ---
const bouquets = [
    {
        id: 1, name: "Crimson Passion",
        emoji: "🌹", category: "roses",
        price: "$49.99", rawPrice: 49.99,
        desc: "12 lush red roses symbolizing deep love and desire. Perfect for anniversaries.",
        rating: 4.9, reviews: 312, badge: "Best Seller"
    },
    {
        id: 2, name: "Pink Dream Cloud",
        emoji: "🌸", category: "mixed",
        price: "$39.99", rawPrice: 39.99,
        desc: "A dreamy mix of pink peonies, carnations & cherry blossoms.",
        rating: 4.8, reviews: 198, badge: "Popular"
    },
    {
        id: 3, name: "Lavender Romance",
        emoji: "💐", category: "mixed",
        price: "$54.99", rawPrice: 54.99,
        desc: "Elegant lavender roses, wisteria & soft white lilies.",
        rating: 4.9, reviews: 145, badge: "New"
    },
    {
        id: 4, name: "Exotic Passion",
        emoji: "🌺", category: "exotic",
        price: "$64.99", rawPrice: 64.99,
        desc: "Rare hibiscus and tropical blooms for someone truly unique.",
        rating: 4.7, reviews: 89, badge: "Premium"
    },
    {
        id: 5, name: "Rose Gold Bliss",
        emoji: "🌷", category: "roses",
        price: "$44.99", rawPrice: 44.99,
        desc: "Soft blush & peach roses, perfect for saying 'I care'.",
        rating: 4.8, reviews: 220, badge: ""
    },
    {
        id: 6, name: "Lotus Serenity",
        emoji: "🪷", category: "exotic",
        price: "$58.99", rawPrice: 58.99,
        desc: "Sacred lotus blooms and white orchids for peaceful love.",
        rating: 4.9, reviews: 102, badge: "Exclusive"
    },
    {
        id: 7, name: "Spring Melody",
        emoji: "🌼", category: "seasonal",
        price: "$35.99", rawPrice: 35.99,
        desc: "Cheerful daisies, sunflowers & spring tulips.",
        rating: 4.6, reviews: 175, badge: ""
    },
    {
        id: 8, name: "Midnight Rose",
        emoji: "🖤", category: "roses",
        price: "$72.99", rawPrice: 72.99,
        desc: "Rare black & deep purple roses for a mysterious, passionate gesture.",
        rating: 5.0, reviews: 67, badge: "Limited"
    }
];

// --- Testimonials Data ---
const testimonials = [
    {
        text: "I sent the Crimson Passion bouquet to my wife on our anniversary and she was absolutely speechless! The flowers arrived fresh, beautifully wrapped, and the personal note made her cry tears of joy. BloomLove exceeded every expectation.",
        name: "James T.",
        title: "Anniversary Customer",
        avatar: "💑",
        rating: "★★★★★"
    },
    {
        text: "Ordered for Valentine's Day and the delivery was right on time — even earlier than expected! My girlfriend was so surprised. The bouquet was even more gorgeous in person than in the photos. Will definitely order again!",
        name: "Sophie M.",
        title: "Valentine's Customer",
        avatar: "🌹",
        rating: "★★★★★"
    },
    {
        text: "I was skeptical about ordering flowers online but BloomLove changed my mind completely. The Lavender Romance bouquet was stunning. Customer service was also amazing when I needed to change the delivery time. 10/10!",
        name: "Daniel R.",
        title: "Repeat Customer",
        avatar: "👨‍💼",
        rating: "★★★★★"
    },
    {
        text: "Sent a bouquet to my mom for her birthday — anonymous option is such a sweet touch! She spent three days trying to figure out who sent it. The quality was outstanding. Freshest flowers I've ever seen delivered.",
        name: "Emma L.",
        title: "Birthday Customer",
        avatar: "🌸",
        rating: "★★★★☆"
    }
];

// --- State ---
let selectedBouquet = null;
let currentFilter = 'all';
let currentTestimonial = 0;
let testimonialInterval;

// ============================================
//   INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    renderBouquets(bouquets);
    populateBouquetSelect();
    renderTestimonials();
    setupNavbar();
    setupForm();
    setupFilters();
    setupRevealAnimations();
    setMinDeliveryDate();
    startTestimonialAutoplay();
    setupHamburger();
});

// ============================================
//   FLOATING PETALS
// ============================================
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalEmojis = ['🌸', '🌹', '💕', '🌺', '🪷', '💖', '🌷', '✨'];
    const count = window.innerWidth < 768 ? 8 : 16;

    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
        petal.style.animationDuration = `${Math.random() * 8 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(petal);
    }
}

// ============================================
//   NAVBAR
// ============================================
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ============================================
//   RENDER BOUQUETS
// ============================================
function renderBouquets(list) {
    const grid = document.getElementById('bouquetsGrid');
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px; color:var(--text-light);">
            <span style="font-size:3rem">🌿</span>
            <p style="margin-top:12px; font-size:1.1rem;">No bouquets found in this category.</p>
        </div>`;
        return;
    }

    list.forEach((bouquet, index) => {
        const card = document.createElement('div');
        card.className = `bouquet-card reveal ${selectedBouquet?.id === bouquet.id ? 'selected' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.dataset.id = bouquet.id;

        const stars = generateStars(bouquet.rating);

        card.innerHTML = `
            ${bouquet.badge ? `<div class="card-badge">${bouquet.badge}</div>` : ''}
            <button class="card-wishlist" data-id="${bouquet.id}" onclick="toggleWishlist(event, ${bouquet.id})">🤍</button>
            <div class="card-image">${bouquet.emoji}</div>
            <div class="card-body">
                <div class="card-category">${bouquet.category}</div>
                <div class="card-name">${bouquet.name}</div>
                <div class="card-desc">${bouquet.desc}</div>
                <div class="card-footer">
                    <div>
                        <div class="card-price">${bouquet.price}</div>
                        <div class="card-rating"><span>${stars}</span> (${bouquet.reviews})</div>
                    </div>
                    <button class="btn-select ${selectedBouquet?.id === bouquet.id ? 'selected-btn' : ''}"
                        onclick="selectBouquet(${bouquet.id})">
                        ${selectedBouquet?.id === bouquet.id ? '✓ Selected' : 'Select'}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 50 + index * 80);
    });
}

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    let stars = '★'.repeat(full);
    if (half) stars += '½';
    return stars;
}

// ============================================
//   SELECT BOUQUET
// ============================================
function selectBouquet(id) {
    selectedBouquet = bouquets.find(b => b.id === id);

    // Update form select
    const select = document.getElementById('bouquetSelect');
    select.value = id;

    // Update preview
    document.getElementById('previewEmoji').textContent = selectedBouquet.emoji;
    document.getElementById('previewName').textContent = selectedBouquet.name;

    const giftWrap = document.getElementById('giftWrap').checked;
    const price = giftWrap ? (selectedBouquet.rawPrice + 5).toFixed(2) : selectedBouquet.price;
    document.getElementById('previewPrice').textContent = `${typeof price === 'string' ? price : '$' + price}`;

    // Re-render bouquets to show selection
    const filtered = currentFilter === 'all' ? bouquets : bouquets.filter(b => b.category === currentFilter);
    renderBouquets(filtered);

    // Scroll to send section
    scrollToSection('send');

    // Show toast
    showToast(`💐 "${selectedBouquet.name}" selected! Fill the form below.`);
}

// ============================================
//   WISHLIST TOGGLE
// ============================================
const wishlist = new Set();

function toggleWishlist(event, id) {
    event.stopPropagation();
    const btn = event.currentTarget;
    if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.textContent = '🤍';
    } else {
        wishlist.add(id);
        btn.textContent = '❤️';
        btn.classList.add('liked');
        setTimeout(() => btn.classList.remove('liked'), 300);
    }
}

// ============================================
//   FILTER TABS
// ============================================
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            const filtered = currentFilter === 'all' ? bouquets : bouquets.filter(b => b.category === currentFilter);
            renderBouquets(filtered);
        });
    });
}

// ============================================
//   POPULATE FORM SELECT
// ============================================
function populateBouquetSelect() {
    const select = document.getElementById('bouquetSelect');
    bouquets.forEach(b => {
        const option = document.createElement('option');
        option.value = b.id;
        option.textContent = `${b.emoji} ${b.name} – ${b.price}`;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        if (e.target.value) {
            selectBouquetFromForm(parseInt(e.target.value));
        }
    });
}

function selectBouquetFromForm(id) {
    selectedBouquet = bouquets.find(b => b.id === id);
    document.getElementById('previewEmoji').textContent = selectedBouquet.emoji;
    document.getElementById('previewName').textContent = selectedBouquet.name;
    document.getElementById('previewPrice').textContent = selectedBouquet.price;
}

// ============================================
//   SET MIN DATE
// ============================================
function setMinDeliveryDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('deliveryDate').min = `${yyyy}-${mm}-${dd}`;
}

// ============================================
//   FORM SETUP
// ============================================
function setupForm() {
    const form = document.getElementById('sendForm');
    const textarea = document.getElementById('personalMessage');
    const charCount = document.getElementById('charCount');
    const giftWrap = document.getElementById('giftWrap');

    // Character counter
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        if (len > 200) {
            textarea.value = textarea.value.slice(0, 200);
        }
        charCount.textContent = `${Math.min(len, 200)} / 200`;
        charCount.style.color = len > 180 ? 'var(--deep-rose)' : 'var(--text-light)';
    });

    // Update price on gift wrap toggle
    giftWrap.addEventListener('change', () => {
        if (selectedBouquet) {
            const extra = giftWrap.checked ? 5 : 0;
            const total = (selectedBouquet.rawPrice + extra).toFixed(2);
            document.getElementById('previewPrice').textContent = `$${total}`;
        }
    });

    // Form submit
    form.addEventListener('submit', handleFormSubmit);
}

// ============================================
//   FORM SUBMIT
// ============================================
async function handleFormSubmit(e) {
    e.preventDefault();

    const sendBtn = document.getElementById('sendBtn');

    // Validate bouquet
    const bouquetId = document.getElementById('bouquetSelect').value;
    if (!bouquetId) {
        showToast('🌹 Please select a bouquet first!', 'error');
        return;
    }

    // Get values
    const senderName = document.getElementById('senderName').value.trim();
    const senderEmail = document.getElementById('senderEmail').value.trim();
    const recipientName = document.getElementById('recipientName').value.trim();
    const recipientPhone = document.getElementById('recipientPhone').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const deliveryDate = document.getElementById('deliveryDate').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const personalMessage = document.getElementById('personalMessage').value.trim();
    const isAnonymous = document.getElementById('anonymous').checked;
    const hasGiftWrap = document.getElementById('giftWrap').checked;

    if (!deliveryTime) {
        showToast('⏰ Please select a preferred delivery time!', 'error');
        return;
    }

    const bouquet = bouquets.find(b => b.id === parseInt(bouquetId));
    const totalPrice = hasGiftWrap ? (bouquet.rawPrice + 5).toFixed(2) : bouquet.rawPrice.toFixed(2);

    // Loading state
    sendBtn.classList.add('loading');
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending your love...';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save to table
    try {
        await saveOrder({
            sender_name: isAnonymous ? 'Anonymous' : senderName,
            sender_email: senderEmail,
            recipient_name: recipientName,
            recipient_phone: recipientPhone,
            delivery_address: deliveryAddress,
            delivery_date: deliveryDate,
            delivery_time: deliveryTime,
            bouquet_name: bouquet.name,
            bouquet_emoji: bouquet.emoji,
            personal_message: personalMessage || '(No message)',
            is_anonymous: isAnonymous,
            has_gift_wrap: hasGiftWrap,
            total_price: totalPrice,
            status: 'Confirmed'
        });
    } catch (err) {
        console.log('Table save error (non-critical):', err);
    }

    // Reset loading state
    sendBtn.classList.remove('loading');
    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send My Bouquet 💌';

    // Show modal
    showSuccessModal({
        recipient: recipientName,
        bouquet: bouquet.name + ' ' + bouquet.emoji,
        date: formatDate(deliveryDate),
        time: deliveryTime,
        total: `$${totalPrice}`,
        anonymous: isAnonymous,
        giftWrap: hasGiftWrap
    });

    // Reset form
    e.target.reset();
    selectedBouquet = null;
    document.getElementById('previewEmoji').textContent = '💐';
    document.getElementById('previewName').textContent = 'No bouquet selected';
    document.getElementById('previewPrice').textContent = 'Select from above ↑';
    document.getElementById('charCount').textContent = '0 / 200';
    renderBouquets(currentFilter === 'all' ? bouquets : bouquets.filter(b => b.category === currentFilter));
}

// ============================================
//   SAVE ORDER
// ============================================
async function saveOrder(data) {
    const response = await fetch('tables/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// ============================================
//   SUCCESS MODAL
// ============================================
function showSuccessModal(details) {
    const modal = document.getElementById('successModal');
    const modalMsg = document.getElementById('modalMsg');
    const modalDetails = document.getElementById('modalDetails');

    modalMsg.textContent = `Your beautiful bouquet is flying to ${details.recipient} with all your love! 💕`;

    modalDetails.innerHTML = `
        <p><strong>💐 Bouquet:</strong> ${details.bouquet}</p>
        <p><strong>📅 Delivery:</strong> ${details.date} – ${getTimeLabel(details.time)}</p>
        <p><strong>💰 Total:</strong> ${details.total}</p>
        ${details.anonymous ? '<p><strong>🕵️ Sent:</strong> Anonymously</p>' : ''}
        ${details.giftWrap ? '<p><strong>🎁 Gift Wrapping:</strong> Included</p>' : ''}
    `;

    modal.classList.add('show');
    launchConfetti();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    scrollToSection('home');
}

// ============================================
//   CONFETTI
// ============================================
function launchConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const items = ['🎉', '💕', '🌹', '✨', '💖', '🌸', '🎊'];
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.2 + 0.8}rem;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: confettiFall ${Math.random() * 2 + 1.5}s ease forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        piece.textContent = items[Math.floor(Math.random() * items.length)];
        container.appendChild(piece);
    }
}

// Add confetti animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(350px) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
//   TESTIMONIALS
// ============================================
function renderTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.getElementById('sliderDots');
    slider.innerHTML = '';
    dots.innerHTML = '';

    testimonials.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = `testimonial-card ${i === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="testimonial-rating">${t.rating}</div>
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
                <div class="author-avatar">${t.avatar}</div>
                <div>
                    <div class="author-name">${t.name}</div>
                    <div class="author-title">${t.title}</div>
                </div>
            </div>
        `;
        slider.appendChild(card);

        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showTestimonial(i));
        dots.appendChild(dot);
    });
}

function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }, 5000);
}

// ============================================
//   SCROLL REVEAL
// ============================================
function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-header, .send-left, .send-right, .gallery-item, .features-strip, .footer').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============================================
//   UTILITY HELPERS
// ============================================
function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatDate(dateStr) {
    if (!dateStr) return 'TBD';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getTimeLabel(value) {
    const map = {
        morning: 'Morning (8AM – 12PM)',
        afternoon: 'Afternoon (12PM – 4PM)',
        evening: 'Evening (4PM – 8PM)'
    };
    return map[value] || value;
}

// ============================================
//   TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; bottom: 28px; left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: ${type === 'error' ? '#c0395a' : 'linear-gradient(135deg, #c0395a, #9c27b0)'};
        color: white; padding: 14px 28px;
        border-radius: 50px; font-weight: 700;
        font-size: 0.95rem; z-index: 9998;
        box-shadow: 0 8px 30px rgba(192, 57, 90, 0.4);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
        white-space: nowrap; max-width: 90vw;
        font-family: 'Lato', sans-serif;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ============================================
//   CLOSE MODAL ON OVERLAY CLICK
// ============================================
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ============================================
//   SMOOTH NAV LINK ACTIVE HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// Add active-link style
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `.nav-links a.active-link { color: var(--deep-rose) !important; }`;
document.head.appendChild(activeLinkStyle);

console.log('💐 BloomLove loaded successfully!');
