import {useState, useEffect} from "react";
import {Pokemon} from "./Pokemon";

export default function App() {
	const [inputTerm, setInputTerm] = useState("");
	const [pokemon, setPokemon] = useState(new Pokemon());
	const [pokemonId, setPokemonId] = useState(1);
	const [pokemonNames, setPokemonNames] = useState<string[]>([]);

	useEffect(() => {
		const fetchPokemonNames = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=1118"
			);
			const data = await response.json();
			const names = data.results.map((result: {name: string}) => result.name);
			setPokemonNames(names);
		};
		fetchPokemonNames();
	}, []);

	const fetchPokemon = async (pokemonNameOrIdPartialSearchTerm: string) => {
		if (pokemonNameOrIdPartialSearchTerm === "") return;

		const pokemonMatchingName = pokemonNames.find((name) =>
			name
				.toLowerCase()
				.startsWith(pokemonNameOrIdPartialSearchTerm.toLowerCase())
		);
		if (pokemonMatchingName) {
			pokemonNameOrIdPartialSearchTerm = pokemonMatchingName;
		}

		const pokeAPIResponse = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrIdPartialSearchTerm}`
		);
		const pokeAPIData = await pokeAPIResponse.json();

		const pokemon = new Pokemon()
			.Id(pokeAPIData.id)
			.Name(pokeAPIData.name)
			.Height(pokeAPIData.height)
			.Weight(pokeAPIData.weight)
			.Sprites(pokeAPIData.sprites);

		setPokemonId(pokeAPIData.id);
		setPokemon(pokemon);
	};

	useEffect(() => {
		fetchPokemon(pokemonId.toString());
	}, [pokemonId]);

	const handleNextPokemon = () => {
		if (pokemonId === 1010) {
			setPokemonId(1);
		} else {
			setPokemonId(pokemonId + 1);
		}
	};

	const handlePreviousPokemon = () => {
		if (pokemonId === 1) {
			setPokemonId(1010);
		} else {
			setPokemonId(pokemonId - 1);
		}
	};

	return (
		<div className="App">
			<h1>Pokedex</h1>

			<input
				type="text"
				placeholder="Search for a Pokemon by name"
				value={inputTerm}
				onChange={(e) => {
					setInputTerm(e.target.value);
					fetchPokemon(e.target.value);
				}}
			/>
			<button onClick={handlePreviousPokemon}>Previous</button>
			<button onClick={handleNextPokemon}>Next</button>

			<div>
				<img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
				<h2>{pokemon.name}</h2>
				<h1>{pokemon.id}</h1>
			</div>
		</div>
	);
}
