import Layout from '../components/layout'
import React, { useEffect } from "react";
import UnauthenticatedApp from '../components/unauthenticated-app';
import AuthenticatedApp from '../components/authenticated-app';
import { FullPageSpinner } from '../components/lib';
import { useAuth0 } from "@auth0/auth0-react";
 
export default function Home() {
  const { isAuthenticated, isLoading  } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
 
  return (
  <Layout>
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>

  </Layout>
  )
}

