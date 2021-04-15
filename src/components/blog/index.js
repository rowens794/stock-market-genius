const contentful = require("contentful");
import Image from "next/image";

import Posts from "./Posts";
import styles from "./blog.module.css";

export default function IndexPage({ posts }) {
  return (
    <div className={styles.body}>
      <h2 className={styles.header}>Blog - Thoughts that I hope will help you on your journey.</h2>
      <Posts posts={posts} />
    </div>
  );
}

const Hero = ({ heroData }) => {
  return (
    <div>
      <Image src={`https:${heroData.fields.file.url}`} alt={heroData.fields.title} width={320} height={180} />
    </div>
  );
};
