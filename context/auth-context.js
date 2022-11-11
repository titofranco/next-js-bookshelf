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


function useClient() {
const { getAccessTokenSilently, logout } = useAuth0();
  return(endpoint, config) => client(endpoint, { ...config, getAccessTokenSilently, logout })
}

export {useClient}
