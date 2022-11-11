import '../styles/bootstrap.scss';
import '../styles/global.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Auth0Provider } from "@auth0/auth0-react";
 
const queryClient = new QueryClient({
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
})

const App = ({ Component, pageProps }) => (
  <>
    <Auth0Provider
      domain="dev-d3dk2fmqo2z0kahe.us.auth0.com"
      clientId="2kt6uzN48MMnpgOD9doKKUW9SgSXMdC6"
      redirectUri="http://localhost:3000"
      audience="https://api.bookshelf"
      scope="read:books"
      cacheLocation="localstorage"
      useRefreshTokens={true}

    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Auth0Provider>

  </>
)
 
export default App