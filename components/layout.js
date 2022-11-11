import Head from "next/head";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorBoundary from "./error-boundary";
import { FullPageErrorFallback, ErrorMessage, Button } from './lib';
import * as mq from '../styles/media-queries'



const siteTitle = "The Next.js Bookshelf App";

function ErrorFallback({ error }) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

export default function Layout({ children }) {
  const { isAuthenticated, logout, user, isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Migration of Bookshelf Next.js" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        {/* manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      {isAuthenticated ? (
        <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            {user.name}
            <Button
              variant="secondary"
              onClick={() => logout({ returnTo: "http://localhost:3000" })}
            >
              Log Out
            </Button>
          </div>
          <div
            css={{
              margin: "0 auto",
              padding: "4em 2em",
              maxWidth: "840px",
              width: "100%",
              display: "grid",
              gridGap: "1em",
              gridTemplateColumns: "1fr 3fr",
              [mq.small]: {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto",
                width: "100%",
              },
            }}
          >
            <div css={{ position: "relative" }}>{/* <Nav /> */}</div>
            <main css={{ width: "100%" }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {children}
              </ErrorBoundary>
            </main>
          </div>
        </ErrorBoundary>
      ) : (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
