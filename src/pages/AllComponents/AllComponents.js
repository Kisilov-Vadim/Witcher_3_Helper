import React from 'react'
import './AllComponents.scss';
import Preloader from '../../components/Preloader/Preloader';

//semantic ui for react 
import {Table} from 'semantic-ui-react';

//apollo utilits
import {useQuery} from '@apollo/react-hooks';

//import queries 
import {getComponentsQuery} from '../../queries/queries';

export default function AllComponents({language}) {
  const {data, loading, error} = useQuery(getComponentsQuery, {variables: {lang: language}});

  if (loading) {
    return(<Preloader />)
  } else if (error) {
    return(<div>Sorry, error...</div>)
  } else {
    return (
      <div className="components-table wrapper">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{language === 'en' ? 'Name' : 'Названия'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Purchase' : 'Стоимость покупки'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Sale' : 'Стоимость продажт'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Weight' : 'Вес'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Location' : 'Где найти'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Image' : 'Фото'}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              data.components.map(component => {
                return (
                  <Table.Row key={component.name}>
                    <Table.Cell>{component.name}</Table.Cell>
                    <Table.Cell>{component.purchase}</Table.Cell>
                    <Table.Cell>{component.sale}</Table.Cell>
                    <Table.Cell>{component.weight}</Table.Cell>
                    <Table.Cell>{component.location}</Table.Cell>
                    <Table.Cell><img src={component.image} alt={component.name}/></Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
