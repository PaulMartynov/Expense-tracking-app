import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar(): JSX.Element {
  return (
    <Nav variant="pills" className="container-fluid">
      <Nav.Item>
        <LinkContainer to="/">
          <Nav.Link>Главная</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/finance">
          <Nav.Link>Доходы/Расходы</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/category">
          <Nav.Link>Категории</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/about">
          <Nav.Link>О проекте</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}
