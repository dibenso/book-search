import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState(null);

  return (
    <div style={{ border: "1px solid black", textAlign: "left", marginBottom: 50, padding: 30 }}>
      <h4>Book Search</h4>
      <br />
      <Form>
        <Form.Group controlId="formQuery">
          <Form.Label>Book</Form.Label>
          <Form.Control placeholder="Search for a Book" onChange={event => setQuery(event.target.value)} />
        </Form.Group>
        <div className="text-right">
          <Button
            variant="primary"
            type="submit"
            disabled={!query || query === ""}
            style={{ boxShadow: "5px 5px 2px 1px rgba(0, 0, 0, 0.7)" }}
            onClick={() => onSearch(query)}>
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}
