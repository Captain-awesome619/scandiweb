import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { Router } from 'react-router';



const client = new ApolloClient({
        uri: "http://localhost:4000/graphql"
      });

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <ApolloProvider client={client}>

          <App />
          
        </ApolloProvider>
      );


