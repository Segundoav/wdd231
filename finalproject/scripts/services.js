import { initYear, initMenu } from './utils.js';

initYear();
initMenu();

// ===== MODAL =====
const modal = document.querySelector('#insurance-modal');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modal.close();
});

// ===== SHOW MODAL WITH INSURANCE DETAILS =====
function showModal(item) {
  document.querySelector('#modal-name').textContent = item.name;
  document.querySelector('#modal-category').textContent = `Category: ${item.category}`;
  document.querySelector('#modal-description').textContent = item.description;
  document.querySelector('#modal-coverage').textContent = `Coverage: ${item.coverage}`;
  document.querySelector('#modal-price').textContent = `Starting at: S/. ${item.starting_price}`;
  modal.showModal();
}

// ===== RENDER CARDS =====
function renderCards(insurances) {
  const container = document.querySelector('#insurance-cards');

  container.innerHTML = insurances.map(item => `
    <div class="card" data-id="${item.id}">
      <img src="images/${item.image}" alt="${item.name}" width="400" height="250" loading="lazy" />
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Coverage:</strong> ${item.coverage}</p>
      <p><strong>Starting at:</strong> S/. ${item.starting_price}</p>
      <button class="details-btn" data-id="${item.id}">View Details</button>
    </div>
  `).join('');

  // Add click event to each button
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = insurances.find(i => i.id === id);
      showModal(item);
    });
  });
}

// ===== FETCH + FILTER =====
async function loadInsurances() {
  try {
    const response = await fetch('data/insurances.json');
    const data = await response.json();
    const allInsurances = data.insurances;

    // Load saved category from localStorage
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';

    // Render all cards first
    renderCards(allInsurances);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => 
          b.classList.remove('active')
        );
        btn.classList.add('active');

        const category = btn.dataset.category;

        // Save to localStorage
        localStorage.setItem('selectedCategory', category);

        // Filter insurances
        const filtered = category === 'all' 
          ? allInsurances 
          : allInsurances.filter(item => item.category === category);

        renderCards(filtered);
      });
    });

  } catch (error) {
    console.error('Error loading insurances:', error);
  }
}

loadInsurances();