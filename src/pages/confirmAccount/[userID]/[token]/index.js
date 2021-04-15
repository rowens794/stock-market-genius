import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import LoginForm from "components/login/loginForm";
import styles from "./login.module.css";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Stock Market Genius"
          description="So you want to become a stock market genius? This course teaches children and parents everything they need to know about business and markets so that they can get a head start on financial education."
        />
        <LoginForm />
        <p className={styles.accountConfirmed}>Your account is confirmed. Please login.</p>
      </Layout>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  let apiUrl = "http://localhost:3000";
  process.env.NODE_ENV !== "development" ? (apiUrl = process.env.apiUrl) : null;

  let { userID, token } = context.params;

  const res = await fetch(`${apiUrl}/api/user/confirmAccount`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID, token }),
  });

  const json = await res.json();
  return {
    props: json, // will be passed to the page component as props
  };
}
