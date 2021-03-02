/** @jsxRuntime classic */
/** @jsx jsx */
import Image from "next/image";
import { jsx } from "theme-ui";
import { Link } from "components/link";
import logoImg from "../assets/images/logoT.png";

export default function Logo({ isSticky, footer, ...props }) {
  return (
    <Link path="/" sx={styles.logo} {...props}>
      <Image width={130} height={50} src={logoImg}></Image>
    </Link>
  );
}
const styles = {
  logo: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    svg: {
      height: "auto",
      width: [128, null, "100%"],
    },
  },
};
