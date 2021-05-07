const contentful = require("contentful");
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import Layout from "components/layout";
import Content from "../../components/coursePage/Content";
import ContentBody from "../../components/pdfGenerator/contentBody";
import styles from "./pdf.module.css";

export default function IndexPage({ lessons }) {
  let orderedLessons = orderLessons(lessons);
  lessons = lessons.sort((a, b) => {
    return a.fields.contentPosition - b.fields.contentPosition;
  });

  let lessonContent = lessons.map((lesson) => {
    return (
      <div key={lesson.fields.contentPosition} style={{ pageBreakAfter: "always", width: "800px", margin: "auto" }}>
        <ContentBody lesson={lesson} />
      </div>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "90px", pageBreakAfter: "always" }}>
        <Content orderedLessons={orderedLessons} />
      </div>
      <div>{lessonContent}</div>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const client = contentful.createClient({
    space: process.env.ContentfulSpaceID,
    accessToken: process.env.ContentfulToken,
  });

  let lessons = await client.getEntries({
    content_type: "lesson",
  });

  return {
    props: { lessons: lessons.items }, // will be passed to the page component as props
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
  let sortedSections = [];

  sectionkeys.forEach((key) => {
    let section = orderedLessons[key];
    let lessonKeys = Object.keys(orderedLessons[key]).sort((a, b) => a - b);
    let sortedLessons = [];

    lessonKeys.forEach((key2) => {
      sortedLessons.push(section[key2]);
    });

    sortedSections.push(sortedLessons);
  });

  return sortedSections;
};
