import { partialPokemonNameSearch } from "./pokemonUtils";
import { expect, describe, it } from "vitest";

describe('partialPokemonNameSearch', () => {
  it('should return undefined when using nonvalid alphanumeric characters', () => {
    const searchTerm = 'ж';
    const expected = undefined;
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur'],searchTerm);
    expect(result).toEqual(expected);
  });

  it('should return bulbasaur when searching bul', () => {
    const searchTerm = 'bul';
    const expected = 'bulbasaur';
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur'],searchTerm);
    expect(result).toEqual(expected);
  });

  it('should return metapod when searching m', () => {
    const searchTerm = 'm';
    const expected = 'metapod';
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur','metapod', 'mew', 'mewtwo'],searchTerm);
    expect(result).toEqual(expected);
  });

  it('should return metapod when searching me', () => {
    const searchTerm = 'me';
    const expected = 'metapod';
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur','metapod', 'mew', 'mewtwo'],searchTerm);
    expect(result).toEqual(expected);
  });

  it('should return mew when searching mew', () => {
    const searchTerm = 'mew';
    const expected = 'mew';
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur','metapod', 'mew', 'mewtwo'],searchTerm);
    expect(result).toEqual(expected);
  });

  it('should return mewtwo when searching mewt', () => {
    const searchTerm = 'mewt';
    const expected = 'mewtwo';
    const result = partialPokemonNameSearch( ['bulbasaur', 'ivysaur', 'venusaur','metapod', 'mew', 'mewtwo'],searchTerm);
    expect(result).toEqual(expected);
  });
});