import Head from "next/head"

const siteTitle="The Next.js Bookshelf App"

export default function Layout({children}) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Migration of Bookshelf Next.js"
        />        
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="theme-color" content="#000000"/>
          {/* manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}

