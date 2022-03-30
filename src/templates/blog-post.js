import * as React from "react"
import * as cheerio from "cheerio";
import { withPrefix } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const postSlugWithUnderscores = post.fields.slug.replaceAll("/", "").replaceAll("-", "_");

  const getUpdatedHtml = (html) => {
    const htmlStr = `<div>${html.trim()}</div>`;
    const $ = cheerio.load(htmlStr, null, false);

    // remove the <hr> which is always the first element
    $(".footnotes > hr").each((i, hr) => {
      $(hr).remove();
    })

    // Adds a "Footnotes" title to footnotes container
    $(".footnotes > ol").before("<h2>Footnotes:</h2>");

    // changes the innerText of backref links inside footnotes to " ^"
    $(".footnotes > ol > li .footnote-backref").each((i, backref) => {
      $(backref).text(" ^");
    });

    return $.html();
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          {post.frontmatter.cover && (
            <img
              style={{ maxWidth: "100%", marginBottom: "16px" }}
              src={withPrefix("/covers/" + post.frontmatter.cover)}
              alt="Cover"
            />
          )}
          <p className="blog-date">{post.frontmatter.date}</p>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          {post.frontmatter.author && (
            <p style={{
              fontSize: "16px",
              fontWeight: "normal",
              margin: "-16px 0px 32px",
              color: "#222",
            }}>By {post.frontmatter.author}</p>
          )}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: getUpdatedHtml(post.html) }}
          itemProp="articleBody"
        />
        <div id={`last_section_${postSlugWithUnderscores}`} />
        <footer>
          <Bio discordButtonId={`discord_${postSlugWithUnderscores}`} />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate
