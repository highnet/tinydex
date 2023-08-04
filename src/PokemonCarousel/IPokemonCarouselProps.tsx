import { IComponentProps } from "../Component/IComponentProps";
import { Pokemon } from "../Pokemon";

export interface IPokemonCarouselProps extends IComponentProps {
	pokemon?: Pokemon;
	handlePreviousPokemon?: () => void;
	handleNextPokemon?: () => void;
}
