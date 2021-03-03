/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import { rgba } from "polished";
import SectionHeading from "components/section-heading";
import Service from "components/cards/service";
import icon1 from "assets/images/icons/service1.png";
import icon2 from "assets/images/icons/service2.png";
import icon3 from "assets/images/icons/service3.png";

const data = [
  {
    id: 1,
    icon: icon1,
    title: "What Drives a Business",
    description: `Learn the basics of business and how businesses create value for their customers.`,
  },
  {
    id: 2,
    icon: icon2,
    title: "Why do Stocks Prices Move",
    description: `Understand why stock prices change day to day and how to spot opportunities in the market.`,
  },
  {
    id: 3,
    icon: icon3,
    title: "Invest For Yourself",
    description: `Dive into the trading simulation to see exactly how it feels to be an investor with skin in the game.`,
  },
];

const Services = () => {
  return (
    <Box as="section" id="about-course" sx={styles.section}>
      <Container>
        <SectionHeading sx={styles.heading} title="About the Course" description="Learn about investing in stocks without needing an MBA." />
        <Box sx={styles.contentWrapper}>
          {data?.map((item) => (
            <Service key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

const styles = {
  section: {
    backgroundColor: rgba("#FFF5ED", 0.5),
    pt: [11, 11, 11, 12, 12, 12, 14],
    pb: [7, 7, 7, 9, 9, 10, 11],
  },
  heading: {
    maxWidth: [null, null, null, 455, 660],
    mb: [6, null, null, 8, null, 9, 13],
  },
  contentWrapper: {
    gap: 30,
    display: "grid",
    justifyContent: ["center", null, null, "unset"],
    gridTemplateColumns: ["repeat(1, 285px)", "repeat(1, 325px)", "repeat(1, 285px)", "repeat(3, 1fr)"],
  },
};
