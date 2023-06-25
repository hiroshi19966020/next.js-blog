import Link from "next/link";
import post from "@/styles/post.module.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client } from "@/libs/client";

export default function tagsId({ blog }) {
  if (blog.length === 0) {
    return <div>該当の記事がありません。</div>;
  }
  return (
    <>
      <Header></Header>
      <div>
        <ul>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" });

  const paths = data.contents.map((content) => `/tags/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[equals]${id}` },
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};
