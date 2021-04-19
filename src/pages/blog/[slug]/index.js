import React, { useState } from "react";
const contentful = require("contentful");
import Head from "next/head";

import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Post from "../../../components/post";

export default function IndexPage({ post }) {
  let postData = post.items[0].fields;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href={`https://beastockmarketgenius.com/blog/${postData.slug}`} />
      </Head>
      <Layout>
        <SEO title={postData.title} description={postData.excerpt} />
        <div style={{ marginTop: "90px" }} />
        <Post post={post} />
      </Layout>
    </ThemeProvider>
  );
}

export async function getStaticPaths() {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let posts = await client.getEntries({ content_type: "blogPost" });

  let postSlugs = posts.items.map((post) => {
    return { params: { slug: post.fields.slug } };
  });

  return {
    paths: postSlugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let post = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });

  return {
    props: {
      post,
    },
  };
}
