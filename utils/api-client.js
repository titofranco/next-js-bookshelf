import {queryCache} from 'react-query'
const apiURL = process.env.REACT_APP_API_URL
import * as React from "react";

async function client(
  endpoint,
  {data, getAccessTokenSilently, headers: customHeaders, ...customConfig} = {},
) {

  const token = getAccessTokenSilently ? await getAccessTokenSilently({
    audience: `https://api.bookshelf`,
    scope: "read:books"
  }) : null

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

  return fetch('http://localhost:3001/api/books', config).then(async response => {
    if (response.status === 401) {
      queryCache.clear()
      const { logout } = useAuth0();
      logout({ returnTo: window.location.origin })
      // refresh the page for them
      //window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    //console.log("response i get from BE ", response)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}