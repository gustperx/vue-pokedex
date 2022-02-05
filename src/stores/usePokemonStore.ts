import { defineStore } from "pinia";
import {
  formatPokemonSpecies,
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonImageUrl,
  getPokemons,
  getPokemonSpecies,
  paginatePokemons,
  recursiveChain,
} from "@/helpers/pokemonHelper";
import { PokemonList, PokemonPokedex } from "@/interfaces/pokemon";

interface PokemonState {
  isLoading: boolean;
  isLoadingPokedex: boolean;
  pokemons: PokemonList[];
  pokemonPagination: PokemonList[][];
  pokemon?: PokemonPokedex;
}

const usePokemonStore = defineStore("pokemonStore", {
  state: (): PokemonState => ({
    isLoading: false,
    isLoadingPokedex: false,
    pokemons: [],
    pokemonPagination: [],
    pokemon: undefined,
  }),
  getters: {
    getPokemonPage:
      (store) =>
      (page: number): PokemonList[] => {
        if (page < 1) return [];
        const idxPokemon = page - 1;
        return [...store.pokemonPagination[idxPokemon]];
      },
    searchByName:
      (store) =>
      (text: string): PokemonList[] => {
        const results = store.pokemons.filter((pokemon) =>
          pokemon.name.includes(text.toLowerCase())
        );
        return [...results];
      },
  },
  actions: {
    async getPokemons(): Promise<PokemonList[]> | never {
      try {
        this.isLoading = true;
        const pokemons = localStorage.getItem("pokemons");

        if (pokemons) {
          console.log("Pokemons desde LocalStorage");
          this.pokemons = JSON.parse(pokemons);
        } else {
          console.log("Pokemons desde PokeApi");
          this.pokemons = await getPokemons();
          localStorage.setItem("pokemons", JSON.stringify(this.pokemons));
        }

        this.pokemonPagination = paginatePokemons([...this.pokemons]);
        this.isLoading = false;

        return [...this.pokemons];
      } catch (error) {
        this.isLoading = false;
        this.pokemons = [];
        localStorage.removeItem("pokemons");
        console.error(error);
        throw new Error("Error al obtener la lista de pokémons");
      }
    },
    async getPokemon(pokemonId: number): Promise<PokemonPokedex> {
      try {
        this.isLoadingPokedex = true;

        const pokemonCache = localStorage.getItem(`pokemon-${pokemonId}`);
        if (pokemonCache) {
          this.isLoadingPokedex = false;
          this.pokemon = JSON.parse(pokemonCache);
          return JSON.parse(pokemonCache);
        }

        const pokemon = await getPokemon(pokemonId);
        const species = await getPokemonSpecies(pokemon.species.url);
        const evolutionChain = await getPokemonEvolutionChain(
          species.evolution_chain.url
        );

        const pokedex = {
          id: pokemon.id,
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height,
          base_experience: pokemon.base_experience,
          types: pokemon.types.map((type) => type.type.name),
          stats: pokemon.stats.map((stat) => ({
            name: stat.stat.name,
            base_start: stat.base_stat,
          })),
          species: formatPokemonSpecies(species),
          evolution_chain: recursiveChain(evolutionChain.chain),
          imagen: getPokemonImageUrl(pokemon.id),
        };

        this.pokemon = { ...pokedex };
        this.isLoadingPokedex = false;
        localStorage.setItem(
          `pokemon-${pokemonId}`,
          JSON.stringify(this.pokemon)
        );

        return pokedex;
      } catch (error) {
        this.pokemon = undefined;
        console.log(error);
        throw new Error(`Error al obtener al pokémon: ${pokemonId}`);
      }
    },
  },
});

export { usePokemonStore };
