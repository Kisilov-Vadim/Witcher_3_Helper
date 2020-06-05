import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload'

//graphQL
import { ApolloServer } from 'apollo-server';

//schema
import {typeDefs, resolvers} from './schema/schema.js';

let app = express();
let PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(__dirname))

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

app.post('/admin/api/send-photo', (req, res) => {
  let file = req.files.file; 
  file.mv(`images/components/${req.body.name}`, (err) => {
    if(err) {
      console.log(err)
    }
    res.send({status: 'ok'})
  })
})

app.get("*", (req, res) => {
  fs.readFile('build/index.html', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).send('Sorry, something went wrong...')
    }
    res.status(200).send(data)
  })
})

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

app.listen(4000, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
