export const handlePokemonCycle = (
	currentPokemonId: number,
	maxPokemonId: number,
	isNext: boolean // whether to cycle to the next or previous pokemon
) => {
	if (isNext) {
		// if cycling to the next pokemon
		if (currentPokemonId === maxPokemonId) {
			// if the current pokemon is the last one
			return 1; // cycle to the first pokemon
		} else {
			return currentPokemonId + 1; // cycle to the next pokemon
		}
	} else {
		// if cycling to the previous pokemon
		if (currentPokemonId === 1) {
			// if the current pokemon is the first one
			return maxPokemonId; // cycle to the last pokemon
		} else {
			return currentPokemonId - 1; // cycle to the previous pokemon
		}
	}
};

export const partialPokemonNameSearch = (
	allPokemonNames: string[],
	pokemonNameOrIdPartialSearchTerm: string // the partial search term for the pokemon name or id
) => {
	return allPokemonNames.find(
		(
			name // find the first pokemon name that matches the partial search term
		) =>
			name
				.toLowerCase() // convert the name to lowercase for case-insensitive search
				.startsWith(pokemonNameOrIdPartialSearchTerm.toLowerCase()) // check if the name starts with the partial search term
	);
};
