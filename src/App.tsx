import {useEffect, useState} from "react";
import {Pokemon} from "./Pokemon";

export default function App() {
	const [pokemonMap, setPokemonMap] = useState<Map<string, Pokemon>>(new Map());
	const [searchTerm, setSearchTerm] = useState("");
	const [inputTerm, setInputTerm] = useState(1);
	const [currentPokemonId, setCurrentPokemonId] = useState("1");
	const [nameSearchTerm, setNameSearchTerm] = useState("");

	const fetchPokemon = async (searchTerm: string) => {
		if (pokemonMap.has(searchTerm)) {
			console.log("Pokemon already in map");
			setPokemonMap(pokemonMap);
			setSearchTerm(searchTerm);
			return;
		}

		console.log("Fetching Pokemon");
		let response;
		if (isNaN(parseInt(searchTerm))) {
			// Search by name
			const speciesResponse = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${searchTerm}`
			);
			const speciesData = await speciesResponse.json();
			const id = speciesData.id;
			response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		} else {
			// Search by ID
			response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
		}
		const data = await response.json();
		const newPokemonMap = new Map(pokemonMap);
		newPokemonMap.set(
			searchTerm,
			new Pokemon()
				.Height(data.height)
				.Id(data.id)
				.Name(data.name)
				.Weight(data.weight)
				.Sprites(data.sprites)
		);
		setCurrentPokemonId(data.id);
		setPokemonMap(newPokemonMap);
		setSearchTerm(searchTerm);
	};

	useEffect(() => {
		fetchPokemon(inputTerm.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<h1>Pokedex</h1>
			<input
				type="number"
				placeholder="Search for a Pokemon by ID"
				value={inputTerm}
				onChange={(e) => setInputTerm(parseInt(e.target.value))}
			/>
			<button onClick={() => fetchPokemon(inputTerm.toString())}>Search</button>
			<input
				type="text"
				placeholder="Search for a Pokemon by name"
				value={nameSearchTerm}
				onChange={(e) => setNameSearchTerm(e.target.value)}
			/>
			<button onClick={() => fetchPokemon(nameSearchTerm)}>Search</button>
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
