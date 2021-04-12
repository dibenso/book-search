import { useState } from "react";
import Loader from "react-loader-spinner";
import Layout from "../Layout";
import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";

export default function Search({ match }) {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState(null);
  const performSearch = async query => {
    try {
      setFetching(true);

      const response = await fetch(`/api/search?q=${query}`);
      const results = await response.json();

      setError(false);
      setBooks(results.items);
    } catch (err) {
      setError(true);
    }

    setFetching(false);
  };

  return (
    <Layout match={match}>
      <div style={{ border: "1px solid black", marginBottom: 50 }}>
        <div style={{ marginBottom: 50 }}>
          <h1>(React) Google Books Search</h1>
          <h2>Search for and Save Books of Interest</h2>
        </div>
      </div>
      {fetching && (
        <div>
          <Loader type="Puff" color="black" height={100} width={100} />
          <h2>Searching...</h2>
        </div>
      )}
      {error && <p style={{ background: "rgba(255, 0, 0, 0.2)" }}>Unable to perform search</p>}
      <SearchInput onSearch={performSearch} />
      {books && <SearchResults books={books} />}
    </Layout>
  );
}
