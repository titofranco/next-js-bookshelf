import '../styles/bootstrap.scss';
import '../styles/global.css';
import { UserProvider } from '@auth0/nextjs-auth0';

const App = ({ Component, pageProps }) => (
  <>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </>
)

export default App
