const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function getTypeClass(types) {
  return types.map(type => type.toLowerCase()).join(' ');
}

function convertPokemonToLi(pokemon) {
    let typeClass = getTypeClass(pokemon.types);
  
    return `
        <li class="pokemon ${typeClass}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
  
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
  
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
      loadPokemonItems(offset, limit);
  }
});
