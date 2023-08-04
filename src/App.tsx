import {useState, useEffect} from "react";
import "./md3.css";
import "./tinydex.css";
import {Pokemon} from "./Pokemon";
import TextField from "./TextField/TextField";
import Typography from "./Typography/Typography";
import PokemonCarousel from "./PokemonCarousel/PokemonCarousel";
import {handlePokemonCycle, partialPokemonNameSearch} from "./pokemonUtils";

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

		if (!allPokemonNames.includes(pokemonNameOrIdPartialSearchTerm)) {
			const pokemonMatchingName = partialPokemonNameSearch(
				allPokemonNames,
				pokemonNameOrIdPartialSearchTerm
			);

			if (pokemonMatchingName) {
				pokemonNameOrIdPartialSearchTerm = pokemonMatchingName;
			}
		}

		if (
			pokemonNameOrIdPartialSearchTerm === "" ||
			(!allPokemonNames.includes(pokemonNameOrIdPartialSearchTerm) &&
				(isNaN(Number(pokemonNameOrIdPartialSearchTerm)) ||
					Number(pokemonNameOrIdPartialSearchTerm) < 1 ||
					Number(pokemonNameOrIdPartialSearchTerm) > maxPokemonId))
		) {
			return;
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

	const handlePokemonCycling = (isNext: boolean) => {
		setCurrentPokemonId((prevPokemonId) =>
			handlePokemonCycle(prevPokemonId, maxPokemonId, isNext)
		);
	};

	return (
		<div className="App">
			<div className="tinydex">
				<Typography variant="text-headline-large" className="main-title">
					TinyDex
				</Typography>
				<PokemonCarousel
					pokemon={currentPokemon}
					handlePreviousPokemon={() => handlePokemonCycling(false)}
					handleNextPokemon={() => handlePokemonCycling(true)}
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
					label=" "
					onChange={(e) => {
						setInputTerm((e.target as HTMLInputElement).value);
						fetchPokemon((e.target as HTMLInputElement).value);
					}}></TextField>
			</div>
		</div>
	);
}
