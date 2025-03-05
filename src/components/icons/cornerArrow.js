import React from 'react';

const IconArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor" /* Use CSS or variables to control the color */
    className="custom-arrow-icon" /* Optional class for styling */
    width="100px" /* Adjust the size */
    height="100px" /* Adjust the size */
    style={{ transform: "rotate(45deg)" }}
  >
    <path d="M17.504 26.025l.001-14.287 6.366 6.367L26 15.979 15.997 5.975 6 15.971 8.129 18.1l6.366-6.368v14.291z" />
  </svg>
);

export default IconArrow;
