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
  <Layout>
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>

  </Layout>
  )
}

