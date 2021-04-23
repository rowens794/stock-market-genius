/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Image, Text } from "theme-ui";
import Tabs, { TabPane } from "rc-tabs";
import { rgba } from "polished";
import SectionHeading from "components/section-heading";

const data = [
  {
    id: 1,
    section: "Section 1",
    author: "The Basics of Business",
    quote: `In the first section of the course we seek to understand exactly what it means to be in business.  Why do companies exist in the first place?  What benefits are bestowed onto the owners of a company?`,
  },
  {
    id: 2,
    section: "Section 2",
    author: "Investment Vehicles & Risk Management",
    quote: `In section 2 we dive into the types of investment vehicles that exist (in addition to stocks) so that you have the context you need to see how all of the pieces fit together.`,
  },
  {
    id: 3,
    section: "Section 3",
    author: "Evaluating a Company",
    quote: `In Section 3 we explore methodoligies that you, as an investor, can use to properly generate investment ideas and evaluate companies. We breakdown idea generation, company filings, financial statement & ratio analysis.`,
  },
  {
    id: 4,
    section: "Section 4",
    author: "Company Valuation",
    quote: `One prospective companies have been vetted it's time to establish a position.  In the last section of the course we'll explore how to set price targets for companies, so that you'll know when a great company turns into an attractive investment.`,
  },
  {
    id: 5,
    section: "Trading Sim",
    author: "See how investing works in real life",
    quote: `The investing simulator allows you to get a sense of how investing works in the real world.  It follows 5 companies over a 10 year peoriod.  Every two days for 3 weeks you will recieve real world information about these companies and be asked to make an investment decision to grow your portfolio.`,
  },
];

const Testimonials = () => {
  let mobileLessons = data.map((item) => {
    return (
      <Box as="blockquote" key={item.id}>
        <Text sx={styles.sectionHeading}>{item.section}</Text>
        <Text sx={styles.author}>{item.author}</Text>
        {item.quote}
        <br />
        <br />
      </Box>
    );
  });

  return (
    <div sx={styles.container}>
      <Box
        as="section"
        id="testimonials"
        sx={styles.section}
        sx={{
          "@media screen and (min-width: 652px)": {
            display: "block",
          },
          "@media screen and (max-width: 651px)": {
            display: "none",
          },
        }}
      >
        <Container>
          <div sx={styles.showOnDesktop}>
            <Tabs sx={styles.tabs} animated={{ tabPane: true }} tabPosition="bottom" tabBarGutter={32} moreIcon={""}>
              {data?.map((item) => (
                <TabPane key={item.id} tab={<p>{item.section}</p>}>
                  <Box as="blockquote">
                    <Text sx={styles.sectionHeading}>{item.section}</Text>
                    <Text as="span" sx={styles.author}>
                      {item.author}
                    </Text>
                    {item.quote}
                  </Box>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </Container>
      </Box>
      <Box
        as="section"
        id="testimonials"
        sx={styles.section}
        sx={{
          "@media screen and (min-width: 652px)": {
            display: "none",
            margin: "auto",
          },
          "@media screen and (max-width: 651px)": {
            margin: "auto",
          },
        }}
      >
        <Container sx={styles.mobileContainer}>
          <SectionHeading sx={styles.heading} title="What You'll Learn" description="A lesson by lesson break down of the course." />
          <div sx={styles.showOnDesktop}>{mobileLessons}</div>
        </Container>
      </Box>
    </div>
  );
};

export default Testimonials;

const styles = {
  container: {
    width: "100%",
  },
  section: {
    backgroundColor: rgba("#FFF5ED", 0.5),
    pt: [7, null, null, 9, null, 10, 11],
    pb: [9, null, null, 10, 11],
  },
  tabs: {
    border: 0,
    flexDirection: ["column-reverse", null, null, null, null, "column"],
    ".rc-tabs-nav": {
      mt: [8, null, null, 9, 11],
    },
    ".rc-tabs-nav-wrap": {
      borderTop: `1px solid ${rgba("#01070D", 0.1)}`,
      justifyContent: "center",
    },
    ".rc-tabs-tab": {
      backgroundColor: "transparent",
      // m: ['0 45px'],
    },
    ".rc-tabs-tab-btn": {
      display: "flex",
      alignItems: "center",
      lineHeight: 1,
      outline: 0,
      img: {
        outline: 0,
        maxWidth: [50, 65, null, 110, "80%", "100%"],
        m: ["0 auto"],
      },
    },
    ".rc-tabs-nav-list": {
      flexGrow: 1,
      justifyContent: "space-evenly",
      pt: [4, null, null, 7, 9],
    },
    ".rc-tabs-tabpane": {
      outline: 0,
      blockquote: {
        fontFamily: "heading",
        fontWeight: 400,
        fontSize: [2, null, null, 3, 4, 6],
        lineHeight: [1.87, null, null, 2.08],
        position: "relative",
        maxWidth: 846,
        margin: "0px auto",
        pt: ["12px", null, null, "17px", "13px"],
        pl: [35, 35, 35, 10, 11],
      },
      span: {
        color: "#7E8896",
        fontFamily: "body",
        display: "flex",
        fontWeight: 500,
        fontSize: [0, 1, 1, 2],
        lineHeight: 2.5,
        mt: [1, null, null, 3],
      },
    },
    ".rc-tabs-ink-bar": {
      top: 0,
      height: 2,
      backgroundColor: "#A17857",
      borderRadius: 5,
    },
  },
  sectionHeading: {
    fontFamily: "heading",
    fontWeight: 700,
    fontSize: [2, null, null, 3, 4, 6],
    lineHeight: [1.87, null, null, 2.08],
    color: "black",
  },
  showOnDesktop: {
    visibility: ["none", "none", "inline-block"],
  },
  mobileContainer: {
    paddingTop: "80px",
  },
  author: {
    fontFamily: "body",
    fontWeight: 400,
    fontSize: [2, null, null, 3, 4, 6],
    lineHeight: [1.87, null, null, 2.08],
    color: "#7E8896",
  },
};
