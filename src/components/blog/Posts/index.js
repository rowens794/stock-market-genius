import Link from "next/link";
import dayjs from "dayjs";

import styles from "../blog.module.css";

export default function index({ posts }) {
  let list = posts.map((post) => {
    return (
      <div className={styles.postContainer} key={post.sys.id}>
        <Link href={`/blog/${post.fields.slug}`}>
          <a className={styles.title}>{post.fields.title}</a>
        </Link>
        <p className={styles.date}>{dayjs(post.fields.date).format("M/D/YY")}</p>
        <p className={styles.excerpt}>{post.fields.excerpt}</p>
      </div>
    );
  });

  return (
    <div>
      <p></p>
      {list}
    </div>
  );
}
