import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaGooglePlay, FaTrashAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";
import Layout from "../Layout";

const styles = {
  actionsBtn: { marginLeft: 5, marginRight: 5 }
};

export default function Saved({ match }) {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState(null);
  const fetchBooks = async () => {
    setFetching(true);

    try {
      const response = await fetch("/api/books");
      const savedBooks = await response.json();

      setBooks(savedBooks);
      setError(false);
    } catch (err) {
      setError(true);
    }

    setFetching(false);
  };

  useEffect(async () => {
    if (!books) fetchBooks();
  });

  return (
    <Layout match={match}>
      <h1>Saved</h1>
      {fetching && (
        <div>
          <Loader type="Puff" color="black" height={100} width={100} />
          <h2>Fetching Saved Books...</h2>
        </div>
      )}
      {error && <p style={{ background: "rgba(255, 0, 0, 0.2)" }}>Unable to fetch saved books</p>}
      {books &&
        books.reverse().map(({ title, authors, link, image, description, _id }, index) => (
          <div key={String(index)} style={{ border: "1px solid black", marginLeft: 20, marginRight: 20, padding: 10 }}>
            <Row>
              <Col md={6} style={{ textAlign: "left" }}>
                <h4>{title}</h4>
                {authors && <p>Written by: {authors.join(", ")}</p>}
              </Col>
              <Col md={6} style={{ textAlign: "right" }}>
                <Button variant="primary" href={link} target="_blank" style={styles.actionsBtn}>
                  <FaGooglePlay size={20} color="white" /> View
                </Button>
                <Button
                  variant="danger"
                  style={styles.actionsBtn}
                  onClick={async () => {
                    await fetch(`/api/books/${_id}`, { method: "DELETE" });
                    fetchBooks();
                  }}>
                  <FaTrashAlt size={20} color="white" /> Remove
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <img src={image} alt="Book" />
              </Col>
              <Col md={9}>
                <p>{description}</p>
              </Col>
            </Row>
          </div>
        ))}
    </Layout>
  );
}
