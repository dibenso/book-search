import { Row, Col, Button } from "react-bootstrap";
import { FaGooglePlay, FaSave } from "react-icons/fa";

const styles = {
  actionsBtn: { marginLeft: 5, marginRight: 5 }
};

export default function SearchResults({ books }) {
  const saveBook = async ({ volumeInfo }) => {
    try {
      await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...volumeInfo, image: volumeInfo.imageLinks.thumbnail, link: volumeInfo.infoLink })
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ border: "1px solid black", textAlign: "left", marginBottom: 50, padding: 10 }}>
      <h4>Results</h4>
      {books.map((book, index) => (
        <div key={String(index)} style={{ border: "1px solid black", marginLeft: 20, marginRight: 20, padding: 10 }}>
          <Row>
            <Col md={6}>
              <h4>{book.volumeInfo.title}</h4>
              {book.volumeInfo.subtitle && <p>{book.volumeInfo.subtitle}</p>}
              {book.volumeInfo.authors && <p>Written by: {book.volumeInfo.authors.join(", ")}</p>}
            </Col>
            <Col md={6} style={{ textAlign: "right" }}>
              <Button variant="primary" href={book.volumeInfo.infoLink} target="_blank" style={styles.actionsBtn}>
                <FaGooglePlay size={20} color="white" /> View
              </Button>
              <Button variant="success" style={styles.actionsBtn} onClick={() => saveBook(book)}>
                <FaSave size={20} color="white" /> Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book" />}
            </Col>
            <Col md={9}>
              <p>{book.volumeInfo.description}</p>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
