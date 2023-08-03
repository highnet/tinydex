import {useEffect, useState} from "react";
import {Pokemon} from "./Pokemon";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [pokemonMap, setPokemonMap] = useState<Map<string, Pokemon>>(new Map());
	const [inputTerm, setInputTerm] = useState("bulbasaur");
	const [currentPokemonId, setCurrentPokemonId] = useState("1");

	const fetchPokemon = async () => {
		if (pokemonMap.has(inputTerm)) {
			console.log("Pokemon already in map");
			setPokemonMap(pokemonMap);
			setSearchTerm(inputTerm);
			return;
		}

		console.log("Fetching Pokemon");
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${inputTerm}`
		);
		const data = await response.json();
		const newPokemonMap = new Map(pokemonMap);
		newPokemonMap.set(
			inputTerm,
			new Pokemon()
				.Height(data.height)
				.Id(data.id)
				.Name(data.name)
				.Weight(data.weight)
				.Sprites(data.sprites)
		);
		setCurrentPokemonId(data.id);
		setPokemonMap(newPokemonMap);
		setSearchTerm(inputTerm);
	};

	useEffect(() => {
		fetchPokemon();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<h1>Pokedex</h1>
			<input
				type="text"
				placeholder="Search for a Pokemon"
				value={inputTerm}
				onChange={(e) => setInputTerm(e.target.value)}
			/>
			<button onClick={fetchPokemon}>Search</button>
			<ul>
				{currentPokemonId && (
					<li key={pokemonMap.get(searchTerm)?.id}>
						<img
							src={pokemonMap.get(searchTerm)?.sprites.front_default}
							alt={pokemonMap.get(searchTerm)?.name}
						/>
						<h2>{pokemonMap.get(searchTerm)?.name}</h2>
						<p>Height: {pokemonMap.get(searchTerm)?.height}</p>
						<p>Weight: {pokemonMap.get(searchTerm)?.weight}</p>
						<p>Id: {pokemonMap.get(searchTerm)?.id}</p>
					</li>
				)}
			</ul>
		</div>
	);
}
