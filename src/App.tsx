import {useState, useEffect} from "react";
import "./tinydex.css";
import {Pokemon} from "./Pokemon";
import TextField from "./TextField/TextField";
import Typography from "./Typography/Typography";
import PokemonCarousel from "./PokemonCarousel/PokemonCarousel";

export default function App() {
	const [inputTerm, setInputTerm] = useState("");
	const [currentPokemon, setCurrentPokemon] = useState(new Pokemon());
	const [currentPokemonId, setCurrentPokemonId] = useState(1);
	const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
	const maxPokemonId = 1010;

	useEffect(() => {
		const fetchPokemonNames = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=1118"
			);
			const data = await response.json();
			const names = data.results.map((result: {name: string}) => result.name);
			setAllPokemonNames(names);
		};
		fetchPokemonNames();
	}, []);

	const fetchPokemon = async (pokemonNameOrIdPartialSearchTerm: string) => {
		if (pokemonNameOrIdPartialSearchTerm === "") return;

		const pokemonMatchingName = allPokemonNames.find((name) =>
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
			.Sprite(pokeAPIData.sprites.other["official-artwork"].front_default)
			.Types(
				pokeAPIData.types.map((type: {type: {name: string}}) => type.type.name)
			);

		setCurrentPokemonId(pokeAPIData.id);
		setCurrentPokemon(pokemon);
	};

	useEffect(() => {
		fetchPokemon(currentPokemonId.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPokemonId]);

	const handlePokemon = (isNext: boolean) => {
		if (isNext) {
			if (currentPokemonId === maxPokemonId) {
				setCurrentPokemonId(1);
			} else {
				setCurrentPokemonId(currentPokemonId + 1);
			}
		} else {
			if (currentPokemonId === 1) {
				setCurrentPokemonId(maxPokemonId);
			} else {
				setCurrentPokemonId(currentPokemonId - 1);
			}
		}
	};

	return (
		<div className="App">
			<div className="tinydex">
				<Typography variant="text-title-large" className="main-title">
					TinyDex
				</Typography>
				<PokemonCarousel
					pokemon={currentPokemon}
					handlePreviousPokemon={() => handlePokemon(false)}
					handleNextPokemon={() => handlePokemon(true)}
				/>
				<TextField
					configuration="outlined"
					textConfiguration="label-placeholder"
					trailingIcon={false}
					validRegex={
						"^$|^([1-9]|[1-9][0-9]{0,2}|1010)$|^(" +
						allPokemonNames.join("|") +
						")$"
					}
					placeholder="Bulbasaur"
					defaultValue={inputTerm}
					label="Number/Name"
					onChange={(e) => {
						setInputTerm((e.target as HTMLInputElement).value);
						fetchPokemon((e.target as HTMLInputElement).value);
					}}></TextField>
			</div>
		</div>
	);
}
