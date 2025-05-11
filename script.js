document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("gift-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const birthday = new Date(data.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    // 1. Show user inputs
    const output = document.getElementById("output");
    output.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Birthday:</strong> ${data.birthday} (${age} years old)</p>
      <p><strong>Relationship:</strong> ${data.relationship}</p>
      <p><strong>Occupation:</strong> ${data.occupation}</p>
      <p><strong>Interests:</strong> ${data.interests}</p>
      ${data.milestone ? `<p><strong>Recent Milestone:</strong> ${data.milestone}</p>` : ""}
      <p><strong>Country:</strong> ${data.country}</p>
    `;

    // 2. Fill in the name in the gift suggestion message
    document.getElementById("gift-name").textContent = data.name;
    document.getElementById("gift-name-repeat").textContent = data.name;

    // 3. Set placeholder Amazon links (adjust later with AI)
    const baseUrl = data.country.toLowerCase().includes("singapore")
      ? "https://www.amazon.sg/s?k="
      : "https://www.amazon.com/s?k=";

    const query = encodeURIComponent(data.interests.split(",")[0].trim() || "gift");

    document.getElementById("gift-25").href = `${baseUrl}${query}+under+25`;
    document.getElementById("gift-50").href = `${baseUrl}${query}+under+50`;
    document.getElementById("gift-500").href = `${baseUrl}${query}+gift+up+to+500`;

    // 4. Show result section
    document.getElementById("result").classList.remove("hidden");
    e.target.reset();
  });
});
