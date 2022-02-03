import { pokemonApi } from "@/apis/pokemonApi";
import { Pokemon, PokemonList, PokemonAll } from "@/interfaces/pokemon";

const getPokemons = async (): Promise<PokemonList[]> | never => {
  try {
    const { data } = await pokemonApi.get<PokemonAll>(`?offset=0&limit=649`);

    const pokemons = data.results.map((pokemon, index) => {
      return {
        id: index + 1,
        name: pokemon.name,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          index + 1
        }.svg`,
      };
    });
    return pokemons;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la lista de pokemons");
  }
};

const paginatePokemons = (pokemons: PokemonList[]): PokemonList[][] => {
  const parts = [];

  for (let index = 0; index < 65; index++) {
    parts.push(pokemons.splice(0, 10));
  }

  return parts;
};

const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  const { data } = await pokemonApi.get<Pokemon>(`/${pokemonId}`);

  console.log(data);

  return data;
};

export { getPokemons, getPokemon, paginatePokemons };
