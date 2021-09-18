import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class NavigationBar extends React.Component<any, any> {
  // eslint-disable-next-line class-methods-use-this
  render(): React.ReactElement {
    return (
      <Nav variant="pills" className="container-fluid">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link>Главная</Nav.Link>
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
}
