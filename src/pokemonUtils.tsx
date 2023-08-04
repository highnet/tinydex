export const handlePokemonCycle = (
	currentPokemonId: number,
	maxPokemonId: number,
	isNext: boolean
) => {
	if (isNext) {
		if (currentPokemonId === maxPokemonId) {
			return 1;
		} else {
			return currentPokemonId + 1;
		}
	} else {
		if (currentPokemonId === 1) {
			return maxPokemonId;
		} else {
			return currentPokemonId - 1;
		}
	}
};

export const partialPokemonNameSearch = (
	allPokemonNames: string[],
	pokemonNameOrIdPartialSearchTerm: string
) => {
	return allPokemonNames.find((name) =>
		name
			.toLowerCase()
			.startsWith(pokemonNameOrIdPartialSearchTerm.toLowerCase())
	);
};
