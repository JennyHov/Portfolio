import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import Wrapper from '../wrapper';
import IconArrow from '../icons/cornerArrow';
import sharedGridStyles from '../../styles/sharedGridStyles';

const StyledProjectsSection = styled.section`
  ${sharedGridStyles}
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { showInProjects: { eq: true } } }
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
  const projects = data.allMarkdownRemark.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const renderProject = (node) => {
    const { frontmatter, html } = node;
    const { number, title, tech, github, external } = frontmatter;
  
    const link = external || github; // Decide which link to display
  
    return (
      <div className="row">
        {/* Number */}
        <div className="column number">{number}</div>
  
        {/* Title div */}
        <div className="title-wrapper">            
          {/* Link */}
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="title-link">
              <span className="title-text">{title}</span>
              <IconArrow className="link-arrow"/>
            </a>
          ) : (
            <span className="title-text">{title}</span>
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
      <StyledProjectsSection>
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
      </StyledProjectsSection>
    </Wrapper>
  );
};

export default Projects;
