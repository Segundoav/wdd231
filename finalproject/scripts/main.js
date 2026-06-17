import { initYear, initMenu } from './utils.js';

initYear();
initMenu();

// ===== FETCH FEATURED INSURANCES =====
async function loadFeatured() {
  try {
    const response = await fetch('data/insurances.json');
    const data = await response.json();

    // Get one card per category using filter + map
    const categories = ['Life', 'Vehicle', 'Health', 'SCTR'];
    
    const featured = categories.map(cat => 
      data.insurances.find(item => item.category === cat)
    );

    const container = document.querySelector('#featured-cards');

    container.innerHTML = featured.map(item => `
      <div class="card">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Coverage:</strong> ${item.coverage}</p>
        <p><strong>Starting at:</strong> S/. ${item.starting_price}</p>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error loading insurances:', error);
  }
}

loadFeatured();