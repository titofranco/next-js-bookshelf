import { QueryCache } from 'react-query';
const apiURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL
import * as React from "react"; //allow calling window.location

async function client(
  endpoint,
  {data, getAccessTokenSilently, logout, headers: customHeaders, ...customConfig} = {},
) {

  let token = getAccessTokenSilently ? await getAccessTokenSilently({
    audience: `https://api.bookshelf`,
    scope: "read:books"
  }) : null

  const queryCache = new QueryCache()

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": 'application/json',
      'Accept': 'application/json',
      ...customHeaders,
    },
    ...customConfig,  
  }

  return fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      queryCache.clear()
      logout({ returnTo: window.location.origin })
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}