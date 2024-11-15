import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  width: 50%;
`;

const NavItem = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 20px;
  letter-spacing: 2px;

  &:hover {
    border-bottom: 2px solid black;
  }
`;

const Navigation = () => (
  <Nav>
    <NavItem href="#about">About</NavItem>
    <NavItem href="#projects">Projects</NavItem>
    <NavItem href="#contact">Contact</NavItem>
  </Nav>
);

export default Navigation;
