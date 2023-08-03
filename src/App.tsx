import {useEffect, useState} from "react";
import {Pokemon} from "./Pokemon";

export default function App() {
	const [pokemonMap, setPokemonMap] = useState<Map<string, Pokemon>>(new Map());
	const [currentPokemonId, setCurrentPokemonId] = useState("1");
	const [inputTerm, setInputTerm] = useState("");

	const fetchPokemon = async (inputTerm: string) => {
		if (pokemonMap.has(inputTerm)) {
			console.log("Pokemon already in map");
			setCurrentPokemonId(inputTerm);
			return;
		}
		console.log("Pokemon not in map");
		// Search by id
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
		setPokemonMap(newPokemonMap);
		setCurrentPokemonId(inputTerm);
	};

	useEffect(() => {
		fetchPokemon(currentPokemonId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNextPokemon = () => {
		const nextPokemonId = parseInt(currentPokemonId) + 1;
		if (nextPokemonId > 1010) {
			fetchPokemon("1");
		} else {
			fetchPokemon(nextPokemonId.toString());
		}
	};

	const handlePreviousPokemon = () => {
		const previousPokemonId = parseInt(currentPokemonId) - 1;
		if (previousPokemonId < 1) {
			fetchPokemon("1010");
		} else {
			fetchPokemon(previousPokemonId.toString());
		}
	};

	return (
		<div className="App">
			<h1>Pokedex</h1>

			<input
				type="text"
				placeholder="Search for a Pokemon by name"
				value={inputTerm}
				onChange={(e) => setInputTerm(e.target.value)}
			/>
			<button onClick={() => fetchPokemon(inputTerm)}>Search</button>
			<button onClick={handlePreviousPokemon}>Previous</button>
			<button onClick={handleNextPokemon}>Next</button>
			<ul>
				{currentPokemonId && (
					<li key={pokemonMap.get(currentPokemonId)?.id}>
						<img
							src={pokemonMap.get(currentPokemonId)?.sprites.front_default}
							alt={pokemonMap.get(currentPokemonId)?.name}
						/>
						<h2>{pokemonMap.get(currentPokemonId)?.name}</h2>
						<p>Height: {pokemonMap.get(currentPokemonId)?.height}</p>
						<p>Weight: {pokemonMap.get(currentPokemonId)?.weight}</p>
						<p>Id: {pokemonMap.get(currentPokemonId)?.id}</p>
					</li>
				)}
			</ul>
		</div>
	);
}
