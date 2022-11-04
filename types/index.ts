export interface Pokemons {
  id: number;
  name: string;
  image: string; 
}

interface PokemonStats {
  name: string;
  value: number;
}

export interface Pokemon {
  name: string;
  type: string[];
  stats: PokemonStats[];
  image: string
}