import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PreviewImage from "../components/preview-image"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1 className="title is-1">{post.frontmatter.title}</h1>
        <span>投稿日：{post.frontmatter.date}</span>
 
        <PreviewImage 
          imageInfo={{
            fileName: post.frontmatter.image,
            alt: post.frontmatter.title
          }}
        />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        author
        image
        tags
      }
    }
  }
`