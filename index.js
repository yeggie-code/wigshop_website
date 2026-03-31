// ===== SHARED DATA STORE =====
// Products and orders are stored on localStorage and sessionStorage
// to persist data and sync across tabs/sessions

function getProducts() {
  const stored = localStorage.getItem('eucken_products');
  if (stored) {
    return JSON.parse(stored);
  }
  // Default products
  const defaults = [
    { id:1, name:"Silky Straight Lace Front",   price:4500, image:null, emoji:"👱‍♀️", category:"lace",      stock:5, desc:"Natural-looking 13×4 lace front, heat resistant up to 180°C. Pre-plucked hairline." },
    { id:2, name:"Body Wave Full Lace",          price:6800, image:null, emoji:"💁‍♀️", category:"lace",      stock:3, desc:"Gorgeous body wave, 150% density, pre-plucked hairline. Silky & bouncy." },
    { id:3, name:"Deep Wave 360 Lace",           price:7200, image:null, emoji:"🌊",   category:"lace",      stock:4, desc:"360 lace wig with deep wave texture. Perfect for any occasion." },
    { id:4, name:"Kinky Curly Afro",             price:3200, image:null, emoji:"🙋‍♀️", category:"synthetic", stock:8, desc:"Full and voluminous kinky curly style. Heat friendly synthetic fibre." },
    { id:5, name:"Sleek Bob Synthetic",          price:2500, image:null, emoji:"💆‍♀️", category:"synthetic", stock:6, desc:"Chic chin-length bob. Ready to wear, zero styling needed. Very lightweight." },
    { id:6, name:"Long Straight Synthetic",      price:2800, image:null, emoji:"👩",   category:"synthetic", stock:7, desc:"Ultra-smooth long straight wig in natural black. Easy to maintain." },
    { id:7, name:"Knotless Box Braids",          price:3800, image:null, emoji:"👩‍🦱", category:"braided",   stock:4, desc:"Long knotless braids with a natural root, very lightweight and comfortable." },
    { id:8, name:"Fulani Tribal Braids",         price:4200, image:null, emoji:"🧕",   category:"braided",   stock:2, desc:"Authentic Fulani-inspired braided wig with beads accent. Statement look." },
    { id:9, name:"Cornrow Braid Wig",            price:3500, image:null, emoji:"💃",   category:"braided",   stock:5, desc:"Neat cornrow pattern wig, protective style, no heat needed." },
    { id:10, name:"Brazilian Bundle 3-Piece",    price:9500, image:null, emoji:"✨",   category:"bundle",    stock:7, desc:"Virgin Brazilian hair, 10\"+12\"+14\", silky smooth texture. Can be dyed." },
    { id:11, name:"Peruvian Wave Bundle",        price:8200, image:null, emoji:"🌺",   category:"bundle",    stock:3, desc:"Peruvian loose wave bundles, can be dyed, bleached & curled. 3 pieces." },
    { id:12, name:"Malaysian Straight Bundle",   price:7800, image:null, emoji:"💎",   category:"bundle",    stock:6, desc:"Pure Malaysian straight hair bundle set. Naturally lustrous & tangle-free." },
  ];
  localStorage.setItem('eucken_products', JSON.stringify(defaults));
  return defaults;
}

function saveProducts(products) {
  localStorage.setItem('eucken_products', JSON.stringify(products));
}

function getOrders() {
  const stored = localStorage.getItem('eucken_orders');
  return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
  localStorage.setItem('eucken_orders', JSON.stringify(orders));
}

// ===== CART (client pages only) =====
let cart = [];

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
  renderCart();
}

function addToCart(id) {
  const products = getProducts();
  const p = products.find(p => p.id === id);
  if (!p || p.stock === 0) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    if (existing.qty >= p.stock) { alert('No more stock available!'); return; }
    existing.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  updateCartUI();
  // Briefly open cart
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  const p = getProducts().find(p => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  if (p && item.qty > p.stock) item.qty = p.stock;
  updateCartUI();
}

function calcDelivery() {
  const fee = parseInt(document.getElementById('deliveryArea')?.value) || 0;
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = sub + fee;
  const fmt = n => 'KSh ' + n.toLocaleString();
  document.getElementById('subtotal') && (document.getElementById('subtotal').textContent = fmt(sub));
  document.getElementById('deliveryFee') && (document.getElementById('deliveryFee').textContent = fmt(fee));
  document.getElementById('totalAmount') && (document.getElementById('totalAmount').textContent = fmt(total));
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart"><span>🛒</span>Your cart is empty.<br>Go explore the collection!</div>';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = 'block';

  function isUrl(s) { return s && typeof s === 'string' && (s.startsWith('http') || s.startsWith('/') || s.startsWith('data:') || s.startsWith('blob:')); }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image && isUrl(item.image)
          ? `<img src="${item.image}" alt="${item.name}">`
          : (isUrl(item.emoji) ? `<img src="${item.emoji}" alt="${item.name}">` : item.emoji)}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">KSh ${(item.price * item.qty).toLocaleString()}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
  calcDelivery();
}

function renderProducts(filter, limit = null) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const products = getProducts();
  function isUrl(s) { return s && typeof s === 'string' && (s.startsWith('http') || s.startsWith('/') || s.startsWith('data:') || s.startsWith('blob:')); }
  function catLabel(c) {
    return { lace: 'Lace Front', synthetic: 'Synthetic', braided: 'Braided', bundle: 'Bundle' }[c] || c;
  }

  const f = filter || window._currentFilter || 'all';
  window._currentFilter = f;
  let list = f === 'all' ? products : products.filter(p => p.category === f);
  if (limit) list = list.slice(0, limit);

  grid.innerHTML = list.map(p => `
    <div class="product-card ${p.stock === 0 ? 'out-of-stock' : ''}">
      <div class="product-img">
        ${p.image && isUrl(p.image) ? `<img src="${p.image}" alt="${p.name}">` : (isUrl(p.emoji) ? `<img src="${p.emoji}" alt="${p.name}">` : p.emoji)}
      </div>
      <div class="product-info">
        <span class="cat-pill ${p.stock === 0 ? 'out-pill' : ''}">${p.stock === 0 ? 'Out of Stock' : catLabel(p.category)}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div>
            <div class="product-price">KSh ${p.price.toLocaleString()} <span>KES</span></div>
            <div class="stock-badge">
              <span class="stock-dot ${p.stock === 0 ? 'out' : p.stock <= 3 ? 'low' : ''}"></span>
              ${p.stock === 0 ? 'Out of stock' : p.stock <= 3 ? `Only ${p.stock} left` : `${p.stock} in stock`}
            </div>
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
            ${p.stock === 0 ? 'Sold Out' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  window._currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  renderProducts(cat);
}

// Init render on page load (for shop page)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productGrid')) renderProducts('all');
});