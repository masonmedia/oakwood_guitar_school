import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
        </header>
      )}
    />
  )
}