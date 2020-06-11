import React, {useState} from 'react';
import './AddNewSilverSword.scss';
import {Button, Form} from 'semantic-ui-react';

import Input from '../Input/Input';

const allInputs = [
  'name', 'name_en', 'type', 'type_en', 'category', 
  'category_en', 'effect', 'effect_en', 'rune_slots', 
  'damage', 'componets', 'purchase', 'sale', 'weight', 
  'location', 'location_en', 'image'  
]

export default function AddNewSilverSword({ language }) {
  const [postData, setPostData] = useState({
    name: '', 
    name_en: '',
    type: '',
    type_en: '', 
    category: '', 
    category_en: '',
    effect: '', 
    effect_en: '', 
    rune_slots: 0,
    damage: '',
    components: null,
    purchase: '',
    sale: '', 
    weight: '',
    location: '', 
    location_en: '',
    image: null, 
  })
  const [message, setMessage] = useState({status: null, message: ''}); 

  const handleDataPost = (e) => {
    e.preventDefault();
    console.log(postData)
  }

  const handleChange = ({ target }) => {
    if (target.name === 'purchase' || target.name === 'sale' || target.name === 'weight') {
      setPostData({...postData, [target.name]: +target.value});
    } else if (typeof target.value === 'string') {   
      setPostData({...postData, [target.name]: target.value.trim()});
    } else {
      setPostData({...postData, [target.name]: target.value});
    }
  }

  return (
    <div className="addNewItem wrapper">
      <Form onSubmit={handleDataPost} className="addNewItem__form">

        {
          allInputs.map(item => {
            if (item === 'purchase' || item === 'sale' || item === 'weight') {
              return <Input name={item} type="number" handleChange={handleChange} value={postData[item]} />
            } else if (item === 'image') {
              return <Input  name={item} type="file" handleChange={handleChange} value={postData[item]} />
            } else {
              return <Input name={item} handleChange={handleChange} value={postData[item]} />
            }
          })
        }

        <Button type='submit'>{language === 'en' ? 'Send' : 'Отправить'}</Button>
      </Form>
      <div className="addNewItem__status">
        <div className={`addNewItem__submitInfo ${message.status === null ? null : message.status === 'success' ? 'addNewItem__submitInfo-success' : 'addNewItem__submitInfo-error'}`}>{message.message}</div>
      </div>
    </div>
  )
}
