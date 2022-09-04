module.exports = {
  siteMetadata: {
    title: `Reoverlay`,
    description: `The missing solution for managing modals in React.`,
    author: `Hirad Arshadi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-svgr",
  ],
  pathPrefix: "/reoverlay",
}
