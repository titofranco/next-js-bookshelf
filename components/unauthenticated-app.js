import * as React from 'react'
import {Button} from './lib'
import { Logo } from './logo'
import Link from 'next/link'

function UnauthenticatedApp() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Link href="/api/auth/login" variant="primary">
          <Button>Login</Button>
        </Link>
        
      </div>
    </div>
  )
}

export default UnauthenticatedApp
