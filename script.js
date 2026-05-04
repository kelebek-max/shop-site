document.addEventListener('DOMContentLoaded', () => {

  // Cart Sidebar Toggle
  const cartToggle = document.getElementById('cart-toggle');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });

  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Product Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Add to Cart Animation
  const cartBtns = document.querySelectorAll('.btn-cart');
  const cartCount = document.getElementById('cart-count');
  let count = 2;

  cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      count++;
      cartCount.textContent = count;

      btn.textContent = 'Добавлено!';
      btn.style.background = '#10b981';

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> В корзину';
        btn.style.background = '';
      }, 1500);

      cartCount.style.transform = 'scale(1.4)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 300);
    });
  });

  // Favorite Toggle
  const favBtns = document.querySelectorAll('.product-action-btn');
  favBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon && icon.classList.contains('fa-heart')) {
      btn.addEventListener('click', () => {
        if (icon.classList.contains('fa-regular')) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
          icon.style.color = '#f472b6';
        } else {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
          icon.style.color = '';
        }
      });
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
