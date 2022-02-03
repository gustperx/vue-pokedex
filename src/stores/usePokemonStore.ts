import { defineStore } from "pinia";
import { getPokemons, paginatePokemons } from "@/helpers/pokemonHelper";
import { PokemonList } from "@/interfaces/pokemon";

interface PokemonState {
  isLoading: boolean;
  pokemons: PokemonList[];
  pokemonPagination: PokemonList[][];
  // pokemon: Pokemon;
}

const usePokemonStore = defineStore("pokemonStore", {
  state: (): PokemonState => ({
    isLoading: false,
    pokemons: [],
    pokemonPagination: [],
    // pokemon: null,
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
    async getPokemons(): Promise<void> | never {
      try {
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
      } catch (error) {
        localStorage.removeItem("pokemons");
        console.error(error);
        throw new Error("Error al obtener la lista de pokemons");
      }
    },
  },
});

export { usePokemonStore };