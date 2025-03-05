import React from "react";
import styled from "styled-components";

const GridWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Allows interaction with elements below */
  z-index: 1000; 
`;

const Line = styled.div`
  position: absolute;
  background-color: ${({ color }) => color || "rgba(255, 0, 0, 0.5)"};
  pointer-events: none; /* Ensures child elements don't block interactions */
  ${({ orientation, position, thickness }) =>
    orientation === "vertical"
      ? `width: ${thickness || '1px'}; height: 100%; left: ${position}px;`
      : `height: ${thickness || '1px'}; width: 100%; top: ${position}px;`}
`;

const GridOverlay = ({
  lines,    
  orientation,
  color,
  start,
  pattern,
  customPositions, 
  thickness = '2px',
}) => {
  // Generate lines based on pattern and custom positions
  const generateLines = () => {
    const positions = [start]; 
    let currentPosition = start;

    let patternIndex = 0;
    for (let i = 1; i < lines; i++) { 
      currentPosition += pattern[patternIndex % pattern.length];
      positions.push(currentPosition);
      patternIndex++;
    }

    return positions;
  };

  const linePositions = generateLines();

  if (customPositions && customPositions.length > 0 && orientation === "horizontal") {
    customPositions.forEach((position) => {
      linePositions.push(position); 
    });
  }

  return (
    <GridWrapper>
      {linePositions.map((position, index) => (
        <Line
          key={index}
          orientation={orientation}
          position={position}
          color={color}
          thickness={thickness}
        />
      ))}
    </GridWrapper>
  );
};

export default GridOverlay;
