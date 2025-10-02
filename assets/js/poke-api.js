


const pokeApi = {};

// função que abstrai o cunsumo do http e nos entrega o result já pronto
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        // Ao fetch podemos passar o url ou ainda, a requisição
        .then((response) => response.json()) // transforma o Body recebido em json
        .then((jsonBody) => jsonBody.results) // print o Body convertido
        .catch((error) => console.error(error))
};
