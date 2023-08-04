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
	// State variables for fading animation and button cooldown
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	// Effect to trigger fading animation when the pokemon changes
	useEffect(() => {
		setIsFadingOut(true);
		const timeoutId = setTimeout(() => {
			setIsFadingOut(false);
		}, 200);
		return () => clearTimeout(timeoutId);
	}, [pokemon?.id]);

	// Build the component class name based on props and default classes
	const _computedComponentClassName = new StringBuilder()
		.add("pokemon-carousel")
		.add("pokemon-carousel-light-theme")
		.add(className || "")
		.toString();

	// Map the pokemon types to a component for rendering
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

	// Handlers for previous/next pokemon with a 1 second cooldown
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

	// Render the component with the appropriate props and state
	return (
		<div id={id} className={_computedComponentClassName}>
			<Typography variant="text-title-medium" className="pokemon-number">
				#{pokemon?.id}
			</Typography>
			<Typography variant="text-title-large" className="pokemon-name">
				{pokemon?.name}
			</Typography>
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
					className={"pokemon-sprite " + (isFadingOut ? "fade-out" : "fade-in")}
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
