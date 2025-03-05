import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import Wrapper from '../wrapper';
import IconArrow from '../icons/cornerArrow'; // Import the Arrow icon

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .projects-grid {
    width: 100%;
    margin-top: 171px;
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    row-gap: 47px;
  }

  .project-row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 47px;
    align-items: end;
    transition: transform 0.3s ease;
  }

  .project-row:nth-child(1), project-row:nth-child(2) {
    height: 96px;    
  }

  .project-row:nth-child(3), .project-row:nth-child(4) {
    height: 95px;
    }

  .project-number,
  .project-title,
  .project-description,
  .project-tech,
  .project-links {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 239px;
    height: 95px;
    padding: 0px;
    margin: 0px;
  }

  .project-number,
  .project-tech {
    display: flex;
    justify-content: end;
  }

  .project-title,
  .project-description,
  .project-tech {
    color: var(--primary-color);
  }

  .project-number {
    font-size: 24px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    text-align: right;
    color: var(--accent-color);
    width: 239px;
    margin-bottom: -7px;
  }

  .project-title {
    font-size: 24px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    width: 239px;
    margin-bottom: -7px;
    justify-content: end;
  }

  .project-description {
    font-size: 16px;
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 400;
    letter-spacing: 0.32px;
    text-align: justify;
    width: 239px;
    margin-bottom: -21px;
  }

  .project-tech {
    font-size: 16px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: -7px;
    flex-direction: column;
  }

  .project-links {
    display: flex;
    justify-content: flex-start;
    align-items: end;
    gap: 10px;
    width: 240px;
    margin-bottom: -9px;

    a {
        display: flex; /* Align the icon properly */
        align-items: center;
        color: var(--green);
        text-decoration: none;

        svg {
        width: 36px; /* Adjust size */
        height: 36px;
        fill: var(--green);
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.1);
        }
        }

        &:hover {
        text-decoration: none;
        }
    }
    }
  }

  .project-links:nth-child(1), .project-links:nth-child(2) {
    margin-bottom: -9px;
  }
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
      <div className="project-row">
        {/* Number */}
        <div className="project-number">{number}</div>
  
        {/* Title */}
        <div className="project-title">{title}</div>
  
        {/* Link */}
        <div className="project-links">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <IconArrow /> {/* Use the Arrow icon */}
            </a>
          )}
        </div>
  
        {/* Description */}
        <div
          className="project-description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
  
        {/* Technologies */}
        <div className="project-tech">
          {tech && tech.map((item, i) => <div key={i}>{item}</div>)}
        </div>
      </div>
    );
  };
  

  return (
    <Wrapper>
      <StyledProjectsSection>
        <ul className="projects-grid">
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
