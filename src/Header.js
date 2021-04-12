import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const styles = {
  link: { marginLeft: 10, marginRight: 10, color: "black" }
};

export default function Header({ match }) {
  const { path } = match;

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <Link to="/" style={{ ...styles.link, textDecoration: "none" }}>
          Google Books
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" style={{ ...styles.link, color: path === "/" ? "black" : "gray" }}>
            Search
          </Link>
          <Link to="/saved" style={{ ...styles.link, color: path === "/saved" ? "black" : "gray" }}>
            Saved
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
