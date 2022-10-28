import Layout from '../components/layout'
import React, { useEffect } from "react";
import { Dialog } from '@reach/dialog';
import { VisuallyHidden } from "@reach/visually-hidden";

export default function Home() {

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

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
    

    <div>
      <button onClick={open}>Open Dialog</button>
      <VisuallyHidden>Close</VisuallyHidden>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <span aria-hidden>×</span>
        </button>
        <p>Hello there. I am a dialog</p>
      </Dialog>
    </div>


    <div className="toast align-items-center text-white bg-primary border-0 position-absolute top-50" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <h5 className="text-white h4">Collapsed content</h5>
          <span className="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Bootstrap 5.1.3 example</h1>
              <p className="lead text-muted">Short text.</p>
            </div>
          </div>
        </section>
      </main>


  </Layout>
  )
}

