import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = useState<string | undefined>({});
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/createuser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const col = await res.json();
      console.log(col);
    } catch (err) {
      console.error(err);
    }
    FindUser();
  };

  const FindUser = async () => {
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const col = await res.json();
      setData(col);
    } catch (err) {
      console.error(err);
    }
  };

  const Details = () => {
    return (
      <div>
        <h1 className={styles.cred}>
          {data.name === undefined
            ? "After submitting, your username comes here"
            : data.name}
        </h1>
        <h1 className={styles.cred}>
          {data.password === undefined
            ? "After submitting, your password comes here"
            : data.password}
        </h1>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Enter credentials</h1>
        <form className={styles.form} method='POST'>
          <input
            className={styles.input}
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className={styles.input}
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className={styles.button} type='submit' onClick={createUser}>
            Submit
          </button>
        </form>
        <Details />
      </main>
    </div>
  );
}
