import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Routes from "./Router/Router";
import "./index.scss";
import Header from "./Header/Header";

export default function App(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <hr />
      </Row>
      <Row>
        <Col>
          <Routes />
        </Col>
      </Row>
    </Container>
  );
}
