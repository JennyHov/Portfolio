import React from 'react';
import LandingPage from '../components/sections/landingpage';
import Projects from '../components/sections/projects';
import Experience from '../components/sections/experience';
import About from '../components/sections/about';
import GlobalStyle from '../styles/globalstyle';
import GridOverlay from "../components/gridOverlay";

const App = () => (
  <>
  {/*
   <GridOverlay
        lines={10} // Total number of lines
        orientation="vertical"
        color="rgba(16, 16, 16, 1)"
        thickness="1.5px"
        start={28} // Start position from the left edge
        pattern={[240, 46]} // Pattern: 240px, then 46px
        customPositions={[28]} // Fixed positions for the first two lines
      />

      <GridOverlay
        lines={10} // Total number of horizontal lines
        orientation="horizontal"
        color="rgba(16, 16, 16, 1)"
        thickness="1.5px"
        start={61} // Start position from the top edge
        pattern={[97, 45]} // Pattern for alternating lines (105px, then 52px)
        customPositions={[28, 763]} // Custom horizontal lines at 150px, 400px, and 600px
      />
    */}
    <GlobalStyle />
    <LandingPage />
    <Projects />
    <Experience />
    <About />
  </>
);

export default App;