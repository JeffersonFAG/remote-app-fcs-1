import React, { useState, useEffect } from "react";
import { PokemonData, PokemonProps } from "@/types/types";
import useFetchPokemon from "@/hooks/useFetchPokemon";
import styles from "./Pokemon3.module.css";

function Pokemon3({ id }: PokemonProps) {
  //Hook fetch pokemon
  const { pokemon } = useFetchPokemon({ id });

  //Function event in the init the project
  useEffect(() => {
    const handlePokemonChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: number }>;
      const fetchPokemon = async (pokemonId: number) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data: PokemonData = await response.json();
      };

      fetchPokemon(customEvent.detail.id);
    };

    window.addEventListener("changePokemon", handlePokemonChange);

    return () => {
      window.removeEventListener("changePokemon", handlePokemonChange);
    };
  }, []);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default Pokemon3;
