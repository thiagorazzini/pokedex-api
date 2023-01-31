const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromisses = () => Array(150).fill().map((_,index) => 
  fetch(getPokemonUrl((index + 1))).then(response => response.json()));

const generateHtml = pokemons => pokemons.reduce((accumulator, {name, id, types})=>{
    const elementeTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator +=
      `<div class="card ${elementeTypes[0]}">
      <img class="card-image " alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
      <h1 class="card-title">${id}. ${name}</h1>
      <h3 class="card-subtitle">${elementeTypes.join(' | ')}</h3>
      </div>`
    return accumulator;
  },'')


const insertPokemonsIntoPage = pokemons =>{
  const divEl = document.querySelector('[data-js="pokedex"]');

  divEl.innerHTML = pokemons;
}


const pokemonPromisses = generatePokemonPromisses(); //array de promessas da api
Promise.all(pokemonPromisses)
  .then(generateHtml)
  .then(insertPokemonsIntoPage)


