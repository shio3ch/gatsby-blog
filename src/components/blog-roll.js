import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import PreviewImage from "./preview-image"

import "./layout.scss"

/**
 * ブログの一覧を表示するコンポーネント。
 */
const BlogRoll = () => {
  const data = useStaticQuery(query)

  return (
    <div className="container">
      <div className="columns">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div className="column is-half">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <PreviewImage
                      imageInfo={{
                        fileName: node.frontmatter.image,
                        alt: "hoge",
                      }}
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content is-small">
                    <div key={node.id}>
                      <Link to={node.fields.slug} className="blog-roll link">
                        <h4 className="title is-4">{node.frontmatter.title}</h4>
                      </Link>
                      <span>{node.frontmatter.date}</span>
                      <p>{node.excerpt}</p>
                    </div>
                    {/* 投稿者 */}
                    <p>Contributor:{node.frontmatter.author}</p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      {node.frontmatter.tags.map(tag => (
                        <a className="level-item" aria-label="reply">
                          <button className="button is-small">{tag}</button>
                        </a>
                      ))}
                    </div>
                  </nav>
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
            author
            image
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default BlogRoll
