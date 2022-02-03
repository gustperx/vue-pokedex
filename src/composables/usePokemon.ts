import { usePokemonStore } from "@/stores/usePokemonStore";

const usePokemonHook = () => {
  const pokemonStore = usePokemonStore();

  const getPokemons = async () => {
    await pokemonStore.getPokemons();
  };

  getPokemons();

  return {
    getPokemonPage: (page: number) => pokemonStore.getPokemonPage(page),
    searchByName: (text: string) => pokemonStore.searchByName(text),
  };
};

export { usePokemonHook };
