import { pokemonApi } from "@/apis/pokemonApi";
import {
  Chain,
  ChainModel,
  EvolutionChain,
  PlainEvolutionChain,
  Pokemon,
  PokemonAll,
  PokemonList,
  PokemonSpecies,
  PokemonSpeciesFormat,
} from "@/interfaces/pokemon";
import axios from "axios";

export const getPokemons = async (): Promise<PokemonList[]> | never => {
  try {
    const { data } = await pokemonApi.get<PokemonAll>(`?offset=0&limit=649`);

    const pokemons = data.results.map((pokemon, index) => {
      return {
        id: index + 1,
        name: pokemon.name,
        imagen: getPokemonImageUrl(index + 1),
      };
    });
    return pokemons;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la lista de pokémons");
  }
};

export const paginatePokemons = (pokemons: PokemonList[]): PokemonList[][] => {
  const parts = [];

  for (let index = 0; index < 65; index++) {
    parts.push(pokemons.splice(0, 10));
  }

  return parts;
};

export const getPokemon = async (
  pokemonId: number
): Promise<Pokemon> | never => {
  try {
    const { data } = await pokemonApi.get<Pokemon>(`/${pokemonId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al obtener al pokémon: ${pokemonId}`);
  }
};

export const getPokemonSpecies = async (
  url: string
): Promise<PokemonSpecies> | never => {
  try {
    const { data } = await axios.get<PokemonSpecies>(url);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al obtener los detalles del pokémon`);
  }
};

export const getPokemonEvolutionChain = async (
  url: string
): Promise<EvolutionChain> | never => {
  try {
    const { data } = await axios.get<EvolutionChain>(url);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al obtener los detalles de evolución del pokémon`);
  }
};

export const formatPokemonSpecies = (
  pokemonSpecies: PokemonSpecies
): PokemonSpeciesFormat => {
  return {
    color: pokemonSpecies.color.name,
    habitat: pokemonSpecies.habitat?.name || "Unknown",
    is_legendary: pokemonSpecies.is_legendary,
    generation: pokemonSpecies.generation.name,
    genera: pokemonSpecies.genera
      .filter((g) => {
        if (g.language.name === "en") {
          return g.genus;
        }
      })
      .map((g) => g.genus),
    flavor_text_entries: pokemonSpecies.flavor_text_entries
      .filter((text_entry) => {
        if (text_entry.language.name === "en") {
          return text_entry;
        }
      })
      .map((text_entry) => text_entry.flavor_text),
  };
};

export const recursiveChain = (chain: Chain): ChainModel | null => {
  if (!chain) return null;

  const stringUrl = chain.species.url.split("/");
  const position = getPositionInUrl("pokemon-species", stringUrl);
  const pokemonId = position ? stringUrl[position + 1] : null;

  if (!pokemonId) return null;

  return {
    id: Number(pokemonId),
    name: chain.species.name,
    imagen: getPokemonImageUrl(Number(pokemonId)),
    next_evolution: chain.evolves_to[0]
      ? recursiveChain(chain.evolves_to[0])
      : null,
  };
};

export const planeEvolutionChain = (
  evolutionChain: ChainModel
): PlainEvolutionChain[] => {
  const arrAcumulate: PlainEvolutionChain[] = [];

  arrAcumulate.push({
    id: evolutionChain.id,
    name: evolutionChain.name,
    imagen: evolutionChain.imagen,
  });

  if (evolutionChain.next_evolution) {
    return reduceEvolutionChain(arrAcumulate, evolutionChain.next_evolution);
  }

  return arrAcumulate;
};

const reduceEvolutionChain = (
  arrAcumulate: PlainEvolutionChain[],
  evolutionChain: ChainModel | null
): PlainEvolutionChain[] => {
  if (evolutionChain) {
    arrAcumulate.push({
      id: evolutionChain.id,
      name: evolutionChain.name,
      imagen: evolutionChain.imagen,
    });

    if (evolutionChain.next_evolution) {
      return reduceEvolutionChain(arrAcumulate, evolutionChain.next_evolution);
    }
  }

  return arrAcumulate;
};

export const getPokemonImageUrl = (pokemonId: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
};

const getPositionInUrl = (
  elementToFind: string,
  arrayElements: string[]
): number | null => {
  let i;
  for (i = 0; i < arrayElements.length; i += 1) {
    if (arrayElements[i] === elementToFind) {
      return i;
    }
  }
  return null;
};
