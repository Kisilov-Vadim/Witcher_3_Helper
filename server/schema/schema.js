//graph ql utilits
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

//data base utilits
import db from '../DataBase/index';
import {addComponentData} from '../DataBase/addComponent';

const ComponentType = new GraphQLObjectType({
  name: 'Component',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString},
    price: { type: GraphQLInt },
    weight: { type: GraphQLString },
    location: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    components: {
      type: new GraphQLList(ComponentType),
      args: {
        lang: { type: GraphQLString }
      },
      resolve(parent, args) {
        let table = args.lang === 'en' ? 'components_en' : 'components';
        console.log(args.lang)
        return db.query(`select * from ${table}`)
          .then(res => res)
          .catch(err => console.err(`Problem with get all components in schema.js; error: ${err}`))
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addComponent: {
      type: ComponentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        location: { type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parent, args) {
        return addComponentData(args)
          .then(res => res)
          .catch(err => console.error(err))
      }
    },
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
