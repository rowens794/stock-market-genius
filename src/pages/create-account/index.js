import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import CreateAccount from "../../components/login/createAccount";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Stock Market Genius"
          description="So you want to become a stock market genius? This course teaches children and parents everything they need to know about business and markets so that they can get a head start on financial education."
        />
        <CreateAccount />
      </Layout>
    </ThemeProvider>
  );
}
