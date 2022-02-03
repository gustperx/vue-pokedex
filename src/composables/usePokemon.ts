import { computed, ref, watch } from "vue";
import { PokemonList } from "@/interfaces/pokemon";
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

  const pokemon = async (pokemonId: number) => {
    const poke = await pokemonStore.getPokemon(pokemonId);
    console.log(poke);
    return poke;
  };

  const loadPokedex = async () => {
    await pokemonStore.getPokemons();
    pokemons.value = pokemonStore.getPokemonPage(1);
  };
  loadPokedex();

  return {
    page,
    pokemons,
    pokemonSearch,
    pokemon,
    isLoading: computed(() => pokemonStore.isLoading),
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
