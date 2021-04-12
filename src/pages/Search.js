import Layout from "../Layout";

export default function Search({ match }) {
  return (
    <Layout match={match}>
      <div style={{ border: "1px solid black" }}>
        <div />
        <h1>(React) Google Books Search</h1>
      </div>
    </Layout>
  );
}
