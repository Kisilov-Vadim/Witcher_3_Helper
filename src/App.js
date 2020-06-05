import React from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';

//import Graphql utilits
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//import Components
import {AddNewComponent} from './components/Admin/AddNewConponent/index'; 
import {AddNewSilverSword} from './components/Admin/AddNewSilverSword/index';
import {Main} from './pages/Main/index';
import {AllComponents} from './pages/AllComponents/index';
import {Header} from './components/Header/index';
import Admin from './components/Admin/Admin';

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
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
          <AddNewComponent />
        </Route>
        <Route exact={true} path="/admin/add-new-silver-sword">
          <AddNewSilverSword />
        </Route>
        <Route exact={true} path="/admin">
          <Admin />
        </Route>
      </Switch>
    </ApolloProvider>
  )
}

export default App;
