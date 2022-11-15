import Layout from '../components/layout'
import React from "react";
import Discover from './discover';
import { FullPageSpinner } from '../components/lib';
import { useAuth0 } from "@auth0/auth0-react";
 
export default function Home() {
  const { isAuthenticated, isLoading  } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
 
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <Discover/> : <Layout/>}
    </React.Suspense>
  )
}

 