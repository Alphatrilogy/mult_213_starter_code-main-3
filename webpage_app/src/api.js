// API function to integrate with Open-Meteo Geocoding and Weather APIs
// Reference: https://open-meteo.com/

export async function searchCardNames(card) {
  const res = await fetch(
    `https://api.scryfall.com/cards/autocomplete?q=${card}`
  );

  const data = await res.json();

  console.log(data);

  return data.data || [];
} 

export async function fetchWeather(lat, lon) {
  // Hardcode coordinates or use a simple free API.
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  const data = await res.json();

  console.log(data);

  return data.current_weather ?? "N/A";
}
