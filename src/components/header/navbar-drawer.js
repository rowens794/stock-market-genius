/** @jsxRuntime classic */
/** @jsx jsx */
import { IoMdMenu } from "react-icons/io";
import React, { useContext } from "react";
import Link from "next/link";

import { jsx, Box, Image } from "theme-ui";
import { Link as RSLink } from "react-scroll";
import { DrawerContext } from "contexts/drawer/drawer-context";
import { userContext } from "../../contexts/user";
import Drawer from "components/drawer";
import Logo from "components/logo";
import menuItems from "./header.data";
import close from "assets/images/icons/close.png";

const DrawerNav = () => {
  const { state, dispatch } = useContext(DrawerContext);
  const [user, setUser] = useContext(userContext);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE",
    });
  }, [dispatch]);

  return (
    <Drawer
      width="340px"
      placement="right"
      drawerHandler={
        <Box sx={styles.handler}>
          <IoMdMenu size="26px" />
        </Box>
      }
      open={state?.isOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <button sx={styles.closeButton}>
          <Image src={close} alt="close" />
        </button>
      }
      maskStyle={styles.mask}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
    >
      <Box sx={styles.wrapper}>
        <Logo sx={styles.logo} />
        <Box as="ul" sx={styles.navbar}>
          {/* {menuItems.map(({ path, label }, i) => (
            <Box as="li" key={i}>
              <RSLink activeClass="active" to={path} spy={true} smooth={true} offset={-70} duration={500} onClick={toggleHandler}>
                {label}
              </RSLink>
            </Box>
          ))} */}

          {!user.loggedIn ? (
            <>
              <Box as="li">
                <Link href="/course">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Course
                  </a>
                </Link>
              </Box>

              <Box as="li">
                <Link href="/blog">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Blog
                  </a>
                </Link>
              </Box>

              <Box as="li">
                <Link href="/create-account">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Register
                  </a>
                </Link>
              </Box>

              <Box as="li">
                <Link href="/login">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Login
                  </a>
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Box as="li">
                <Link href="/course">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Course
                  </a>
                </Link>
              </Box>
              <Box as="li">
                <Link href="/blog">
                  <a sx={styles.link} onClick={toggleHandler}>
                    Blog
                  </a>
                </Link>
              </Box>
              <Box as="li">
                <p sx={styles.link} onClick={() => user.logout(user, setUser)} style={{ paddingLeft: "30px", margin: "10px 0", cursor: "pointer" }}>
                  Logout
                </p>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
export default DrawerNav;

const styles = {
  handler: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    width: "26px",
    cursor: "pointer",
    "@media screen and (min-width: 1024px)": {
      display: "none",
    },
  },
  drawer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    outline: 0,
  },
  mask: {
    opacity: 0.2,
  },
  close: {
    position: "absolute",
    top: 35,
    right: 30,
    zIndex: "1",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    border: 0,
    cursor: "pointer",
    display: "flex",
    p: 0,
  },
  wrapper: {
    height: "100%",
    paddingTop: 30,
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
  logo: {
    ml: 30,
    mb: 45,
  },
  navbar: {
    listStyle: "none",
    m: 0,
    p: 0,
    "li > a": {
      backgroundColor: "transparent",
      color: "heading",
      display: "flex",
      alignItems: "center",
      minHeight: 44,
      paddingLeft: 30,
      position: "relative",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out 0s",
      "::before": {
        backgroundColor: "transparent",
        content: `''`,
        position: "absolute",
        height: "100%",
        left: 0,
        top: 0,
        width: 2,
        transition: "all 0.3s ease-in-out 0s",
      },
    },
    ".active": {
      backgroundColor: "#F8F8F8",
      cursor: "pointer",
      "::before": {
        backgroundColor: "primary",
      },
    },
  },
};
