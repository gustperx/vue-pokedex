import { computed, ref, watch } from "vue";
import { PokemonList, PokemonPokedex } from "@/interfaces/pokemon";
import { usePokemonStore } from "@/stores/usePokemonStore";

const usePokemon = () => {
  const pokemonStore = usePokemonStore();

  const page = ref<number>(1);
  const pokemons = ref<PokemonList[]>([]);
  const pokemonSearch = ref<string>("");

  watch(pokemonSearch, (newValue) => {
    if (newValue.length < 3) return;
    pokemons.value = pokemonStore.searchByName(newValue);
  });

  const getPokemon = async (pokemonId: number) => {
    const pokedex = await pokemonStore.getPokemon(pokemonId);
    return pokedex;
  };

  const loadPokedex = async () => {
    await pokemonStore.loadPokemons();
    pokemons.value = pokemonStore.getPokemonPage(1);
  };

  loadPokedex();
  getPokemon(pokemonStore.getRandomPokemonId);

  return {
    page,
    pokemons,
    pokemonSearch,
    pokemon: computed(() => <PokemonPokedex>pokemonStore.pokemon),
    isLoading: computed(() => <boolean>pokemonStore.isLoading),
    isLoadingPokedex: computed(() => pokemonStore.isLoadingPokedex),
    getPokemon,
    paginateHandler: () =>
      (pokemons.value = pokemonStore.getPokemonPage(page.value)),
    changeSearch: (text: string) => (pokemonSearch.value = text),
    resetSearch: () => {
      pokemonSearch.value = "";
      page.value = 1;
      pokemons.value = pokemonStore.getPokemonPage(1);
    },
  };
};

export { usePokemon };
