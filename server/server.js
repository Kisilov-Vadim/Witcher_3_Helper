import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload'

//graphQL
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
const { ApolloServer, gql } = require('apollo-server');

//schema
import schema from './schema/schema.js';

let app = express();
let PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get("*", (req, res) => {
    fs.readFile('build/index.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.status(404).send('Sorry, something went wrong...')
      }
      res.status(200).send(data)
    })
    // res.sendFile('index.html', { root });
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
