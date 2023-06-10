import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client } from "@/libs/client";

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
        <h1>{blog.title}</h1>
        <ul>
          <li>{new Date(blog.createdAt).toLocaleDateString("ja-JP")}</li>
          <li>{blog.tags.name}</li>
        </ul>
        <div>
          <img src={blog.photo.url} alt={blog.photo.alt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
      </main>
      <Footer></Footer>
    </>
  );
}
