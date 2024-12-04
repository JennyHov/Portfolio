import "./src/styles/global.css";
import React from "react";
import { Helmet } from "react-helmet";
import GridOverlay from "./src/components/gridOverlay";

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {element}
      <GridOverlay />
    </>
  );
};