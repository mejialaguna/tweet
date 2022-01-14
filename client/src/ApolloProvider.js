import React from "react";
import App from "./App";
import apolloClient, { ApolloClient } from "apollo-client";
import { InMemoryCache, inMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http";
import { apolloProvider } from "@apollo/react-hooks"

const httpLink = createHttpLink({
    uri: "http://localhost:3002"
})
const client = new ApolloClient({
    link: httpLink,
    cache: InMemoryCache()
})
 
export default (
    <apolloProvider client={client}>
        <App />
    </apolloProvider>
)