import { gql } from 'apollo-boost';

export const getComponentsQuery = gql`
  query($lang: String) {
    components(lang: $lang) {
      id
      name
      purchase
      sale
      weight
      location
      image
    }
  }
`;

export const getSilverSwordsQuery = gql`
  query($lang: String!) {
    allSilverSwords(lang: $lang) {
      name 
      type
      category
      effect
      rune_slots
      damage
      purchase
      sale
      weight
      location
      image
      components{
        quantity
        component{
          id
          name
          purchase
          sale
          weight
          location
          image
        }
      }
    }
  }
`

export const addComponentMutation = gql`
  mutation(
    $name: String!, $name_en: String!, $purchase: Float!, 
    $sale: Float!, $weight: Float!, $location: String!, 
    $location_en: String!, $image: String!
  ){
    addComponent(
      name: $name, name_en: $name_en, purchase: $purchase, 
      sale: $sale, weight: $weight, location: $location, 
      location_en: $location_en image: $image) {
        status
        message
    }
  }
`;

export const addSwordMutation = gql`
  mutation addSwordMutation(
    $input: AddSwordVariables!, $sword: String!
  ) {
    addSword(
      input: $input, sword: $sword
    ) { 
      status
      message
    }
  }
`
