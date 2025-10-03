const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

// Realiza uma requisição HTTP para obter informações detalhadas de um Pokémon, no fim, converte a response para json
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon) 
};

// função que abstrai o cunsumo do http e nos entrega o result já pronto
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return (
        fetch(url)
            // Ao fetch podemos passar o url ou ainda, a requisição
            .then((response) => response.json()) // transforma o Body recebido em json
            .then((jsonBody) => jsonBody.results) // pega o resultado, que é o que nos interessa, na lista que está dentro do json
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Transforma a lista de requisições em uma com os detalhes dos pokemons
            .then((detailRequests) => Promise.all(detailRequests)) // espera que a lista de promessas seja resolvida
            .then((PokemonsDetails) => PokemonsDetails)
    );
};
