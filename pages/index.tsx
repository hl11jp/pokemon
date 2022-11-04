import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Pokemons } from "../types";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: (await res.json()) as Pokemons[]
    }
  }
}

export default function Home({pokemon}) {
  // const [pokemon, setPokemon] = useState<Pokemons[]>([]);

  // useEffect(() => {
    // async function getPokemon() {
      
      // setPokemon(await res.json());
  //   }
  //   getPokemon();
  // }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
