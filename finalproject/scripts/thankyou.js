import { initYear, initMenu } from './utils.js';

initYear();
initMenu();

// ===== READ URL PARAMETERS =====
const params = new URLSearchParams(window.location.search);

const name = params.get('name');
const email = params.get('email');
const phone = params.get('phone');
const insuranceType = params.get('insurance_type');
const message = params.get('message');

// ===== SHOW FORM SUMMARY =====
const summary = document.querySelector('#form-summary');

summary.innerHTML = `
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
  <p><strong>Insurance Type:</strong> ${insuranceType}</p>
  <p><strong>Message:</strong> ${message || 'No message provided'}</p>
`;

// ===== SAVE TO LOCALSTORAGE =====
localStorage.setItem('lastContact', JSON.stringify({
  name,
  email,
  insuranceType,
  date: new Date().toLocaleDateString()
}));