const API_URL = 'https://gift-finder-api.onrender.com/loved-ones';
const form = document.getElementById('edit-form');

// Extract ID from URL
const urlParams = new URLSearchParams(window.location.search);
const lovedOneId = urlParams.get('id');

// Fetch and prefill form
async function loadLovedOne() {
  try {
    const response = await fetch(`${API_URL}/${lovedOneId}`);
    const result = await response.json();

    if (result.success && result.data) {
      fillForm(result.data);
    } else {
      console.error('Invalid response:', result);
    }
  } catch (error) {
    console.error('Error fetching loved one:', error);
  }
}

function fillForm(data) {
  form.name.value = data.name || '';
  form.birthday.value = data.birthday || '';
  form.gender.value = data.gender || '';
  form.relationship.value = data.relationship || '';
  form.occupation.value = data.occupation || '';
  form.interests.value = data.interests || '';
  form.country.value = data.country || '';
  form.milestone.value = data.milestone || '';
}

// Submit updated data
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const updatedData = {
    name: formData.get('name'),
    birthday: formData.get('birthday'),
    gender: formData.get('gender'),
    relationship: formData.get('relationship'),
    occupation: formData.get('occupation'),
    interests: formData.get('interests'),
    country: formData.get('country'),
    milestone: formData.get('milestone')
  };

  try {
    const response = await fetch(`${API_URL}/${lovedOneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Loved one updated successfully!');
    } else {
      alert('Failed to update. Please try again.');
    }
  } catch (error) {
    console.error('Error updating loved one:', error);
    alert('An error occurred while saving changes.');
  }
});

// 🎁 Handle "Find a Gift"
document.getElementById("findGiftBtn").addEventListener("click", () => {
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    birthday: formData.get("birthday"),
    gender: formData.get("gender"),
    relationship: formData.get("relationship"),
    occupation: formData.get("occupation"),
    interests: formData.get("interests"),
    country: formData.get("country"),
    milestone: formData.get("milestone")
  };

  localStorage.setItem("giftFinderData", JSON.stringify(data));
  window.location.href = "loading.html";
});

// 🚀 Load if ID is present
if (lovedOneId) {
  loadLovedOne();
} else {
  alert('Missing loved one ID in URL.');
}
