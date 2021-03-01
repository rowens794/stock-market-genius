/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Image, Text } from "theme-ui";
import Tabs, { TabPane } from "rc-tabs";
import { rgba } from "polished";
import SectionHeading from "components/section-heading";

const data = [
  {
    id: 1,
    section: "Lesson 1",
    author: "What is a business and why should I care?",
    quote: `In the first lesson we seek to understand exactly what it means to be in business.  Why do companies exist in the first place?  What benefits are bestowed onto the owners of a company?`,
  },
  {
    id: 2,
    section: "Lesson 2",
    author: "How does a stock work?",
    quote: `Making the conceptual leap from understanding a business to understanding the stock of a given business business can be hard.  In lesson 2 we break down exactly what it means to own stock in a company that your child will be immediately familiar with: Disney.`,
  },
  {
    id: 3,
    section: "Lesson 3",
    author: "What is a stock worth?",
    quote: `It's obvious to children that companies should be worth something: Companies own actual stuff after all.  But estimating a value for what a company is worth is not obvious at all.  I this lesson we layout an easy to learn framework for doing exactly that.`,
  },
  {
    id: 4,
    section: "Lesson 4",
    author: "Real world case studies",
    quote: `In the fourth lesson we analyze 3 real world case studies of companies that your child will know and understand: Coca-Cola, Mcdonald's, and Amazon.  We look at how these businesses operate and work through an analysis of each to assign a value to each stock.`,
  },
  {
    id: 5,
    section: "Trading Sim",
    author: "See how investing works in real life",
    quote: `Our custom investing simulator allows your children to get a sense of how investing works in the real world.  The simulator follows 10 companies over a 10 year peoriod.  Over the course of 2 weeks your child research and "invest" in these stocks to grow their portfolio.`,
  },
];

const Testimonials = () => {
  let mobileLessons = data.map((item) => {
    return (
      <Box as="blockquote">
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
