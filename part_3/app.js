const pokeAPIBaseURL = "https://pokeapi.co/api/v2/pokemon?limit=1000";

$(document).ready(function() {
  $("#get-pokemon-btn").on("click", async function() {
    $("#pokemon-container").empty(); // Clear previous results

    try {
      const response = await fetch(pokeAPIBaseURL);
      const data = await response.json();
      const pokemonList = data.results;

      // Pick three random Pokémon
      const randomPokemon = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        randomPokemon.push(pokemonList[randomIndex]);
      }

      // Fetch data for the selected Pokémon
      const promises = randomPokemon.map(pokemon => fetch(pokemon.url));
      const responses = await Promise.all(promises);
      const pokemonData = await Promise.all(responses.map(response => response.json()));

      // Fetch and display species info for each Pokémon
      for (const pokemon of pokemonData) {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        const flavorTextEntry = speciesData.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        const description = flavorTextEntry ? flavorTextEntry.flavor_text : "No description available";

        const pokemonCard = `
          <div class="pokemon-card">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>${description}</p>
          </div>
        `;
        $("#pokemon-container").append(pokemonCard);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  });
});
