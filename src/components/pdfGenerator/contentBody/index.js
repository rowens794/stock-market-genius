import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { INLINES } from "@contentful/rich-text-types";

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
      <LessonCheckBox />

      <p className={styles.lessonIndicator}>
        Course Section {lesson.fields.sectionNumber} - Lesson {lesson.fields.lessonNumber}
      </p>

      <div style={{ marginTop: "100px" }}></div>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
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

  //adjust max width for really wide & short images
  let imgWidth = data.file.details.image.width;
  let imgHeight = data.file.details.image.height;
  if (imgWidth / imgHeight > 3) maxWidth = 700;

  if (windowSize.width && windowSize.width > 550) {
    let scaleFactor = data.file.details.image.width / maxWidth;
    picWidth = Math.round(maxWidth);
    picHeight = Math.round(data.file.details.image.height / scaleFactor);
  } else if (windowSize.width) {
    let targetWidth = windowSize.width * 0.9;
    let scaleFactor = data.file.details.image.width / targetWidth;
    picWidth = Math.round(targetWidth);
    picHeight = Math.round(data.file.details.image.height / scaleFactor);
  }

  return (
    <>
      {picWidth && picHeight ? (
        <div className={styles.imageContainer}>
          <img src={`https:${data.file.url}?w=${picWidth}&h=${picHeight}`} alt="" width={picWidth} height={picHeight} />
          <div style={{ width: picWidth, margin: "auto", textAlign: "right" }}>
            <a href={`https:${data.file.url}`} className={styles.linkFullSize} target="blank">
              link to full size image
            </a>
          </div>
        </div>
      ) : null}
    </>
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

const LessonCheckBox = () => {
  return (
    <div className={styles.checkbox}>
      <div>
        <p style={{ margin: "0px" }}>
          <span className={styles.characteristic}>Ease of Understanding</span>
          <span className={styles.number}>1</span>
          <span className={styles.number}>2</span>
          <span className={styles.number}>3</span>
          <span className={styles.number}>4</span>
          <span className={styles.number}>5</span>
        </p>

        <p style={{ margin: "0px" }}>
          <span className={styles.characteristic}>Interesting Content</span>
          <span className={styles.number}>1</span>
          <span className={styles.number}>2</span>
          <span className={styles.number}>3</span>
          <span className={styles.number}>4</span>
          <span className={styles.number}>5</span>
        </p>

        <p style={{ margin: "0px" }}>
          <span className={styles.characteristic}>Furthers Understanding</span>
          <span className={styles.number}>1</span>
          <span className={styles.number}>2</span>
          <span className={styles.number}>3</span>
          <span className={styles.number}>4</span>
          <span className={styles.number}>5</span>
        </p>
      </div>
    </div>
  );
};
