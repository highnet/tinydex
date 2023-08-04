import {useState, useEffect} from "react";
import {Pokemon} from "./Pokemon";
import TextField from "./TextField/TextField";
import Button from "./Button/Button";
import Typography from "./Typography/Typography";
import "./tinydex.css";

export default function App() {
	const [inputTerm, setInputTerm] = useState("");
	const [currentPokemon, setCurrentPokemon] = useState(new Pokemon());
	const [currentPokemonId, setCurrentPokemonId] = useState(1);
	const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
	const [showSprite, setShowSprite] = useState(false);

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
		setShowSprite(false);
		setTimeout(() => {
			setShowSprite(true);
		}, 100);
	};

	useEffect(() => {
		fetchPokemon(currentPokemonId.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPokemonId]);

	const handleNextPokemon = () => {
		if (currentPokemonId === 1010) {
			setCurrentPokemonId(1);
		} else {
			setCurrentPokemonId(currentPokemonId + 1);
		}
	};

	const handlePreviousPokemon = () => {
		if (currentPokemonId === 1) {
			setCurrentPokemonId(1010);
		} else {
			setCurrentPokemonId(currentPokemonId - 1);
		}
	};

	return (
		<div className="App">
			<div className="tinydex">
				<Typography variant="text-title-large" className="main-title">
					TinyDex
				</Typography>
				<Typography variant="text-body-medium">{currentPokemon.id}</Typography>

				<Typography variant="text-body-medium">
					{currentPokemon.name}
				</Typography>
				<div className="pokemon-carousel">
					<Button className="carousel-button" onClick={handlePreviousPokemon}>
						←
					</Button>
					<img
						src={currentPokemon.sprite}
						alt="Pokemon Sprite"
						className={`pokemon-sprite ${showSprite ? "show" : ""}`}
					/>
					<Button className="carousel-button" onClick={handleNextPokemon}>
						→
					</Button>
				</div>
				<Typography className="pokemon-types" variant="text-body-medium">
					{currentPokemon.types.join(", ")}
				</Typography>
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
