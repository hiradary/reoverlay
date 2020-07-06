module.exports = {
  siteMetadata: {
    title: `Reoverlay`,
    description: `A react library for your modals. Show, Organize and Manage like a boss.`,
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
}
