import { useState, useEffect } from "react";
import "./md3.css";
import "./tinydex.css";
import { Pokemon } from "./Pokemon";
import TextField from "./TextField/TextField";
import Typography from "./Typography/Typography";
import PokemonCarousel from "./PokemonCarousel/PokemonCarousel";
import {
	handlePokemonCycle,
	partialPokemonNameSearch,
} from "./Gizmos/PokemonUtils";

export default function App() {
	const [inputTerm, setInputTerm] = useState("");
	const [currentPokemon, setCurrentPokemon] = useState(new Pokemon());
	const [currentPokemonId, setCurrentPokemonId] = useState(1);
	const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
	const maxPokemonId = 1010; // maximum pokemon id

	useEffect(() => {
		const fetchPokemonNames = async () => {
			// fetches all pokemon names
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=1118"
			);
			const data = await response.json();
			const names = data.results.map((result: { name: string }) => result.name);
			setAllPokemonNames(names);
		};
		fetchPokemonNames();
	}, []);

	const fetchPokemon = async (pokemonNameOrIdPartialSearchTerm: string) => {
		// fetches a pokemon based on name or id
		if (pokemonNameOrIdPartialSearchTerm === "") return;

		if (!allPokemonNames.includes(pokemonNameOrIdPartialSearchTerm)) {
			// if the input is not a pokemon name, try to find a matching name
			const pokemonMatchingName = partialPokemonNameSearch(
				allPokemonNames,
				pokemonNameOrIdPartialSearchTerm
			);

			if (pokemonMatchingName) {
				pokemonNameOrIdPartialSearchTerm = pokemonMatchingName;
			}
		}

		/*
		if (
			pokemonNameOrIdPartialSearchTerm === "" ||
			(!allPokemonNames.includes(pokemonNameOrIdPartialSearchTerm) &&
				(isNaN(Number(pokemonNameOrIdPartialSearchTerm)) ||
					Number(pokemonNameOrIdPartialSearchTerm) < 1 ||
					Number(pokemonNameOrIdPartialSearchTerm) > maxPokemonId))
		) {
			return; // If the search term is empty or not a valid pokemon name or id, return
		}
		*/

		const validRegex = new RegExp( // regex to validate the input
			`^$|^([1-9]|[1-9][0-9]{0,2}|1000|1001|1002|1003|1004|1005|1006|1007|1008|1009|1010)$|^(${allPokemonNames.join(
				"|"
			)})$`
		);

		if (!validRegex.test(pokemonNameOrIdPartialSearchTerm)) {
			// if the input is not valid, return
			return;
		}

		const pokeAPIResponse = await fetch(
			// fetch the pokemon data from the API
			`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrIdPartialSearchTerm}`
		);

		const pokeAPIData = await pokeAPIResponse.json();

		const pokemon = new Pokemon() // create a new Pokemon object with the fetched data
			.Id(pokeAPIData.id)
			.Name(
				pokeAPIData.name.charAt(0).toUpperCase() + pokeAPIData.name.slice(1)
			)
			.Sprite(pokeAPIData.sprites.other["official-artwork"].front_default)
			.Types(
				pokeAPIData.types.map(
					(type: { type: { name: string } }) => type.type.name
				)
			);

		setCurrentPokemonId(pokeAPIData.id); // set the current pokemon id and pokemon object
		setCurrentPokemon(pokemon);
	};

	useEffect(() => {
		// fetch the pokemon when the current pokemon id changes
		fetchPokemon(currentPokemonId.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPokemonId]);

	const handlePokemonCycling = (isNext: boolean) => {
		// function to handle cycling through pokemon
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
				<div className="tinydex-content">
					<PokemonCarousel
						pokemon={currentPokemon} // display the current pokemon in the carousel
						handlePreviousPokemon={() => handlePokemonCycling(false)} // handle cycling to the previous pokemon
						handleNextPokemon={() => handlePokemonCycling(true)} // handle cycling to the next pokemon
					/>
					<TextField
						className="pokemon-search-bar"
						configuration="outlined"
						textConfiguration="label-placeholder"
						trailingIcon={false}
						validRegex={
							// validate the input with the regex
							"^$|^([1-9]|[1-9][0-9]{0,2}|1000|1001|1002|1003|1004|1005|1006|1007|1008|1009|1010)$|^(" +
							allPokemonNames.join("|") +
							")$"
						}
						placeholder="Bulbasaur"
						defaultValue={inputTerm}
						label=" "
						onChange={(e) => {
							// handle input changes and fetch the pokemon
							setInputTerm((e.target as HTMLInputElement).value);
							fetchPokemon((e.target as HTMLInputElement).value);
						}}
					></TextField>
				</div>
			</div>
		</div>
	);
}
