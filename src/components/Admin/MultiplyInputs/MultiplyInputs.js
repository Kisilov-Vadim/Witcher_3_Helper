import React, {useState} from 'react'
import './MultiplyInputs.scss';
import {useQuery} from '@apollo/react-hooks';
import {Button} from 'semantic-ui-react';

import {getComponentsQuery} from '../../../queries/queries';

export default function MultiplyInputs({language, components, setComponents}) {
  const {data, loading, error} = useQuery(getComponentsQuery, {variables: {lang: language}});

  const createComponentsSelect = (index) => {
    if (loading) {
      return (
        <select><option>Loading...</option></select>
      )
    } else if (error) {
      return (
        <select><option>Error!</option></select>
      )
    } else {
      return (
        <select 
          name="component" 
          onChange={(e) => handleChange(e, index)}
          value={components[index].component}
        >
          {
            data.components.map(({id, name}) => <option value={id} key={id}>{name}</option>)
          }
        </select>
      )
    }
  }

  const handleDelete = (index) => {
    let newComponents = [...components];
    newComponents.splice(index, 1); 
    setComponents(newComponents);
  }

  const handleChange = (e, index) => {
    let newComponents = [...components]; 
    if (e.target.name === 'quantity') {
      newComponents[index][e.target.name] = +e.target.value;
    } else {
      newComponents[index][e.target.name] = e.target.value;
    }
    setComponents(newComponents);
  }

  return (
    <fieldset className="fieldset">
      <legend>Components</legend>
      {
        components.map((item, index) => {
          return (
            <div className="fieldset__inputs" key={`${item.component}${index}`}>
              {
                createComponentsSelect(index)
              }
              <input 
                type='number'
                name="quantity"
                value={components[index].quantity}
                onChange={(e) => handleChange(e, index)}
              />
              <Button color='red' onClick={() => handleDelete(index)}>X</Button>
            </div>
          )
        })
      }
      <div className="fieldset__controlButtons">
        <Button 
          color='green' 
          onClick={() => setComponents([...components, { component: '1', quantity: 1 }])}
        >
          Добавить поле ввода
        </Button>
        <Button color='yellow'><a href="/admin/add-new-component" target="_blank">Добавить компонент в базу</a></Button>
      </div>
    </fieldset>
  )
}
