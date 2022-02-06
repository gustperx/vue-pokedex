import { ref } from "vue";
import Swal from "sweetalert2";

import { PokemonList } from "@/interfaces/pokemon";
import { usePokemonStore } from "@/stores/usePokemonStore";

const usePokemonGame = () => {
  const pokemonStore = usePokemonStore();

  const pokemonOptions = ref<PokemonList[]>([]);
  const pokemonActive = ref<PokemonList>();
  const showPokemon = ref<boolean>(false);
  const message = ref<string>("");

  const loadPokemons = async () => {
    await pokemonStore.loadPokemons();
    startGame();
  };

  const startGame = () => {
    try {
      pokemonOptions.value = [];
      pokemonActive.value = undefined;
      showPokemon.value = false;
      message.value = "";

      pokemonOptions.value = pokemonStore.getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      pokemonActive.value = { ...pokemonOptions.value[rndInt] };
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: `${error}`,
        icon: "error",
        confirmButtonColor: "#0369a1",
      });
    }
  };

  const pokemonSelected = (pokemonId: number) => {
    if (!pokemonActive.value) {
      Swal.fire({
        title: "Bug in game",
        text: `Oops, there is no correct option`,
        icon: "error",
        confirmButtonColor: "#0369a1",
      });
      return;
    }

    showPokemon.value = true;
    if (pokemonId === pokemonActive.value.id) {
      message.value = `Good!! it's ${pokemonActive.value.name}`;
    } else {
      message.value = `Oops it was ${pokemonActive.value.name}`;
    }
  };

  loadPokemons();

  return {
    message,
    pokemonActive,
    pokemonOptions,
    pokemonSelected,
    showPokemon,
    startGame,
  };
};

export { usePokemonGame };
