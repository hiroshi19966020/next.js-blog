import styles from "@/styles/Home.module.css";
import post from "@/styles/post.module.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client } from "@/libs/client";
import { Tag } from "@/components/Tag";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 5;

export default function BlogPageId({ blog, totalCount }) {
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
        <Pagination totalCount={totalCount} />
      </div>
      <Footer></Footer>
    </>
  );
}

export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * 5, limit: 5 },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
