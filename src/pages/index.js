import React from "react";
import styled from "styled-components";
import Navigation from "../components/navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`;

const Title = styled.h1`
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: -4px;
  margin: 0;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack subtitle and text blocks vertically */
  justify-content: flex-start;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  letter-spacing: 1px;
`;

const TextBlock = styled.p`
  font-size: 1rem;
  max-width: 300px;
  line-height: 1.6;
`;

const IndexPage = () => (
  <Wrapper>
    <TitleWrapper>
      <Title>Jenny Hovland</Title>
    </TitleWrapper>

    <SubtitleWrapper>
      {/* Developer text block */}
      <TextBlock>
        As a developer, I focus on clean, efficient code, constantly refining my skills to stay ahead of new technologies. I believe that a great website is not just about aesthetics — it’s about creating seamless, interactive experiences that users enjoy and engage with.
      </TextBlock>

      {/* Subtitle */}
      <Subtitle>Developer & Digital Designer</Subtitle>

      {/* Designer text block */}
      <TextBlock>
        As a designer, I draw inspiration from modern design principles, balancing simplicity with creativity to craft visually compelling layouts. I'm always striving to make websites more fun, dynamic, and, most importantly, more interesting for users.
      </TextBlock>
    </SubtitleWrapper>
  </Wrapper>
);

export default IndexPage;
