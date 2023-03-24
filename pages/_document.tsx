import Document, { Main, NextScript, Html, Head } from 'next/document'
import darkModeCode from 'dark-mode-code'

const lwtScript = `
  (function (m, a, z, e) {
    var s, t;
    try {
      t = m.sessionStorage.getItem('maze-us');
    } catch (err) {}

    if (!t) {
      t = new Date().getTime();
      try {
        m.sessionStorage.setItem('maze-us', t);
      } catch (err) {}
    }

    s = a.createElement('script');
    s.src = z + '?t=' + t + '&apiKey=' + e;
    s.async = true;
    a.getElementsByTagName('head')[0].appendChild(s);
    m.mazeUniversalSnippetApiKey = e;
  })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '897eab31-050d-4b0c-8bc7-043ad0447d19');
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={{ __html: lwtScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: darkModeCode }} />
        </body>
      </Html>
    )
  }
}
