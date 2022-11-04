import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pokemon } from "../../types";
import styles from "../../styles/Details.module.css";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

//with a dynamic page like this
// you'll need to know what all the routes are when doing static site generate

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  const pokemon = await res.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: {
      pokemon: await res.json(),
    },
    //added revalidate so the page can update with new changes after 30s
    revalidate: 30
  };
};

export default function Details({ pokemon }) {
  // const router = useRouter();
  // const id = router.query.id;
  //or
  // const {query: {id}} = useRouter();

  // const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // useEffect(() => {
  //   async function getPokemon() {

  //   }
  //   getPokemon();
  // })

  // if (!pokemon) return null;

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
        </div>
        <table>
          <thead className={styles.header}>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats.map(({ name, value, id }) => (
              <tr>
                <td className={styles.attribute}>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
