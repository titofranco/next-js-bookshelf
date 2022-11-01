import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import ErrorBoundary from './error-boundary';
import { FullPageErrorFallback, ErrorMessage, Button } from './lib';
import Link from 'next/link';
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}


export default function AuthenticatedApp() {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.name}
        <Link href="/api/auth/logout">
          <Button variant="secondary" css={{marginLeft: '10px'}}>
            Logout
          </Button>
        </Link>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
                                                           >
        <div css={{position: 'relative'}}>
          {/* <Nav /> */}
        </div>
        <main css={{width: '100%'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {/* <AppRoutes /> */}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )

}