import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "../wrapper";
import GridOverlay from "../gridOverlay";

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

const LetterWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Letter = styled.div`
  position: absolute;
  color: #a4251d;
  font-size: 186.2px;
  font-weight: 700;
  font-family: "Red Hat Display", sans-serif;

  ${(props) =>
    props.x &&
    props.y &&
    `left: ${props.x}px;
     top: ${props.y}px;`}
`;

const VerticalLetterWrapper = styled.div`
  position: absolute;
  right: ${(props) => props.rightPosition || "200px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: end;
`;

const VerticalLetter = styled.div`
  color: #a4251d;
  font-weight: 700;
  font-family: "Red Hat Display", sans-serif;
  font-size: ${(props) => props.fontSize || "200px"};
  margin-bottom: -104px;

  &:first-child {
    margin-top: -59px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #a4251d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2000; 
  &:hover {
    background-color: #861b16;
  }
`;

const LandingPage = () => {
  const [isGridVisible, setIsGridVisible] = useState(false);

  const letterCoordinates = [
    { char: "h", x: -11, y: 367 },
    { char: "o", x: 419, y: 367 },
    { char: "vl", x: 561, y: 367 },
    { char: "a", x: 892, y: 367 },
    { char: "d", x: 1280, y: 367 },
  ];

  const verticalLetters = ["J", "e", "n", "n", "y"];
  const wrapperHeight = 731;
  const letterSpacing = -50;
  const calculatedFontSize = `${(wrapperHeight - letterSpacing * (verticalLetters.length - 1)) / verticalLetters.length}px`;

  return (
    <Wrapper>
      {/* Button to toggle the grid */}
      <ToggleButton onClick={() => setIsGridVisible(!isGridVisible)}>
        {isGridVisible ? 'Hide Grid' : 'Show Grid'}
      </ToggleButton>

      {isGridVisible && (
        <>
          <GridOverlay
            lines={10}
            orientation="vertical"
            color="rgba(16, 16, 16, 1)"
            thickness="1.5px"
            start={28}
            pattern={[240, 46]}
            customPositions={[28]}
          />

          <GridOverlay
            lines={10}
            orientation="horizontal"
            color="rgba(16, 16, 16, 1)"
            thickness="1.5px"
            start={61}
            pattern={[97, 45]}
            customPositions={[28, 763]}
          />
        </>
      )}

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

      <LetterWrapper>
        {letterCoordinates.map((letter, index) => (
          <Letter key={index} x={letter.x} y={letter.y}>
            {letter.char}
          </Letter>
        ))}

        <VerticalLetterWrapper rightPosition="262.5px">
          {verticalLetters.map((letter, index) => (
            <VerticalLetter key={index} fontSize={calculatedFontSize}>
              {letter}
            </VerticalLetter>
          ))}
        </VerticalLetterWrapper>
      </LetterWrapper>
    </Wrapper>
  );
};

export default LandingPage;
