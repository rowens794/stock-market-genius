import React from "react";
import Image from "next/image";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import styles from "./post.module.css";

export default function index({ post }) {
  let postData = post.items[0].fields;
  let renderedHtml = documentToHtmlString(postData.content);

  return (
    <div className={styles.container}>
      <Image width={800} height={800 / (16 / 9)} src={`https:${postData.heroImage.fields.file.url}`}></Image>

      <h1 className={styles.heading}>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
    </div>
  );
}
