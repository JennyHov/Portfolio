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

    .date {
        font-size: 24px;
        font-family: 'Red Hat Display', sans-serif;
        font-weight: 400;
        justify-content: end;
        text-align: right;
        margin-bottom: -7px;
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

    .title-wrapper {
        grid-column: span 2;
        text-align: left;
        margin-bottom: -10px;
    }

    .title-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--green);
        text-decoration: none;
        font-size: 34px;
        font-family: 'Red Hat Display', sans-serif;
        font-weight: 700;
        transition: none;
    }

    .title-link:hover {
        text-decoration: none;
    }

    .title-text {
        font-size: 34px;
        font-family: 'Red Hat Display', sans-serif;
        font-weight: 700;
    }

    .subtitle {
        font-size: 20px;
        font-family: 'Red Hat Display', sans-serif;
        font-weight: 500;
        color: var(--accent-color); /* or a neutral tone */
        margin-top: 0.25rem;
        text-align: left;
    }

    .link-arrow {
        width: 34px;
        height: 36px;
        margin-bottom: -10px;
        fill: var(--green);
        transform: rotate(45deg);
        transition: transform 0.4s ease;
    }

    .title-link:hover .link-arrow {
        transform: rotate(90deg) scale(1.09);
    }
`;

export default sharedGridStyles;