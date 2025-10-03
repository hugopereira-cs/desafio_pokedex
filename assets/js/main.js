const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 5
let offset = 0;



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        
                    </ol>

                    <img src="${
                        pokemon.photo
                    }" alt="${pokemon.name}">
                </div>
            </li>
    `).join('') // mapeia a lista de pokemons para li, e junta todos esses 'li's sem separador
        pokemonList.innerHTML += newHtml // Atualiza o conteúdo HTML do elemento, preservando o conteúdo existente e adicionando novos pokemons
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton) // pega o elemento pai do botão e remove seu filho (o botão)
    } else {
        loadPokemonItens(offset, limit)
    }
})
