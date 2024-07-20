import { useState, useEffect } from "react";
import { PokemonProps, PokemonData } from "@/types/types";
import { POKE_API } from "@/constants/patchs";

const useFetchPokemon = ({ id }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  const fetchPokemon = async (pokemonId: number) => {
    const response = await fetch(`${POKE_API}${pokemonId}`);
    const data: PokemonData = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  return { pokemon };
};

export default useFetchPokemon;
