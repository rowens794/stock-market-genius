const contentful = require("contentful");
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";

import Blog from "../../components/blog";

export default function IndexPage({ posts }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Market Genius Blog" description="Read up on one off investing topics that didn't quite fit into the free course curriculum." />
        <Blog posts={posts} />
      </Layout>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let posts = await client.getEntries({
    content_type: "blogPost",
  });

  return {
    props: { posts: posts.items }, // will be passed to the page component as props
  };
}
