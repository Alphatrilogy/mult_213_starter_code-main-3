import { renderMessage } from "./dom.js";
import { autocomplete, searchCards } from "./api.js";

// Grab references to various parts of the HTML page
const searchForm = document.querySelector("#card-search-form");
const searchImput = document.querySelector("#searchImput");
const results = document.querySelector("#results");
const deckList = document.querySelector("#deck-list");
const clear = document.querySelector("#clear");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

const name = searchImput.value.trim();
  if (!name) return;

  renderMessage(results, "Loading…");

  try {
    const cards = await searchCards(name);
    if (!cards || cards.length === 0) {
renderMessage(results, `No results found for "${name}".`);
        return;
    }
    let message = `<p>Found ${cards.length} result(s):</p><ul>`;
    cards.forEach(card => {
      message += `<li>${card.name}</li>`;
    });
    message += "</ul>";

    renderMessage(results, message);
  } catch (err) {
    renderMessage(results, `Error: ${err.message}`);
  }
});
let deck = [];
clear.addEventListener("click", () => {
  deck = [];
});

