import styles from "@/styles/Home.module.css";
import { client } from "@/libs/client";
import Link from "next/link";
import { Header } from "@/components/Header.js";
import { Footer } from "@/components/Footer.js";
import { Pagination } from "@/components/Pagination.js";

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      offset: 0,
      limit: 5,
    },
  });
  console.log(data);
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default function Home({ blog, totalCount }) {
  return (
    <>
      <Header></Header>
      <div className={`${styles.container} ${styles.article}`}>
        <div className={styles.wrapper}>
          {blog.map((blog) => (
            <div key={blog.id} className={styles.article_item}>
              <div className={styles.thubnail}>
                <img src={blog.photo.url} alt={blog.photo.alt} />
              </div>
              <div className={styles.__inner}>
                <div className={styles.day}>
                  <p>{new Date(blog.createdAt).toLocaleDateString("ja-JP")}</p>
                </div>
                <div className={styles.tags}>{blog.tags.name}</div>
                <h3 className={styles.title}>
                  <Link href={`blog/${blog.id}`}>{blog.title}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
        <Pagination totalCount={totalCount}></Pagination>
      </div>
      <Footer></Footer>
    </>
  );
}
