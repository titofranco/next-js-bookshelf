import React from 'react';
import ErrorBoundary from './error-boundary';
import { FullPageErrorFallback, ErrorMessage, Button } from './lib';
import Link from 'next/link';
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'
import { FaCcDiscover } from 'react-icons/fa';
import { DiscoverBooksScreen } from './discover-book-screen';
import { useAuth0 } from "@auth0/auth0-react";

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


export default function AuthenticatedApp() {
  const { user, error, isLoading, logout } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
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
        <Button variant="secondary"  onClick={() => logout({ returnTo: 'http://localhost:3000' })}>
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
            <DiscoverBooksScreen/>
            {/* <AppRoutes /> */}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );

}