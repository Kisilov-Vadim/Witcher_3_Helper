import React from 'react'
import './AllSilverSwords.scss';
import Preloader from '../../components/Preloader/Preloader';

//semantic ui for react 
import {Table} from 'semantic-ui-react';

//apollo utilits
import {useQuery} from '@apollo/react-hooks';

//import queries 
import {getSilverSwordsQuery} from '../../queries/queries';

export default function AllSilverSwords({language}) {
  const {data, loading, error} = useQuery(getSilverSwordsQuery, {variables: {lang: language}});

  if (loading) {
    return(<Preloader />)
  } else if (error) {
    return(<div>Sorry, error...</div>)
  } else {
    const {allSilverSwords} = data; 
    console.log(allSilverSwords)
    return (
      <div className="components-table wrapper">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{language === 'en' ? 'Name' : 'Названия'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Purchase' : 'Стоимость покупки'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Sale' : 'Стоимость продажт'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Weight' : 'Вес'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Components' : 'Компоненты'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Location' : 'Где найти'}</Table.HeaderCell>
              <Table.HeaderCell>{language === 'en' ? 'Image' : 'Фото'}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              allSilverSwords.map(silverSword => {
                return (
                  <Table.Row key={silverSword.name}>
                    <Table.Cell>{silverSword.name}</Table.Cell>
                    <Table.Cell>{silverSword.purchase}</Table.Cell>
                    <Table.Cell>{silverSword.sale}</Table.Cell>
                    <Table.Cell>{silverSword.weight}</Table.Cell>
                    {
                      silverSword.components.length > 0 ?
                        <Table.Cell>
                          <table>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                silverSword.components.map(({component, quantity}) => (
                                  <tr>
                                    <td>{component.name}</td>
                                    <td>{quantity}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </Table.Cell>
                      : <Table.Cell></Table.Cell>
                    }
                    <Table.Cell>{silverSword.location}</Table.Cell>
                    <Table.Cell><img className='image-big' src={silverSword.image} alt={silverSword.name}/></Table.Cell>
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
