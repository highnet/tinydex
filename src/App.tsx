import {useState, useEffect} from "react";
import {Pokemon} from "./Pokemon";
import TextField from "./TextField/TextField";
import Button from "./Button/Button";

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
			.Sprites(pokeAPIData.sprites)
			.Types(
				pokeAPIData.types.map((type: {type: {name: string}}) => type.type.name)
			);

		setPokemonId(pokeAPIData.id);
		setPokemon(pokemon);
	};

	useEffect(() => {
		fetchPokemon(pokemonId.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<h1>TinyDex</h1>

			<TextField
				configuration="filled"
				textConfiguration="label-placeholder"
				leadingIconName="search"
				trailingIcon={false}
				validRegex={
					"^$|^([1-9]|[1-9][0-9]{0,2}|1010)$|^(" + pokemonNames.join("|") + ")$"
				}
				placeholder="Bulbasaur"
				defaultValue={inputTerm}
				label="Number/Name"
				onChange={(e) => {
					setInputTerm((e.target as HTMLInputElement).value);
					fetchPokemon((e.target as HTMLInputElement).value);
				}}></TextField>

			<Button onClick={handlePreviousPokemon}>Previous</Button>
			<Button onClick={handleNextPokemon}>Next</Button>

			<div>
				<img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
				<h1>{pokemon.name}</h1>
				<h2>{pokemon.id}</h2>
				<h3>{pokemon.types.join(", ")}</h3>
			</div>
		</div>
	);
}
