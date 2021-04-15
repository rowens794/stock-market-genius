/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useEffect } from "react";
import { jsx, Box, Container, Button } from "theme-ui";
import Sticky from "react-stickynode";
import Link from "next/link";

import Logo from "components/logo";
import { NavLink } from "components/link";
import { userContext } from "../../contexts/user";
import { DrawerProvider } from "contexts/drawer/drawer-provider";
import NavbarDrawer from "./navbar-drawer";

export default function Header() {
  const [user, setUser] = useContext(userContext);

  useEffect(() => {
    const tryLogin = async () => {
      const res = await fetch(`/api/user/verifyjwt`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("mg-token"),
        }),
      });

      const json = await res.json();

      if (json.loggedIn === true) {
        let tempUser = { ...user };
        tempUser.loggedIn = true;
        tempUser.lessonState = json.userState.courseStatus;
        tempUser.userID = json.userState.userID;

        setUser(tempUser);
      }
    };

    if (user.loggedIn === false) {
      let jwt = window.localStorage.getItem("mg-token");
      if (jwt) {
        tryLogin();
      }
    }
  }, []);

  return (
    <DrawerProvider>
      <Box sx={styles.headerWrapper}>
        <Sticky enabled={true} top={0} activeClass="is-sticky" innerZ={100}>
          <Box as="header" sx={styles.header}>
            <Container>
              <Box sx={styles.headerInner}>
                <Logo sx={styles.logo} />

                <Box as="nav" sx={styles.navbar} className="navbar">
                  <Box as="ul" sx={styles.navList}>
                    <Link href="/course">
                      <a sx={styles.link}>Course</a>
                    </Link>
                  </Box>

                  <Box as="ul" sx={styles.navList}>
                    <Link href="/blog">
                      <a sx={styles.link}>Blog</a>
                    </Link>
                  </Box>

                  {!user.loggedIn ? (
                    <>
                      <Box as="ul" sx={styles.navList}>
                        <Link href="/create-account">
                          <a sx={styles.link}>Register</a>
                        </Link>
                      </Box>

                      <Box as="ul" sx={styles.navList}>
                        <Link href="/login">
                          <a sx={styles.link}>Login</a>
                        </Link>
                      </Box>
                    </>
                  ) : null}

                  {user.loggedIn ? (
                    <>
                      <Box as="ul" sx={styles.navList}>
                        <p sx={styles.link} onClick={() => user.logout(user, setUser)}>
                          Logout
                        </p>
                      </Box>
                    </>
                  ) : null}
                </Box>

                <NavbarDrawer />
              </Box>
            </Container>
          </Box>
        </Sticky>
      </Box>
    </DrawerProvider>
  );
}

const styles = {
  headerWrapper: {
    backgroundColor: "transparent",
    ".is-sticky": {
      header: {
        backgroundColor: "white",
        boxShadow: "0 6px 13px rgba(38,78,118,0.1)",
        paddingTop: "15px",
        paddingBottom: "15px",
      },
    },
  },
  header: {
    position: "fixed",
    left: 0,
    right: 0,
    py: 4,
    transition: "all 0.3s ease-in-out 0s",
    "&.is-mobile-menu": {
      backgroundColor: "white",
    },
  },
  headerInner: {
    display: "flex",
    alignItems: "right",
    justifyContent: "space-between",
  },
  logo: {
    mr: [null, null, null, null, 6, 12],
  },
  navbar: {
    display: ["none", null, null, null, "flex"],
    alignItems: "end",
    width: "100%",
    justifyContent: "flex-end",

    // flexGrow: 1,
    // justifyContent: 'center',
  },
  navList: {
    display: ["flex"],
    listStyle: "none",
    // marginLeft: 'auto',
    // flexGrow: 1,

    p: 0,
    "li:last-child": {
      ml: ["auto"],
    },
    ".nav-item": {
      cursor: "pointer",
      fontWeight: 400,
      padding: 0,
      margin: [0, 0, 0, 0, "0 20px"],
    },
    ".active": {
      color: "primary",
    },
  },
  getStartedDesktop: {
    color: "primary",
    display: ["none", "none", "none", "none", "flex"],
  },
  getStartedMobile: {
    color: "primary",
    fontSize: [1],
    minHeight: 30,
    m: ["0 15px 0 auto"],
    padding: "0 11px",
    display: ["flex", null, null, null, "none"],
  },
  closeButton: {
    height: "32px",
    padding: "4px",
    minHeight: "auto",
    width: "32px",
    ml: "3px",
    path: {
      stroke: "text",
    },
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    margin: "1rem",
  },
};
