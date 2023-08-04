import { handlePokemonCycle } from './pokemonUtils';
import { expect, describe, it } from 'vitest'

describe('handlePokemonCycle', () => {
  it('should cycle to the next pokemon', () => {
    const currentPokemonId = 1;
    const maxPokemonId = 10;
    const isNext = true;
    const expected = 2;
    const result = handlePokemonCycle(currentPokemonId, maxPokemonId, isNext);
    expect(result).toEqual(expected);
  });

  it('should cycle to the previous pokemon', () => {
    const currentPokemonId = 2;
    const maxPokemonId = 10;
    const isNext = false;
    const expected = 1;
    const result = handlePokemonCycle(currentPokemonId, maxPokemonId, isNext);
    expect(result).toEqual(expected);
  });

  it('should cycle to the last pokemon when at the first pokemon and going backwards', () => {
    const currentPokemonId = 1;
    const maxPokemonId = 10;
    const isNext = false;
    const expected = 10;
    const result = handlePokemonCycle(currentPokemonId, maxPokemonId, isNext);
    expect(result).toEqual(expected);
  });

  it('should cycle to the first pokemon when at the last pokemon and going forwards', () => {
    const currentPokemonId = 10;
    const maxPokemonId = 10;
    const isNext = true;
    const expected = 1;
    const result = handlePokemonCycle(currentPokemonId, maxPokemonId, isNext);
    expect(result).toEqual(expected);
  });
});