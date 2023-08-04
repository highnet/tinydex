import React, {useState, useEffect} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IPokemonCarouselProps} from "./IPokemonCarouselProps";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

const PokemonCarousel: React.FC<IPokemonCarouselProps> = ({
	className,
	id,
	handlePreviousPokemon,
	handleNextPokemon,
	pokemon,
}) => {
	const [isFadingOut, setIsFadingOut] = useState(false);

	useEffect(() => {
		setIsFadingOut(true);
		const timeoutId = setTimeout(() => {
			setIsFadingOut(false);
		}, 400);
		return () => clearTimeout(timeoutId);
	}, [pokemon?.id]);

	const _computedComponentClassName = new StringBuilder()
		.add("pokemon-carousel")
		.add("pokemon-carousel-light-theme")
		.add(className || "")
		.toString();

	const _typesComponent = pokemon?.types?.map((type, index) => {
		return (
			<React.Fragment key={index}>
				<img src={`../../${type}_icon.png`} />
				<Typography variant="text-title-large">{type}</Typography>
			</React.Fragment>
		);
	});

	return (
		<div id={id} className={_computedComponentClassName}>
			<Typography variant="text-title-medium">#{pokemon?.id}</Typography>
			<Typography variant="text-title-large">{pokemon?.name}</Typography>
			<div className="pokemon-carousel-hero">
				<Button className="carousel-button" onClick={handlePreviousPokemon}>
					←
				</Button>
				<img
					src={pokemon?.sprite}
					alt="Pokemon Sprite"
					className={isFadingOut ? "fade-out" : "fade-in"}
				/>
				<Button className="carousel-button" onClick={handleNextPokemon}>
					→
				</Button>
			</div>
			<Typography className="pokemon-types" variant="text-body-medium">
				{_typesComponent}
			</Typography>
		</div>
	);
};

export default PokemonCarousel;
