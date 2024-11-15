const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Jenny Hovland', 
    description: 'Jenny Hovland has a bachelors in computer science and an interest in creating fun, accessible, and exceptional websites.',
    siteUrl: 'https://jennyhovland.com', 
    image: '/og-image.png', // Path to your image in the static folder (e.g., 'static/og-image.png')
  },
  plugins: [
    `gatsby-plugin-react-helmet`,  
    `gatsby-plugin-styled-components`,  
    `gatsby-plugin-image`, 
    `gatsby-plugin-sharp`, 
    `gatsby-transformer-sharp`,  
    `gatsby-plugin-sitemap`,  
    `gatsby-plugin-robots-txt`,  
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Jenny Hovland',
        short_name: 'Jenny Hovland', 
        start_url: '/', 
        background_color: '#ffffff', 
        theme_color: '#000000', 
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // Add your logo image in the 'src/images' folder
      },
    },
    `gatsby-plugin-offline`,  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer', // Open external links in a new tab with added security
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: config.colors.green }, // You can customize this if you have a color palette
            },
          },
          {
            resolve: 'gatsby-remark-code-titles',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false, 
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-XXXXXXX-X',  // Replace with your Google Analytics tracking ID
      },
    },
  ],
};
