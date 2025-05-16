// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Primary Meta Tags */}
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="Lunara: Next-gen AI-powered sales funnels."
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
            rel="stylesheet"
          />

          {/* Open Graph */}
          <meta
            property="og:title"
            content="Lunara · Space-Age Funnels"
          />
          <meta
            property="og:description"
            content="Next-gen AI-powered sales funnels launched into orbit."
          />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content="https://lunara.com" />
          <meta property="og:type" content="website" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />

          {/* Favicon - universal */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body className="font-sans bg-black text-white transition-colors">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
