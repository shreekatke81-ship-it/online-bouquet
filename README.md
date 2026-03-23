# 🌹 BloomLove – Online Bouquet Sender Website

A beautiful, fully interactive online bouquet sender website built with HTML, CSS, and JavaScript. Designed with a romantic color palette and smooth animations.

---

## ✅ Completed Features

### 🎨 Design & UI
- **Romantic Color Palette**: Deep rose (#c0395a), blush pink, lavender, cream, crimson gradients
- **Animated Floating Petals**: Random floral/heart emojis drift across the background
- **Responsive Design**: Fully mobile-friendly (breakpoints at 768px & 480px)
- **Scroll Reveal Animations**: Sections fade in as the user scrolls
- **Active Navbar Highlighting**: Links highlight based on current visible section
- **Sticky Navbar with Blur**: Transparent blur effect that adds shadow on scroll
- **Hamburger Mobile Menu**: Collapsed nav for small screens

### 💐 Bouquet Collection
- **8 Unique Bouquets** across 4 categories: Roses, Mixed, Exotic, Seasonal
- **Filter Tabs**: Filter by All / Roses / Mixed / Exotic / Seasonal
- **Wishlist Button**: Heart toggle per bouquet card
- **Select & Highlight**: Selecting a bouquet highlights the card and scrolls to the form
- **Live Preview Panel**: Shows selected bouquet emoji, name & price in real-time

### 📬 Send Bouquet Form
- **Complete Sender & Recipient Details** (Name, Email, Phone)
- **Delivery Address, Date & Time Slot** selection (past dates blocked)
- **Bouquet Dropdown Select** with emoji + price labels
- **Personal Message** with 200-character counter
- **Anonymous Sending** checkbox option
- **Gift Wrapping** checkbox (adds $5 to total)
- **Real-time Price Update** when gift wrap toggled
- **Form Validation** with toast error messages
- **Loading State Animation** on submit

### 🎉 Success Experience
- **Success Modal** with bounce animation
- **Confetti Explosion** with hearts & flowers on delivery
- **Order Summary** showing bouquet, date, time, total
- **Order Saved to Database** via RESTful Table API

### 🖼️ Gallery Section
- Masonry-style grid with 6 emoji-based gallery items
- Hover overlays with bouquet name
- Large and wide featured items

### 💬 Testimonials Slider
- 4 customer testimonials with auto-slide (5s interval)
- Dot navigation controls
- Fade-in animation per card
- Star ratings & customer avatars

### 🦶 Footer
- Brand, Quick Links, Support, Contact Us columns
- Social media links (Instagram, Facebook, Twitter, Pinterest)
- Responsive grid layout

---

## 🗂️ File Structure

```
index.html           – Main HTML page
css/
  style.css          – All styles & animations (romantic palette)
js/
  main.js            – All JS logic (bouquets, form, slider, etc.)
README.md            – This file
```

---

## 🔗 Functional Entry URIs

| Section | Anchor |
|---------|--------|
| Home / Hero | `#home` |
| Bouquet Collection | `#bouquets` |
| Send Bouquet Form | `#send` |
| Gallery | `#gallery` |
| Testimonials | `#testimonials` |

---

## 🗄️ Data Model

**Table: `orders`**

| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Unique order ID (auto) |
| `sender_name` | text | Sender's full name |
| `sender_email` | text | Sender's email address |
| `recipient_name` | text | Recipient's name |
| `recipient_phone` | text | Recipient's phone |
| `delivery_address` | text | Full delivery address |
| `delivery_date` | text | Requested delivery date |
| `delivery_time` | text | Time slot (morning/afternoon/evening) |
| `bouquet_name` | text | Selected bouquet name |
| `bouquet_emoji` | text | Bouquet emoji |
| `personal_message` | rich_text | Optional love message |
| `is_anonymous` | bool | Anonymous sending flag |
| `has_gift_wrap` | bool | Gift wrapping add-on |
| `total_price` | text | Final order total |
| `status` | text | Order status (Confirmed/Preparing/etc.) |

**API Endpoint:** `POST tables/orders`

---

## 🚀 Features Not Yet Implemented

- Real payment gateway integration (Stripe, PayPal)
- Order tracking page with live status updates
- Admin dashboard to manage/view all orders
- Email confirmation system (requires backend)
- User login / order history
- Real flower photography (CDN images)
- Promo codes / discount system
- Subscription boxes (weekly/monthly)

---

## 💡 Recommended Next Steps

1. **Add real flower images** from a photo CDN
2. **Integrate a payment UI** (Stripe.js for client-side card collection)
3. **Build an order tracker** page using the `orders` table API
4. **Add more bouquet varieties** and seasonal collections
5. **Implement a loyalty rewards** counter in the header

---

*Made with ❤️ by BloomLove — Spreading love, one bouquet at a time.*
