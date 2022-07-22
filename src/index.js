import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { InMemoryCache } from 'apollo-boost';







const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
       cache: new InMemoryCache
      });



      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(

        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>

      );


