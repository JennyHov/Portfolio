import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "../wrapper";
import GridOverlay from "../gridOverlay"; // Import the GridOverlay component

// Styles for the upper-left text
const UpperLeftText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const SmallText = styled.div`
  font-size: ${(props) => props.size || "18px"};
  font-weight: ${(props) => props.weight || "400"};
  line-height: ${(props) => props.lineHeight || "27px"};
`;

// Wrapper for both horizontal and vertical letters
const LetterWrapper = styled.div`
  width: 100%;
  height: 100%; /* Ensure it takes full height of the wrapper */
  position: relative;
`;

// Horizontal letter styling with absolute positioning
const Letter = styled.div`
  position: absolute;
  color: #a4251d;
  font-size: 186.2px;
  font-weight: 700;
  font-family: "Red Hat Display", sans-serif;

  /* Dynamically apply x and y coordinates */
  ${(props) =>
    props.x &&
    props.y &&
    `left: ${props.x}px;
     top: ${props.y}px;`}
`;

const VerticalLetterWrapper = styled.div`
  position: absolute;
  right: ${(props) => props.rightPosition || "274px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Start from the top */
  align-items: end;
`;

const VerticalLetter = styled.div`
  color: #a4251d;
  font-weight: 700;
  font-family: "Red Hat Display", sans-serif;
  font-size: ${(props) => props.fontSize || "200px"}; /* Dynamically set font size */
  margin-bottom: -104px; /* Apply spacing between letters */
  
  &:first-child {
    margin-top: -60px;
  }

  &:last-child {
    margin-bottom: 0; /* Remove spacing after the last letter */
  }
`;

const LandingPage = () => {
  const [isGridVisible, setIsGridVisible] = useState(false); // State to toggle grid visibility

  // Horizontal letters (you already defined their coordinates)
  const letterCoordinates = [
    { char: "h", x: -11, y: 365 },
    { char: "o", x: 415, y: 365 },
    { char: "vl", x: 570, y: 365 },
    { char: "an", x: 892, y: 365 },
    { char: "d", x: 1275, y: 365 },
  ];

  const verticalLetters = ["J", "e", "n", "n", "y"];
  const wrapperHeight = 731; // Wrapper height in pixels
  const letterSpacing = -50; // Desired spacing between letters
  const calculatedFontSize = `${(wrapperHeight - letterSpacing * (verticalLetters.length - 1)) / verticalLetters.length}px`;

  return (
    <Wrapper>
      {/* Render the grid overlay if isGridVisible is true */}
      {isGridVisible && (
        <GridOverlay
          lines={10}
          orientation="vertical"
          color="rgba(255, 0, 0, 0.5)"
          start={30}
          pattern={[240, 46]}
          thickness="2px"
        />
      )}

      {/* Upper-left text group */}
      <UpperLeftText>
        <SmallText size="20px" weight="500">
          Front-End Developer & Digital Designer
        </SmallText>
        <SmallText>
          Projects
          <br />
          Experience
          <br />
          About
        </SmallText>
      </UpperLeftText>

      {/* Wrapper for horizontal letters */}
      <LetterWrapper>
        {/* Render horizontal letters */}
        {letterCoordinates.map((letter, index) => (
          <Letter
            key={index}
            x={letter.x}
            y={letter.y}
            onMouseEnter={() => setIsGridVisible(true)} // Show grid on hover
            onMouseLeave={() => setIsGridVisible(false)} // Hide grid on hover out
          >
            {letter.char}
          </Letter>
        ))}

        {/* Wrapper for vertical letters */}
        <VerticalLetterWrapper rightPosition="274px">
          {verticalLetters.map((letter, index) => (
            <VerticalLetter
              key={index}
              fontSize={calculatedFontSize}
              onMouseEnter={() => setIsGridVisible(true)} // Show grid on hover
              onMouseLeave={() => setIsGridVisible(false)} // Hide grid on hover out
            >
              {letter}
            </VerticalLetter>
          ))}
        </VerticalLetterWrapper>
      </LetterWrapper>
    </Wrapper>
  );
};

export default LandingPage;
