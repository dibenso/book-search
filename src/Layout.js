import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import Header from "./Header";
import Footer from "./Footer";

const ENDPOINT = "https://infinite-ocean-88088.herokuapp.com/";

export default function Layout({ match, children }) {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("bookSaved", bookTitle => toast.success(`💾 Book Saved: ${bookTitle}`));

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Header match={match} />
      <Container style={{ textAlign: "center" }}>{children}</Container>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}
