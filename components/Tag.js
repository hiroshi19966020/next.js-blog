import styles from "@/styles/Home.module.css";
import post from "@/styles/post.module.css";

export function Tag(blog) {
  return (
    <>
      <li className={post.tags}>{blog.tags.name}</li>
    </>
  );
}
