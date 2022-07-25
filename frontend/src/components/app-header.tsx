import { Nav, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeIcon from "../resources/home-icon.jpg";

export default () => {
  const navigate = useNavigate();

  return (
    <Navbar variant="dark" className="App-header" fixed="top">
      <Container
        style={{
          maxWidth: 9000,
        }}
      >
        <Navbar.Brand>
          <img
            src={homeIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <a
            href="#"
            onClick={() => navigate("/home")}
            className="nav-link active"
          >
            Home
          </a>

          <a
            href="#"
            onClick={() => navigate("/admin")}
            className="nav-link active"
          >
            Admin
          </a>

          <a
            href="#"
            onClick={() => navigate("/stats")}
            className="nav-link active"
          >
            Stats
          </a>
        </Nav>
      </Container>
    </Navbar>
  );
};
