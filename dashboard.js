const API_URL = 'https://gift-finder-api.onrender.com/loved-ones';
let lovedOnes = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      lovedOnes = result.data;
      sortBy('birthday'); // default sort by upcoming birthday
    } else {
      console.error('Unexpected API response format:', result);
    }
  } catch (error) {
    console.error('Error fetching loved ones:', error);
  }
});

function sortBy(criteria) {
  lovedOnes.sort((a, b) => {
    if (criteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (criteria === 'birthday') {
      return daysUntilNextBirthday(a.birthday) - daysUntilNextBirthday(b.birthday);
    }
  });

  document.getElementById('sortNameBtn').classList.toggle('active', criteria === 'name');
  document.getElementById('sortBirthdayBtn').classList.toggle('active', criteria === 'birthday');

  renderCards();
}

function renderCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  lovedOnes.forEach(person => {
    const card = document.createElement('div');
    card.className = 'gift-choice';
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <h3 style="margin-bottom: 0.25rem;">${person.name}</h3>
      <p class="birthday" style="font-size: 0.85rem; color: #8b5e3c;">
        ${formatDate(person.birthday)}<br>
        <span style="font-size: 0.8rem; color: #a2765e;">🎉 In ${daysUntilNextBirthday(person.birthday)} days</span>
      </p>
    `;

    card.addEventListener('click', () => {
      window.location.href = `prefilled-data.html?id=${person.id}`;
    });

    container.appendChild(card);
  });
}

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function daysUntilNextBirthday(birthdayStr) {
  const today = new Date();
  const birthday = new Date(birthdayStr);
  birthday.setFullYear(today.getFullYear());

  // If birthday already passed this year, move to next year
  if (
    birthday.getMonth() < today.getMonth() ||
    (birthday.getMonth() === today.getMonth() && birthday.getDate() < today.getDate())
  ) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = birthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
