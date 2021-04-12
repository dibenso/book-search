import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ match, children }) {
  return (
    <>
      <Header match={match} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
