const contentful = require("contentful");
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Heading from "../../components/coursePage/Heading";
import Content from "../../components/coursePage/Content";

export default function IndexPage({ lessons }) {
  let orderedLessons = orderLessons(lessons);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Begin Your Training!"
          description="This page displays the entire course curriculum.  From here you can see all of the subjects we will be studying and if you are registered - you can keep track of your progress."
        />
        <br />
        <Heading />
        <Content orderedLessons={orderedLessons} />
      </Layout>
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
