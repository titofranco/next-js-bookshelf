import Layout from '../components/layout'
import React, { useEffect } from "react";
import UnauthenticatedApp from '../components/unauthenticated-app';

export default function Home() {
  useEffect(() => {

      // Run code on client-side only : ensure document is here
      if (typeof document !== undefined) {

        // load JS bootstrap dependency
        let bootstrap = require('bootstrap/dist/js/bootstrap')

        // find all toasts
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function (toastEl) {
          return new bootstrap.Toast(toastEl)
        })

        // show each toast explicitly
        toastList.forEach( function(element, index) {
          element.show()
        })
      }
  // Run useEffect only once
  // Read https://css-tricks.com/run-useeffect-only-once/
  }, [])



  return (
  <Layout>
    <UnauthenticatedApp/>

  </Layout>
  )
}

