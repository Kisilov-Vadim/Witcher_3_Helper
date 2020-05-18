import { gql } from 'apollo-boost';

export const getComponentsQuery = gql`
  query($lang: String) {
    components(lang: $lang) {
      id
      name
      price
      weight
      location
    }
  }
`;

export const addComponentMutation = gql`
  mutation($name: String!, $price: Int!, $weight: Int!, $location: String!, $image: Upload!){
    addComponent(name: $name, price: $price, weight: $weight, location: $location, image: $image){
      id
      name
    }
  }
`;
