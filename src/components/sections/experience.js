import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import Wrapper from '../wrapper';
import IconArrow from '../icons/cornerArrow'; 
import sharedGridStyles from '../../styles/sharedGridStyles';

const StyledExperiencesSection = styled.section`
  ${sharedGridStyles}
`;

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { showInExperience: { eq: true } } }
        sort: { fields: frontmatter___number, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              number
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const GRID_LIMIT = 6;
  const experience = data.allMarkdownRemark.edges.filter(({ node }) => node);
  const firstSix = experience.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? experience : firstSix;

  const renderProject = (node) => {
    const { frontmatter, html } = node;
    const { number, title, tech, github, external } = frontmatter;
  
    const link = external || github; // Decide which link to display
  
    return (
      <div className="row">
        {/* Number */}
        <div className="column number">{number}</div>
  
        {/* Title */}
        <div className="title">{title}
          {/* Link */}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <IconArrow /> 
            </a>
          )}
        </div>
  
        {/* Description */}
        <div
          className="column description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
  
        {/* Technologies */}
        <div className="column tech">
          {tech && tech.map((item, i) => <div key={i}>{item}</div>)}
        </div>
      </div>
    );
  };
  

  return (
    <Wrapper>
      <StyledExperiencesSection>
        <ul className="grid">
          {prefersReducedMotion ? (
            <>
              {projectsToShow.map(({ node }, i) => (
                <li key={i}>{renderProject(node)}</li>
              ))}
            </>
          ) : (
            <TransitionGroup component={null}>
              {projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i * 100}
                  exit={false}
                >
                  <li>{renderProject(node)}</li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </ul>
      </StyledExperiencesSection>
    </Wrapper>
  );
};

export default Experience;
