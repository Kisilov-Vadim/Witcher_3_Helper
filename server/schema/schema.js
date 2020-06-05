import { gql } from 'apollo-server';
import db from '../DataBase/index';
import { addComponentData } from '../DataBase/addComponent';

export const typeDefs = gql`
  type Component {
    id: ID
    name: String!
    purchase: Float!
    sale: Float!
    weight: Float!
    location: String!
    image: String!
  }

  type Query {
    components(lang: String): [Component]
  }

  type Mutation {
    addComponent(name: String!, name_en: String!, purchase: Float!, sale: Float!, weight: Float!, location: String!, location_en: String!, image: String!): Component!
  }
`;

export const resolvers = {
  Query: {
    components: (parent, args) => {
      return db.query(`select * from components${args.lang === 'en' ? '_en' : ''}`).then(res => {
        let components = res.map(item => {
          let newImage = `${item.image}`;
          item.image = newImage; 
          return item;
        });
        return components;
      })
    }
  },
  Mutation: {
    addComponent: (parent, args) => {
      return addComponentData(args).then(res => res)
    }
  }
};