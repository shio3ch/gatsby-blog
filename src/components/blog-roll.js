import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import "./layout.scss"

/**
 * ブログの一覧を表示するコンポーネント。
 */
const BlogRoll = () => {
  const data = useStaticQuery(query)

  return (
    <div className="container">
      <div className="columns is-2">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div className="column">
            <div class="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={node.frontmatter.image} alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <div key={node.id}>
                      <h3>
                        {node.frontmatter.title}{" "}
                        <span>— {node.frontmatter.date}</span>
                      </h3>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default BlogRoll
