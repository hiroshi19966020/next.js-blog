import Link from "next/link";
import styles from "@/styles/Home.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.gnav}>
        <h1 className={styles.logo}>
          <Link href="/">hiroshi's blog</Link>
        </h1>
        <ul>
          <li>
            <Link href="">ABOUT</Link>
          </li>
          <li>
            <Link href="/tags">TAGS</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
