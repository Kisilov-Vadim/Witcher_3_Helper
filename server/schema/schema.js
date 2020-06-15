import { gql } from 'apollo-server';
import db from '../DataBase/index';
import { addComponentData } from '../DataBase/addComponent';
import addSilverSword from '../DataBase/addSilverSword'; 

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

  type SilverSword {
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
    allSilverSwords(lang: String): [SilverSword]
  }

  type Mutation {
    addComponent(
      name: String!, name_en: String!, purchase: Float!, 
      sale: Float!, weight: Float!, location: String!, 
      location_en: String!, image: String!
    ): MutationStatus!
    addSilverSword(
      input: AddSwordVariables!
    ): MutationStatus!
  }
`;

export const resolvers = {
  Query: {
    components: (parent, args) => {
      return db.query(`select * from components${args.lang === 'en' ? '_en' : ''}`).then(res => res)
    },
    allSilverSwords: async (parent, args) => {
      return await db
        .query(`select * from silver_swords${args.lang === 'en' ? '_en' : ''}`)
        .then(res => {
          return res.map( async (silverSword) => {
            let newComponents = silverSword.components.map(async (item) => {
              item.component = await db
                .query(`select * from components${args.lang === 'en' ? '_en' : ''} where id=$1`, [item.component])
                .then(component => component[0], (err) => console.log(err))
              return item
            })
            silverSword.components = newComponents;
            return silverSword;
          })
        })
        .catch(err => {
          console.log(err);
          return {status: false, message: 'Проблема с получением данных...'}
        })
    }
  },
  
  Mutation: {
    addComponent: (parent, args) => {
      return addComponentData(args).then(res => res)
    },
    addSilverSword: (parent, {input}) => {
      return addSilverSword(input).then(res => res)
    }
  }
};