import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar(): JSX.Element {
  return (
    <Nav variant="pills" className="container-fluid" data-testid={"nav-bar"}>
      <Nav.Item data-testid={"nav-bar-main"}>
        <LinkContainer to="/">
          <Nav.Link>Главная</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item data-testid={"nav-bar-finance"}>
        <LinkContainer to="/finance">
          <Nav.Link>Расходы/Зачисления</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item data-testid={"nav-bar-category"}>
        <LinkContainer to="/category">
          <Nav.Link>Категории</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item data-testid={"nav-bar-about"}>
        <LinkContainer to="/about">
          <Nav.Link>О проекте</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}
