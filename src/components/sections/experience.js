import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import Wrapper from '../wrapper';
import IconArrow from '../icons/cornerArrow'; // Import the Arrow icon

const StyledExperiencesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .experience-grid {
    width: 100%;
    margin-top: 171px;
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    row-gap: 47px;
  }

  .experience-row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 47px;
    align-items: end;
    transition: transform 0.3s ease;
  }

  .experience-row:nth-child(1), experience-row:nth-child(2) {
    height: 96px;    
  }

  .experience-row:nth-child(3), .experience-row:nth-child(4) {
    height: 95px;
    }

  .experience-number,
  .experience-title,
  .experience-description,
  .experience-tech,
  .experience-links {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 239px;
    height: 95px;
    padding: 0px;
    margin: 0px;
  }

  .experience-number,
  .experience-tech {
    display: flex;
    justify-content: end;
  }

  .experience-title,
  .experience-description,
  .experience-tech {
    color: var(--primary-color);
  }

  .experience-number {
    font-size: 24px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    text-align: right;
    color: var(--accent-color);
    width: 239px;
    margin-bottom: -7px;
  }

  .experience-title {
    font-size: 24px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    width: 239px;
    margin-bottom: -7px;
    justify-content: end;
  }

  .experience-description {
    font-size: 16px;
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 400;
    letter-spacing: 0.32px;
    text-align: justify;
    width: 239px;
    margin-bottom: -21px;
  }

  .experience-tech {
    font-size: 16px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: -7px;
    flex-direction: column;
  }

  .experience-links {
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

  .experience-links:nth-child(1), .experience-links:nth-child(2) {
    margin-bottom: -9px;
  }
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
      <div className="experience-row">
        {/* Number */}
        <div className="experience-number">{number}</div>
  
        {/* Title */}
        <div className="experience-title">{title}</div>
  
        {/* Link */}
        <div className="experience-links">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <IconArrow /> {/* Use the Arrow icon */}
            </a>
          )}
        </div>
  
        {/* Description */}
        <div
          className="experience-description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
  
        {/* Technologies */}
        <div className="experience-tech">
          {tech && tech.map((item, i) => <div key={i}>{item}</div>)}
        </div>
      </div>
    );
  };
  

  return (
    <Wrapper>
      <StyledExperiencesSection>
        <ul className="experience-grid">
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
