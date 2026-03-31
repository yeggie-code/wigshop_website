// ============================================================
//  EUCKEN HOUSE OF WIGS — Shared Store Data (store-data.js)
//  Simulates a backend. Both index.html and admin.html use this
//  via localStorage so stock updates reflect on the storefront.
// ============================================================

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "20\" Body Wave Lace Front",
    category: "Lace Front",
    description: "100% Human Hair · Natural Black · 150% Density",
    price: 3500,
    oldPrice: 5200,
    badge: "hot",
    emoji: "💁🏾‍♀️",
    image: null,
    color: "linear-gradient(135deg,#FFB3D1,#FFF0F6)",
    stock: 24,
    sold: 312,
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: "Kinky Curly Bob · 14\"",
    category: "Bob Wigs",
    description: "Synthetic Fiber · Multiple Colors · Easy Wear",
    price: 1200,
    oldPrice: null,
    badge: "new",
    emoji: "👩🏽‍🦱",
    image: null,
    color: "linear-gradient(135deg,#f0f0f0,#e8e8e8)",
    stock: 8,
    sold: 198,
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: "Straight Closure Wig · 18\"",
    category: "Closure Wigs",
    description: "4x4 Closure · Human Hair · Pre-Plucked",
    price: 2800,
    oldPrice: 4000,
    badge: "sale",
    emoji: "💁🏿‍♀️",
    image: null,
    color: "linear-gradient(135deg,#ffe0b2,#fff3e0)",
    stock: 0,
    sold: 445,
    rating: 4,
    featured: true
  },
  {
    id: 4,
    name: "Ombre Burgundy Wave",
    category: "Body Wave",
    description: "Synthetic · 22\" · Heat Resistant",
    price: 999,
    oldPrice: null,
    badge: "new",
    emoji: "💜",
    image: null,
    color: "linear-gradient(135deg,#ce93d8,#f3e5f5)",
    stock: 15,
    sold: 87,
    rating: 5,
    featured: true
  },
  {
    id: 5,
    name: "Honey Blonde Bob",
    category: "Bob Wigs",
    description: "Lace Front · 13x4 · 14\" Length",
    price: 2200,
    oldPrice: 3000,
    badge: "hot",
    emoji: "👱🏾‍♀️",
    image: null,
    color: "linear-gradient(135deg,#FFB3D1,#ffe4ec)",
    stock: 3,
    sold: 271,
    rating: 5,
    featured: true
  },
  {
    id: 6,
    name: "Deep Wave Headband Wig",
    category: "Headband Wigs",
    description: "No Glue Needed · Human Hair Blend · 20\"",
    price: 1800,
    oldPrice: 2500,
    badge: "sale",
    emoji: "🧖🏾‍♀️",
    image: null,
    color: "linear-gradient(135deg,#b2dfdb,#e0f2f1)",
    stock: 11,
    sold: 156,
    rating: 4,
    featured: true
  },
  {
    id: 7,
    name: "Braided Box Braid Wig",
    category: "Braided Wigs",
    description: "Synthetic · Medium Length · No Glue",
    price: 1500,
    oldPrice: null,
    badge: null,
    emoji: "🎋",
    image: null,
    color: "linear-gradient(135deg,#c8e6c9,#e8f5e9)",
    stock: 20,
    sold: 102,
    rating: 4,
    featured: false
  },
  {
    id: 8,
    name: "Silky Straight 24\"",
    category: "Human Hair",
    description: "100% Human Hair · Natural Black · Silky",
    price: 4500,
    oldPrice: 6000,
    badge: "premium",
    emoji: "💎",
    image: null,
    color: "linear-gradient(135deg,#fff9c4,#fffde7)",
    stock: 5,
    sold: 89,
    rating: 5,
    featured: false
  }
];

function initStore() {
  if (!localStorage.getItem('eucken_products')) {
    localStorage.setItem('eucken_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem('eucken_orders')) {
    localStorage.setItem('eucken_orders', JSON.stringify([]));
  }
}

function getProducts() {
  initStore();
  return JSON.parse(localStorage.getItem('eucken_products'));
}

function saveProducts(products) {
  localStorage.setItem('eucken_products', JSON.stringify(products));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('eucken_orders') || '[]');
}