import { ChainModel, PlainEvolutionChain } from "@/interfaces/pokemon";
import { planeEvolutionChain } from "@/helpers/pokemonHelper";

interface ColorTypes {
  name: string;
  color: string;
}

export const pokemonColorTypes = (types: string[]) => {
  const colors = types.map((type): ColorTypes => {
    return (
      pokemonTypes.find((color) => color.name == type) || {
        name: type,
        color: "bg-gray-400",
      }
    );
  });
  return colors;
};

export const randomText = (flavor_text_entries: string[]): string => {
  const idx = Math.floor(Math.random() * (flavor_text_entries.length - 1));
  return flavor_text_entries[idx];
};

export const processEvolutions = (
  evolutions: ChainModel | null
): PlainEvolutionChain[] => {
  if (!evolutions) return [];
  return planeEvolutionChain(evolutions);
};

export const decimetroToMetros = (value: number) => {
  return `${value / 10} m`;
};

export const hectogramToKilos = (value: number) => {
  return `${value / 10} kg`;
};

export const pokemonTypes = [
  {
    name: "normal",
    color: "bg-zinc-500",
  },
  {
    name: "fighting",
    color: "bg-orange-800",
  },
  {
    name: "flying",
    color: "bg-slate-400",
  },
  {
    name: "poison",
    color: "bg-violet-700",
  },
  {
    name: "ground",
    color: "bg-yellow-700",
  },
  {
    name: "rock",
    color: "bg-yellow-900",
  },
  {
    name: "bug",
    color: "bg-green-900",
  },
  {
    name: "ghost",
    color: "bg-violet-500",
  },
  {
    name: "steel",
    color: "bg-teal-500",
  },
  {
    name: "fire",
    color: "bg-red-700",
  },
  {
    name: "water",
    color: "bg-blue-600",
  },
  {
    name: "grass",
    color: "bg-emerald-600",
  },
  {
    name: "electric",
    color: "bg-yellow-500",
  },
  {
    name: "psychic",
    color: "bg-rose-500",
  },
  {
    name: "ice",
    color: "bg-blue-300",
  },
  {
    name: "dragon",
    color: "bg-teal-600",
  },
  {
    name: "dark",
    color: "bg-neutral-900",
  },
  {
    name: "fairy",
    color: "bg-pink-800",
  },
  {
    name: "unknown",
    color: "bg-zinc-300",
  },
  {
    name: "shadow",
    color: "bg-zinc-800",
  },
];

export const pokemonIconStat = [
  {
    name: "hp",
    icon: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
  },
  {
    name: "attack",
    icon: "M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z",
  },
  {
    name: "defense",
    icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
  },
  {
    name: "special-attack",
    icon: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
  },
  {
    name: "special-defense",
    icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
  },
  {
    name: "speed",
    icon: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
  },
];
