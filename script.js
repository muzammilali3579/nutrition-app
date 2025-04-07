const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options"),
  body = document.body;
  const categoryInstructions = {
    "Very Healthy": `
      <h2 style=color:black;>🟢 Very Healthy (Score: 85–110)</h2><br>
      <p><strong>"Keep it up!"</strong></p><br>
      <p>You’re making great choices! These foods are packed with nutrients your body loves. Keep including them in your daily meals, and don’t forget to enjoy a variety of fruits, veggies, whole grains, and proteins. Just balance it all out and stay active.</p>
      <br><h3>🟩 Instructions:</h3>
      <ul>
        <li>✅ Maintain regular consumption of such foods.</li>
        <li>🍽 Combine with lean proteins, whole grains, and healthy fats.</li>
        <li>🥗 Excellent for balanced meals or meal prepping.</li>
        <li>💧 Stay hydrated and keep physical activity consistent.</li>
        <li>🕒 Ideal for all ages and meal times.</li>
      </ul>
    `,
    "Healthy": `
      <h2 style=color:black;>🟡 Healthy (Score: 60–84)</h2>
      <p><strong>"Almost there!"</strong></p>
      <p>These foods are pretty solid. A few small tweaks—like reducing added salt or sugar—can make them even better. Try pairing them with something high in fiber or low in fat for a more balanced plate. You're on the right track!</p>
      <h3>🟨 Instructions:</h3>
      <ul>
        <li>➕ Can be part of a balanced diet with minor adjustments.</li>
        <li>🧂 Monitor for moderate sugar/sodium — reduce added salt or sauces.</li>
        <li>🥄 Add more Fiber (vegetables, seeds) if low.</li>
        <li>🍳 Pair with healthy sides (e.g., salad, yogurt, sprouts).</li>
      </ul>
    `,
    "Moderate": `
      <h2 style=color:black;>🟠 Moderate (Score: 40–59)</h2><br>
      <p><strong>"Okay in moderation."</strong></p><br>
      <p>These aren’t the worst, but they shouldn’t be your everyday go-to. Maybe save them for a treat or tweak the recipe to be lighter. Add some veggies or choose smaller portions—little changes can go a long way.</p>
      <br><h3>🟧 Instructions:</h3>
      <ul>
        <li>⚠ Limit intake to occasional meals.</li>
        <li>❌ Watch for added sugars, fats, or processed ingredients.</li>
        <li>🥦 Add more Fiber-rich foods like vegetables or legumes.</li>
        <li>💡 Use healthier cooking methods (grill/steam instead of fry).</li>
        <li>🧂 Reduce oil, ghee, and salty condiments.</li>
      </ul>
    `,
    "Unhealthy": `
      <h2 style=color:black;>🔴 Unhealthy (Score: <40)</h2>
      <p><strong>"Limit these."</strong></p>
      <p>These foods are best enjoyed occasionally. They're likely high in sugar, salt, or unhealthy fats and low in nutrients. Try to swap them with healthier alternatives or enjoy them in small amounts. Your body will thank you.</p>
      <h3>🟥 Instructions:</h3>
      <ul>
        <li>⛔ Avoid frequent consumption.</li>
        <li>🍬 Typically high in sugar, sodium, or low in nutrients.</li>
        <li>🍟 Replace or modify recipes to reduce unhealthy fats and salt.</li>
        <li>🍏 Balance with fruits, raw salads, and healthy hydration.</li>
        <li>🧠 Be mindful of portion size and frequency.</li>
      </ul>
    `
  };
  
let dishData = [];

fetch("dataset.json")
  .then((response) => response.json())
  .then((data) => {
    dishData = data;
    addOptions();
  });

function getBgColor(category) {
  switch (category.toLowerCase()) {
    case "very healthy": return "#2ecc71";
    case "healthy": return "#f1c40f";
    case "moderate": return "#e67e22";
    case "unhealthy": return "#e74c3c";
    default: return "#4285f4";
  }
}

function addOptions(selectedDishName = "") {
  options.innerHTML = "";
  dishData.forEach(dish => {
    let isSelected = dish["Dish Name"] === selectedDishName ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}" data-category="${dish.Category}" data-score="${dish["Healthiness Score"]}">
                ${dish["Dish Name"]}
              </li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

window.updateName = function (selectedLi) {
    searchInp.value = "";
    addOptions(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
  
    const category = selectedLi.getAttribute("data-category");
    const score = selectedLi.getAttribute("data-score");
  
    // Change background and update info
    body.style.backgroundColor = getBgColor(category);
    document.getElementById("dish-info").innerHTML = `
      <div><strong>Category:</strong> ${category}</div>
      <div><strong>Healthiness Score:</strong> ${score}</div>
    `;
  
    // 👉 Step 3: Show full instruction paragraph + tips
    document.getElementById("info").innerHTML = categoryInstructions[category] || "";
  };
  
  
searchInp.addEventListener("keyup", () => {
  let searchWord = searchInp.value.toLowerCase();
  let filtered = dishData.filter(d =>
    d["Dish Name"].toLowerCase().includes(searchWord)
  );

  options.innerHTML = filtered.map(dish => {
    let isSelected = dish["Dish Name"] === selectBtn.firstElementChild.innerText ? "selected" : "";
    return `<li onclick="updateName(this)" class="${isSelected}" data-category="${dish.Category}" data-score="${dish["Healthiness Score"]}">
              ${dish["Dish Name"]}
            </li>`;
  }).join("") || `<p style="margin-top: 10px;">Oops! Dish not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
