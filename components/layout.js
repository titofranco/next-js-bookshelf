import Head from "next/head"
import React, { useEffect } from "react";

const siteTitle="The Next.js Bookshelf App"

export default function Layout({children}) {

  useEffect(() => {
    // Run code on client-side only : ensure document is here
    if (typeof document !== undefined) {
      // load JS bootstrap dependency
      let bootstrap = require("bootstrap/dist/js/bootstrap");

      // find all toasts
      let toastElList = [].slice.call(document.querySelectorAll(".toast"));
      let toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });

      // show each toast explicitly
      toastList.forEach(function (element, index) {
        element.show();
      });
    }
    // Run useEffect only once
    // Read https://css-tricks.com/run-useeffect-only-once/
  }, []);

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
        <link rel="manifest" href="/manifest.json"/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}

