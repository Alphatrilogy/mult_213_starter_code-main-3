import { searchCards, randomCard } from "./api.js";

// Grab references to various parts of the HTML page
const searchForm = document.querySelector("#card-search-form");
const searchImput = document.querySelector("#searchImput");
const results = document.querySelector("#results");
const deckList = document.querySelector("#deck-list");
const clear = document.querySelector("#clear");
const randomBtn = document.querySelector("#randomCard");
const randomOutput = document.querySelector("#randomCardOutput");
let deck = [];

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = searchImput.value.trim();
  if (!name) return;

  results.innerHTML = "<p>Searching for cards...</p>";

  try {
    const cards = await searchCards(name);
    if (!cards || cards.length === 0) {
      results.innerHTML = `<p>No results found for "${name}".</p>`;
      return;
    }

    let message = `<p>Found ${cards.length} result(s):</p><ul>`;
    cards.forEach((card, index) => {
      message += `<li>${card.name} 
        <button class="add-btn" data-index="${index}">Add to Deck</button>
      </li>`;
    });
    message += "</ul>";

    results.innerHTML = message;
    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        addCardToDeck(cards[i]);
      });
    });

  } catch (err) {
    results.innerHTML = `<p>Error: ${err.message}</p>`;
  }
});
function addCardToDeck(card) {
  deck.push(card);

  const li = document.createElement("li");
  li.textContent = card.name;
  deckList.appendChild(li);
}
clear.addEventListener("click", () => {
  deck = [];
  deckList.innerHTML = "";
});
randomBtn.addEventListener("click", async () => {
  randomOutput.innerHTML = "<p>Fetching random card...</p>";
  try {
    const card = await randomCard();

    randomOutput.innerHTML = `
      <h3>${card.name}</h3>
      <img src="${card.image_uris?.normal}" alt="${card.name}">
    `;
  } catch (err) {
    randomOutput.innerHTML = `<p>Error loading card: ${err.message}</p>`;
  }
});