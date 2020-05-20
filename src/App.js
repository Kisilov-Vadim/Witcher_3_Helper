import React from 'react';
import './App.scss';
import {Switch, Route, Link} from 'react-router-dom';

//import Graphql utilits
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

//import Components
import AddNewComponent from './components/AddNewConponent/AddNewComponent'; 
import ShowAllComponents from './components/ShowAllComponents/ShowAllComponents';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact={true} path="/admin/add-new-component">
          <div style={{ display: 'flex' }}>
            <AddNewComponent />
            <ShowAllComponents />
          </div>
        </Route>
        <Route exact={true} path="/admin">
          <Link to="/admin/add-new-component">Добавить новый компонент</Link>
        </Route>
      </Switch>
    </ApolloProvider>
  )
}

export default App;
