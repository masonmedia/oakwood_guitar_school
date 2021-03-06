exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)

    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: ASC, fields: [id] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: pageTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }