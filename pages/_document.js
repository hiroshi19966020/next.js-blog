import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Ubuntu:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body className="back_color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
