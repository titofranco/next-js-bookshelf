import * as React from 'react'
import {Button} from './lib'
import { Logo } from './logo'
import Link from 'next/link'
import { useAuth0 } from "@auth0/auth0-react";

function UnauthenticatedApp() {

  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
          <Button variant="primary" onClick={() => loginWithRedirect()}>Login</Button>
        
      </div>
    </>
  )
}

export default UnauthenticatedApp
