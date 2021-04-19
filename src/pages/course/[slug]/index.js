import React, { useState, useEffect } from "react";
const contentful = require("contentful");

import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import ContentBody from "../../../components/lessonPage/contentBody";
import CourseOutline from "../../../components/lessonPage/outline";
import Materials from "../../../components/lessonPage/materials";
import Posts from "../../../components/blog/Posts";
import Video from "../../../components/lessonPage/videoComponent";
import NavBar from "../../../components/lessonPage/lessonNavBar";
import SubNav from "../../../components/lessonPage/subNav";

export default function IndexPage({ lessons, lesson, lessonID, posts }) {
  let [navSelection, setNavSelection] = useState("content");
  let { sortedSections, rawSort } = orderLessons(lessons);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Lesson Name" description="A discription of the current lesson." />
        <div style={{ marginTop: "90px" }} />
        <Video videoID={lesson.fields.youtubeVideoId} />
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <NavBar navSelection={navSelection} setNavSelection={setNavSelection} />
          <SubNav rawSort={rawSort} lessonID={lessonID} />
          {navSelection === "content" ? <ContentBody lesson={lesson} /> : null}
          {navSelection === "materials" ? <Materials lesson={lesson} /> : null}
          {navSelection === "outline" ? <CourseOutline orderedLessons={sortedSections} setNavSelection={setNavSelection} /> : null}
          {navSelection === "blog" ? <Posts posts={posts.items} /> : null}
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export async function getStaticPaths() {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let lessons = await client.getEntries({ content_type: "lesson" });

  let slugs = lessons.items.map((lesson) => {
    return { params: { slug: lesson.fields.slug } };
  });

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let lessons = await client.getEntries({ content_type: "lesson" });
  let targetLesson = null;
  lessons.items.forEach((lesson) => {
    if (lesson.fields.slug === params.slug) {
      targetLesson = lesson;
    }
  });

  let posts = await client.getEntries({
    content_type: "blogPost",
  });

  return {
    props: {
      lessons: lessons.items,
      lesson: targetLesson,
      lessonID: targetLesson.sys.id,
      posts,
    }, // will be passed to the page component as props
  };
}

//takes in a list of all lessons and returns an ordered object of lessons
const orderLessons = (lessons) => {
  let orderedLessons = {};

  lessons.forEach((lesson) => {
    let { sectionNumber, lessonNumber, youtubeVideoId, slug, title, sectionName } = lesson.fields;
    let id = lesson.sys.id;
    let lessonID = `l${sectionNumber}${lessonNumber}`;

    if (orderedLessons[sectionNumber]) orderedLessons[sectionNumber][lessonNumber] = { youtubeVideoId, slug, title, id, sectionName, lessonID };
    if (!orderedLessons[sectionNumber])
      orderedLessons[sectionNumber] = { [lessonNumber]: { youtubeVideoId, slug, title, id, sectionName, lessonID } };
  });

  let sectionkeys = Object.keys(orderedLessons).sort((a, b) => a - b);
  let rawSort = [];
  let sortedSections = [];

  sectionkeys.forEach((key) => {
    let section = orderedLessons[key];
    let lessonKeys = Object.keys(orderedLessons[key]).sort((a, b) => a - b);
    let sortedLessons = [];

    lessonKeys.forEach((key2) => {
      sortedLessons.push(section[key2]);
      rawSort.push(section[key2]);
    });

    sortedSections.push(sortedLessons);
  });

  return { sortedSections, rawSort };
};
