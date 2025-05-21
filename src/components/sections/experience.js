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

const StyledArrow = styled(IconArrow)`
  width: 16px;
  height: 17px;
  transform: rotate(90deg);
  margin-left: 0.5rem;
  color: currentColor;
`;

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { showInExperience: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              date
              present
              title
              subtitle
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

  const resume = {
    frontmatter: {
      title: 'Resume',
      present: false,
      external: '/files/Resume_Jenny_Hovland.pdf',
      tech: [],
    },
    html: '',
  };

  // Sort descending by numeric date (fallback to 0 if no date)
  const experience = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .sort((a, b) => {
      const dateA = Number(a.frontmatter.date) || 0;
      const dateB = Number(b.frontmatter.date) || 0;
      return dateB - dateA; // descending order
    });

  const experienceWithResume = [resume, ...experience];

  const firstSix = experienceWithResume.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? experienceWithResume : firstSix;

  const renderProject = (node) => {
    const { frontmatter, html } = node;
    const { date, present, title, subtitle, tech, github, external } = frontmatter;
    const displayDate = (
      <span className="date-wrapper">
        {date}
        {present && <StyledArrow aria-label="to present" />}
      </span>
    );

    const link = external || github;

    return (
      <div className="row">
        {/* Date */}
        <div className="column date">{displayDate}</div>

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

          {subtitle && <div className="subtitle">{subtitle}</div>}
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
            projectsToShow.map((node, i) => (
              <li key={i}>{renderProject(node)}</li>
            ))
          ) : (
            <TransitionGroup component={null}>
              {projectsToShow.map((node, i) => (
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
