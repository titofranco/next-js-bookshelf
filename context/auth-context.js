import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { client } from '../utils/api-client';
// async function bootstrapAppData() {
//   let user = null

//   const token = await auth.getToken()
//   if (token) {
//     const data = await client('bootstrap', {token})
//     queryCache.setQueryData('list-items', data.listItems, {
//       staleTime: 5000,
//     })
//     for (const listItem of data.listItems) {
//       setQueryDataForBook(listItem.book)
//     }
//     user = data.user
//   }
//   return user
// }


// function useToken() {
//   const { getAccessTokenSilently } = useAuth0();
//   const [accessToken, setAccessToken] = React.useState('')
 
//   async function getAccessToken() {
//     try {
//       const token = await getAccessTokenSilently({
//         audience: `https://api.bookshelf`,
//         scope: "read:books",
//       })
//       setAccessToken(token);
//     } catch (e) {
//       console.log("there was an error getting the access token", e);
//     }
//   }

//   return {accessToken, getAccessToken}
// }

function useClient() {
const { getAccessTokenSilently, logout } = useAuth0();
  return(endpoint, config) => client(endpoint, { ...config, getAccessTokenSilently, logout })
}

export {useClient}
