import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const uri = import.meta.env.VITE_API_URI;
console.log({ uri });
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
