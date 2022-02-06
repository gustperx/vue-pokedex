import { defineStore } from "pinia";
import Swal from "sweetalert2";

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
        if (store.pokemonPagination.length < 1) return [];
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
    async loadPokemons(): Promise<void> {
      try {
        this.isLoading = true;
        const pokemons = localStorage.getItem("pokemons");

        if (pokemons) {
          this.pokemons = JSON.parse(pokemons);
        } else {
          this.pokemons = await getPokemons();
          localStorage.setItem("pokemons", JSON.stringify(this.pokemons));
        }

        this.pokemonPagination = paginatePokemons([...this.pokemons]);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pokemons = [];
        localStorage.removeItem("pokemons");

        Swal.fire({
          title: "Oops!",
          text: `${error}`,
          icon: "error",
          confirmButtonColor: "#0369a1",
        });
      }
    },
    async getPokemon(pokemonId: number): Promise<void> {
      try {
        this.isLoadingPokedex = true;

        const pokemonCache = localStorage.getItem(`pokemon-${pokemonId}`);
        if (pokemonCache) {
          this.pokemon = JSON.parse(pokemonCache);
          this.isLoadingPokedex = false;
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
          JSON.stringify({ ...pokedex })
        );
      } catch (error) {
        this.pokemon = undefined;
        this.isLoadingPokedex = false;

        Swal.fire({
          title: "Oops!",
          text: `${error}`,
          icon: "error",
          confirmButtonColor: "#0369a1",
        });
      }
    },
  },
});

export { usePokemonStore };
