import styles from "@/styles/Home.module.css";
import { client } from "@/libs/client";
import Link from "next/link";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data);
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({ blog }) {
  return (
    <>
      {blog.map((blog) => (
        <div key={blog.id}>
          <div>
            <div>
              <img src={blog.photo.url} alt={blog.photo.alt} />
            </div>
            <div>
              <p>{new Date(blog.createdAt).toLocaleDateString("ja-JP")}</p>
            </div>
            <div>{blog.tags.name}</div>
            <h1>
              <Link href={`blog/${blog.id}`}>{blog.title}</Link>
            </h1>
          </div>
        </div>
      ))}
    </>
  );
}
