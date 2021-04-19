import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { INLINES } from "@contentful/rich-text-types";

import MarkComplete from "../markComplete";
import styles from "./content.module.css";

export default function index({ lesson }) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let title = lesson.fields.title;
  let content = lesson.fields.contentBody;

  const options = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => blueBoxHtmlString(node.data.target.fields),
      ["embedded-asset-block"]: (node) => imageHtmlString(node.data.target.fields, windowSize),
    },
  };

  let renderedHtml = documentToHtmlString(content, options);
  renderedHtml = renderedHtml.replace(/<p>/g, `<p style=margin-top:.5rem;margin-bottom:1.5rem>`);
  renderedHtml = renderedHtml.replace(/<h2>/g, `<h2 style=margin-top:3rem;margin-bottom:.5rem>`);
  renderedHtml = renderedHtml.replace(/<h3>/g, `<h3 style=margin-top:3rem;margin-bottom:.5rem>`);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{title}</h1>
      <p className={styles.lessonIndicator}>
        Course Section {lesson.fields.sectionNumber} - Lesson {lesson.fields.lessonNumber}
      </p>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      <MarkComplete lesson={lesson} />
    </div>
  );
}

const imageHtmlString = (data, windowSize) => {
  let jsx = <ImageContainer data={data} windowSize={windowSize} />;
  let htmlString = ReactDOMServer.renderToStaticMarkup(jsx);
  return htmlString;
};

const ImageContainer = ({ data, windowSize }) => {
  let maxWidth = 500;
  let picWidth = 0;
  let picHeight = 0;

  if (windowSize.width && windowSize.width > 550) {
    let scaleFactor = data.file.details.image.width / maxWidth;
    picWidth = maxWidth;
    picHeight = data.file.details.image.height / scaleFactor;
  } else if (windowSize.width) {
    let targetWidth = windowSize.width * 0.9;
    let scaleFactor = data.file.details.image.width / targetWidth;
    picWidth = targetWidth;
    picHeight = data.file.details.image.height / scaleFactor;
  }

  return (
    <div className={styles.imageContainer}>
      <img src={`https:${data.file.url}`} alt="" width={picWidth} height={picHeight} />
    </div>
  );
};

const blueBoxHtmlString = (data) => {
  let jsx = <BlueBox data={data} />;
  let htmlString = ReactDOMServer.renderToStaticMarkup(jsx);
  return htmlString;
};

const BlueBox = ({ data }) => {
  let content = documentToHtmlString(data.body);
  return (
    <div className={styles.bbContainer}>
      <div className={styles.blueBox}>
        <div className={styles.bbTitle}>{data.title}</div>
        <div dangerouslySetInnerHTML={{ __html: content }} className={styles.bbText} />
      </div>
    </div>
  );
};
