import {useEffect, useState} from "react";
import {Pokemon} from "./Pokemon";

export default function App() {
	const [pokemonMap, setPokemonMap] = useState<Map<string, Pokemon>>(new Map());
	const [currentPokemonId, setCurrentPokemonId] = useState("bulbasaur");
	const [inputTerm, setInputTerm] = useState("");

	const fetchPokemon = async (pokemonTerm: string) => {
		if (isNaN(parseInt(pokemonTerm))) {
			pokemonTerm = await getPokemonIdByName(pokemonTerm).then((id) =>
				id.toString()
			);
		}

		if (pokemonMap.has(pokemonTerm)) {
			console.log("Pokemon already in map");
			setCurrentPokemonId(pokemonTerm);
			return;
		}
		console.log("Pokemon not in map");

		// Search by id
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemonTerm}`
		);

		const data = await response.json();
		const newPokemonMap = new Map(pokemonMap);
		newPokemonMap.set(
			pokemonTerm,
			new Pokemon()
				.Height(data.height)
				.Id(data.id)
				.Name(data.name)
				.Weight(data.weight)
				.Sprites(data.sprites)
		);
		setPokemonMap(newPokemonMap);
		setCurrentPokemonId(pokemonTerm);
	};

	async function getPokemonIdByName(name: string): Promise<number> {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
		const data = await response.json();
		return data.id;
	}

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
				onChange={(e) => {
					setInputTerm(e.target.value);
					fetchPokemon(e.target.value);
				}}
			/>
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
