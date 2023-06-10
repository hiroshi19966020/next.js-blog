import Link from "next/link";
import styles from "@/styles/Home.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        <ul>
          <li className={styles.icon_tw}>
            <Link href="https://twitter.com/home?lang=ja">
              <img src="/images/Logo-white.svg"></img>
            </Link>
          </li>
          <li className={styles.icon_git}>
            <Link href="https://github.com/hiroshi19966020/next.js-blog/tree/main">
              <img src="/images/github-mark-white.svg"></img>
            </Link>
          </li>
        </ul>
        <p className={styles.copyright}>©️2023 hiroshi`s blog</p>
      </div>
    </footer>
  );
}

export default Footer;
