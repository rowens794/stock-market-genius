import { useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "analytics";
import "rc-tabs/assets/index.css";
import "swiper/swiper-bundle.min.css";
import "rc-drawer/assets/index.css";

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    //inits google analytics
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);

  return <Component {...pageProps} />;
}
