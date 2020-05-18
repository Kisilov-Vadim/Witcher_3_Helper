import React from 'react'
import './ShowAllComponents.scss';

//semantic ui for react 
import {Table} from 'semantic-ui-react';

//apollo utilits
import {useQuery} from '@apollo/react-hooks';

//import queries 
import {getComponentsQuery} from '../../queries/queries';


export default function ShowAllComponents() {
  const {data, loading, error} = useQuery(getComponentsQuery, {
    variables: { lang: 'en' },
  });
  
  const displayComponents = () => {
    if (loading) {
      return(<div>Loading...</div>)
    } else if (error) {
      return(<div>Sorry, error...</div>)
    } else {
      return (
        <Table>
         <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Weight</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
            </Table.Row>
         </Table.Header>
         <Table.Body>
           {
             data.components.map(component => {
               return (
                 <Table.Row key={component.name}>
                   <Table.Cell>{component.name}</Table.Cell>
                   <Table.Cell>{component.price}</Table.Cell>
                   <Table.Cell>{component.weight}</Table.Cell>
                   <Table.Cell>{component.location}</Table.Cell>
                 </Table.Row>
               )
             })
           }
         </Table.Body>
        </Table>
      )
    }
  }

  return (
    <div className="showAllComponents">
      {
        displayComponents()
      }
    </div>
  )
}
