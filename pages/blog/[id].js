import styles from "@/styles/Home.module.css";
import post from "@/styles/post.module.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client } from "@/libs/client";
import { Tag } from "@/components/Tag";

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default function BlogId({ blog }) {
  return (
    <>
      <Header></Header>
      <main>
        <div className={`${post.container} ${post.article}`}>
          <h1 className={post.title_item}>{blog.title}</h1>
          <ul>
            <li className={post.date}>
              {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
            </li>
            <li className={post.tags}>{blog.tags.name}</li>
          </ul>
          <div>
            <img src={blog.photo.url} alt={blog.photo.alt} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
