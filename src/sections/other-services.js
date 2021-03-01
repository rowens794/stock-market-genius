/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import SectionHeading from "components/section-heading";
import Service from "components/cards/service";
import icon4 from "assets/images/icons/service4.png";
import icon5 from "assets/images/icons/service5.png";
import icon6 from "assets/images/icons/service6.png";
import icon7 from "assets/images/icons/service7.png";
import icon8 from "assets/images/icons/service8.png";
import icon9 from "assets/images/icons/service9.png";

const data = [
  {
    id: 1,
    icon: icon4,
    title: "Qualitative Business Analysis",
    description: `Develop a sense of how a business makes money and how consistent its cash flows will be.`,
  },
  {
    id: 2,
    icon: icon5,
    title: "Financial Statement Analysis",
    description: `Understand what the major financial statements are and how they are used to inform decision making.`,
  },
  {
    id: 3,
    icon: icon6,
    title: "Business Valuation",
    description: `Estimate the value of a business with the intent of converting that valuation into an investment decision.`,
  },
];

const OtherServices = () => {
  return (
    <Box as="section" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="What Skills will be Learned"
          description="Over the course of the curriculum your child will learn:"
        />
        <Box sx={styles.contentWrapper}>
          {data?.map((item) => (
            <Service key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
export default OtherServices;

const styles = {
  section: {
    backgroundColor: "#F9FAFC",
    pt: [9, 9, 9, 11],
    pb: [9, 9, 9, 12, 12, 14],
  },
  heading: {
    mb: [6, null, null, 8, 9, null, 13],
    p: {
      maxWidth: 500,
      margin: "10px auto 0",
    },
  },
  contentWrapper: {
    gap: ["30px 30px", "30px 30px", "30px 30px", "80px 30px"],
    display: "grid",
    justifyContent: ["center", "center", "center", "unset"],
    gridTemplateColumns: ["repeat(1, 285px)", "repeat(1, 325px)", "repeat(1, 285px)", "repeat(3, 1fr)"],
  },
};
