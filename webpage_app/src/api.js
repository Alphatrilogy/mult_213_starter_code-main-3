

export async function randomCard() {
  const res = await fetch(
    "https://api.scryfall.com/cards/random"
  );

  const data = await res.json();

  console.log(data);

  return data;
} 

export async function searchCards(search) {
  const res = await fetch(
    `https://api.scryfall.com/cards/search?q=${search}`
  );

  const data = await res.json();

  console.log(data);

 return data.data || [];
}
