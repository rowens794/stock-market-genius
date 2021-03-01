import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Banner from "sections/banner";
import AboutTheCourse from "sections/AboutTheCourse";
import CourseComponents from "sections/CourseComponents";
import CourseContent from "sections/CourseContent";
import OtherServices from "sections/other-services";
import WhyUs from "sections/why-us";
import Register from "sections/Register";
import SubscribeUs from "sections/subscribe-us";
import Blog from "sections/blog";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Stock Market Genius"
          description="So you want to become a stock market genius? This course teaches children and parents everything they need to know about business and markets so that they can get a head start on financial education."
        />
        <Banner />
        <AboutTheCourse />
        <CourseComponents />
        <CourseContent />
        <OtherServices />
        <WhyUs />
        <Register />
        {/* <Blog /> */}
        {/* <SubscribeUs /> */}
      </Layout>
    </ThemeProvider>
  );
}
