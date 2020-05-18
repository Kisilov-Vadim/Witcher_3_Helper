import React from 'react';
import './App.scss';
import {Switch, Route, Link} from 'react-router-dom';

//import Graphql utilits
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';

//import Components
import AddNewComponent from './components/AddNewConponent/AddNewComponent'; 
import ShowAllComponents from './components/ShowAllComponents/ShowAllComponents';


// const link = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: "include"
// })

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
})

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
