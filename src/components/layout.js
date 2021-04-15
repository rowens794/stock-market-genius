/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Header from "./header/header";

export default function Layout({ children }) {
  return (
    <Flex
      sx={{
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <main>{children}</main>
    </Flex>
  );
}
