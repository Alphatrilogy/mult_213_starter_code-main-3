import { renderMessage } from "./dom.js";
import { autocomplete, searchCards } from "./api.js";

// Grab references to various parts of the HTML page
const searchForm = document.querySelector("#card-search-form");
const searchImput = document.querySelector("#search-imput");
const results = document.querySelector("#results");
const deckList = document.querySelector("#wdeck-list");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = "#searchImput".value.trim();
  if (!name) return;

  renderMessage(results, "Loading…");

  try {
    const cards = await searchcards(name);
    if (!name || cards.length === 0) {
        renderMessage(`No results found for "${name}".`);
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

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const latStr = document.querySelector("#lat").value.trim();
    const lonStr = document.querySelector("#lon").value.trim();

    if (!latStr || !lonStr) {
        renderMessage(weatherOutput, "Please provide both latitude and longitude.");
        return;
    }

    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
        renderMessage(weatherOutput, "Latitude and longitude must be valid numbers.");
        return;
    }

    renderMessage(weatherOutput, "Loading Weather Data…");

    try {
        const weather = await fetchWeather(lat, lon);
        renderMessage(weatherOutput, `<pre>${JSON.stringify(weather, null, 2)}</pre>`);
    } catch (err) {
        renderMessage(weatherOutput, `Error: ${err.message}`);
    }
});
