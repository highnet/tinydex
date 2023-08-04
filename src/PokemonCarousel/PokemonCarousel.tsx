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
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		setIsFadingOut(true);
		const timeoutId = setTimeout(() => {
			setIsFadingOut(false);
		}, 200);
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
				<img src={`../../${type}_icon.png`} className="type-icon" />
				<Typography variant="text-title-large" className="pokemon-type">
					{type}
				</Typography>
			</React.Fragment>
		);
	});

	const handlePreviousPokemonWithCooldown = () => {
		if (!isButtonDisabled) {
			setIsButtonDisabled(true);
			handlePreviousPokemon?.();
			setTimeout(() => {
				setIsButtonDisabled(false);
			}, 1000);
		}
	};

	const handleNextPokemonWithCooldown = () => {
		if (!isButtonDisabled) {
			setIsButtonDisabled(true);
			handleNextPokemon?.();
			setTimeout(() => {
				setIsButtonDisabled(false);
			}, 1000);
		}
	};

	return (
		<div id={id} className={_computedComponentClassName}>
			<Typography variant="text-title-medium">#{pokemon?.id}</Typography>
			<Typography variant="text-title-large">{pokemon?.name}</Typography>
			<div className="pokemon-carousel-hero">
				<Button
					className="carousel-button"
					onClick={handlePreviousPokemonWithCooldown}
					disabled={isButtonDisabled}>
					←
				</Button>
				<img
					src={pokemon?.sprite}
					alt="Pokemon Sprite"
					className={isFadingOut ? "fade-out" : "fade-in"}
				/>
				<Button
					className="carousel-button"
					onClick={handleNextPokemonWithCooldown}
					disabled={isButtonDisabled}>
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
