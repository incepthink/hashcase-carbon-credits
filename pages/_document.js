import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
      <Html lang="en">
          <Head>
            <title>Tok-e-re</title>
            <link href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap' rel="stylesheet" />
            <link rel = "icon" type = "image/png"  href = "/images/Logo2.png" />
          </Head>
          <body>
              <Main />
              <NextScript />
          </body>
    </Html>
  )
}
