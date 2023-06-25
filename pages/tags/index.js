import styles from "@/styles/Home.module.css";
import { client } from "@/libs/client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function tags({ tags }) {
  return (
    <>
      <Header></Header>
      <ul>
        {tags.map((tags) => (
          <li key={tags.id}>
            <Link href={`/tags/${tags.id}`}>{tags.name}</Link>
          </li>
        ))}
      </ul>
      <Footer></Footer>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]content_id` },
  });

  // カテゴリーコンテンツの取得
  const tagsData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      tags: tagsData.contents,
    },
  };
};
