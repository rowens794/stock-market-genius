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
        justifyContent: "space-between",
      }}
    >
      <Header />
      <main>{children}</main>
    </Flex>
  );
}
