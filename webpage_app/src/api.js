

export async function autocomplete(card) {
  const res = await fetch(
    `https://api.scryfall.com/cards/autocomplete?q=${card}`
  );

  const data = await res.json();

  console.log(data);

  return data.data || [];
} 

export async function searchCards(search) {
  // Hardcode coordinates or use a simple free API.
  const res = await fetch(
    `https://api.scryfall.com/cards/search?q=${search}`
  );

  const data = await res.json();

  console.log(data);

 return data.data || [];
}
