import "./App.css";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChoosen, setPokemonChoosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChoosen(true);
      }
    );
  };
  return (
    <>
      <div className="App">
        <div className="TitleSection">
          <h1>Pokemon States</h1>
          <input
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
          />
          <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
        <div className="DisplaySection">
          {!pokemonChoosen ? (
            <h2> Please choose a Pokemon </h2>
          ) : (
            <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}/>
            <h3>Species : {pokemon.species}</h3>
            <h3>type : {pokemon.type}</h3>
            <h4>Hp : {pokemon.hp}</h4>
            <h4>Attack : {pokemon.attack}</h4>
            <h4>Defense : {pokemon.defense}</h4>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
