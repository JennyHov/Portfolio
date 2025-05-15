// components/styles/SharedGridStyles.js
import { css } from 'styled-components';

const sharedGridStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .grid {
    width: 100%;
    margin-top: 171px;
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    row-gap: 47px;
  }

  .row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 47px;
    align-items: end;
    transition: transform 0.3s ease;

    &:nth-child(1), &:nth-child(2) {
      height: 96px;
    }

    &:nth-child(3), &:nth-child(4) {
      height: 95px;
    }
  }

  .column {
    display: flex;
    align-items: flex-end;
    grid-column: span 1;
    height: 95px;
    padding: 0;
    margin: 0;
    color: var(--primary-color);
  }

  .number {
    font-size: 24px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    justify-content: end;
    text-align: right;
    margin-bottom: -7px;
  }

  .title {
    font-size: 34px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    grid-column: span 2;
    margin-bottom: -7px;
    justify-content: start;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 12px;

    a {
      align-self: center;
      color: var(--green);
      text-decoration: none;
      margin-bottom: -17px;

      svg {
        width: 34px;
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

  .description {
    font-size: 16px;
    font-family: 'Red Hat Text', sans-serif;
    font-weight: 400;
    letter-spacing: 0.32px;
    text-align: justify;
    margin-bottom: -21px;
  }

  .tech {
    display: flex;
    align-items: flex-start;
    font-size: 16px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    text-align: left;
    line-height: 24px;
    margin-bottom: -7px;
    flex-direction: column;
    justify-content: end;
  }
`;

export default sharedGridStyles;