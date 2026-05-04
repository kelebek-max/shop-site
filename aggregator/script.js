document.addEventListener('DOMContentLoaded', () => {

  // Category Chips Filter
  const chips = document.querySelectorAll('.chip');
  const productCards = document.querySelectorAll('.product-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cat = chip.dataset.cat;
      productCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
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

  // Marketplace Tabs Filter
  const mpTabs = document.querySelectorAll('.mp-tab');

  mpTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mpTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mp = tab.dataset.mp;
      productCards.forEach(card => {
        if (mp === 'all' || card.dataset.mp === mp) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });

      // Reset category chips to "all"
      chips.forEach(c => c.classList.remove('active'));
      chips[0].classList.add('active');
    });
  });

  // View Toggle (Grid / List)
  const viewBtns = document.querySelectorAll('.view-btn');
  const productsGrid = document.getElementById('products-grid');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.view === 'list') {
        productsGrid.classList.add('list-view');
      } else {
        productsGrid.classList.remove('list-view');
      }
    });
  });

  // Bookmark Toggle
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      btn.classList.toggle('active');

      if (btn.classList.contains('active')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sort-select');

  sortSelect.addEventListener('change', () => {
    const cards = Array.from(productCards);
    const grid = document.getElementById('products-grid');
    const sortBy = sortSelect.value;

    cards.sort((a, b) => {
      const priceA = parseInt(a.querySelector('.price-current').textContent.replace(/\D/g, ''));
      const priceB = parseInt(b.querySelector('.price-current').textContent.replace(/\D/g, ''));
      const ratingA = parseFloat(a.querySelector('.rating-score').textContent);
      const ratingB = parseFloat(b.querySelector('.rating-score').textContent);
      const reviewsA = parseInt(a.querySelector('.rating-count').textContent.replace(/\D/g, ''));
      const reviewsB = parseInt(b.querySelector('.rating-count').textContent.replace(/\D/g, ''));

      switch (sortBy) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'rating': return ratingB - ratingA;
        case 'reviews': return reviewsB - reviewsA;
        case 'discount':
          const discountA = a.querySelector('.discount-tag');
          const discountB = b.querySelector('.discount-tag');
          const dA = discountA ? parseInt(discountA.textContent.replace(/\D/g, '')) : 0;
          const dB = discountB ? parseInt(discountB.textContent.replace(/\D/g, '')) : 0;
          return dB - dA;
        default: return 0;
      }
    });

    cards.forEach((card, i) => {
      card.style.order = i;
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = '';
    });

    cards.forEach(card => grid.appendChild(card));
  });

  // Load More (simulated)
  const loadMoreBtn = document.getElementById('load-more-btn');
  let loaded = false;

  loadMoreBtn.addEventListener('click', () => {
    if (!loaded) {
      loadMoreBtn.textContent = 'Все товары загружены';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
      loaded = true;
    }
  });

});
