import React from 'react';
import './App.scss';
import {Switch, Route, Link} from 'react-router-dom';

//import Graphql utilits
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

//import Components
import {AddNewComponent} from './components/AddNewConponent/index'; 
import {Main} from './pages/Main/index';
import {AllComponents} from './pages/AllComponents/index';
import {Header} from './components/Header/index';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <Route exact={true} path='/'>
          <Main />
        </Route>
        <Route exact={true} path='/components'>
          <AllComponents />
        </Route>
        <Route exact={true} path="/admin/add-new-component">
          <div style={{ display: 'flex' }}>
            <AddNewComponent />
          </div>
        </Route>
        <Route exact={true} path="/admin">
          <div className="wrapper" style={{marginTop: '20px', fontSize: '24px'}}>
            <Link to="/admin/add-new-component">Добавить новый компонент</Link>
          </div>
        </Route>
      </Switch>
    </ApolloProvider>
  )
}

export default App;
