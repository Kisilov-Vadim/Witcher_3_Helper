import { gql } from 'apollo-server';
import db from '../DataBase/index';

import { addComponentData } from '../DataBase/addFuncUtilits/addComponent';
import addSword from '../DataBase/addFuncUtilits/addSword'; 
import allSilverSwords from '../DataBase/getFuncUtilits/allSilverSwords';

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

  type Sword {
    id: ID!
    name: String!
    type: String!
    category: String!
    effect: String!
    rune_slots: String!
    damage: String!
    purchase: Float!
    sale: Float!
    weight: Float!
    location: String!
    image: String!
    components: [ComponentInMainObject]
  }

  input AddSwordVariables {
    name: String!, 
    name_en: String!, 
    type: String!,
    type_en: String!, 
    category: String!, 
    category_en: String!,
    effect: String!, 
    effect_en: String!, 
    rune_slots: String!, 
    damage: String!, 
    purchase: Float!, 
    sale: Float!, 
    weight: Float!,
    location: String!, 
    location_en: String!, 
    image: String!, 
    components: [MutationComponent]
  }

  input MutationComponent {
    component: ID!
    quantity: Int!
  }

  type ComponentInMainObject {
    component: Component!
    quantity: Int!
  }

  type MutationStatus {
    status: Boolean!
    message: String!
  }

  type Query {
    components(lang: String): [Component]
    allSilverSwords(lang: String): [Sword]
  }

  type Mutation {
    addComponent(
      name: String!, name_en: String!, purchase: Float!, 
      sale: Float!, weight: Float!, location: String!, 
      location_en: String!, image: String!
    ): MutationStatus!

    addSword(
      input: AddSwordVariables!
      sword: String!
    ): MutationStatus!
  }
`;

export const resolvers = {
  Query: {
    components: (parent, args) => {
      return db.query(`select * from components${args.lang === 'en' ? '_en' : ''}`).then(res => res)
    },
    allSilverSwords: async (parent, args) => {
      return allSilverSwords(args).then(res => res)
    }
  },
  
  Mutation: {
    addComponent: (parent, args) => {
      return addComponentData(args).then(res => res)
    },
    addSword: (parent, {input, sword}) => {
      return addSword(input, sword).then(res => res)
    },
  }
};