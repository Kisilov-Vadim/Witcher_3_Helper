import React, {useState} from 'react';
import './AddNewSilverSword.scss';
import {Button, Form} from 'semantic-ui-react';

import Input from '../Input/Input';
import {MultiplyInputs} from '../MultiplyInputs/index';

import {addSilverSwordMutation} from '../../../queries/queries';
import {getSilverSwordsQuery} from '../../../queries/queries';
import { useMutation } from 'react-apollo';
import {createPhotoName, sendPhoto} from '../../../modulesUtilits';

const allInputs = [
  'name', 'name_en', 'type', 'type_en', 'category', 
  'category_en', 'effect', 'effect_en', 'rune_slots', 
  'damage', 'purchase', 'sale', 'weight', 
  'location', 'location_en', 'image'  
]

export default function AddNewSilverSword({ language }) {
  const [components, setComponents] = useState([{ component: '1', quantity: 1 }]); 
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
    purchase: '',
    sale: '', 
    weight: '',
    location: '', 
    location_en: '',
    image: null, 
  })
  const [message, setMessage] = useState({status: null, message: ''}); 
  const [addSilverSword] = useMutation(addSilverSwordMutation);

  const handleDataPost = (e) => {
    e.preventDefault();
    postData.components = components;
    addSilverSword({
      variables: {input: {...postData, image: `/images/silver_swords/${createPhotoName(postData.name_en)}`}}, 
      refetchQueries: [{ query: getSilverSwordsQuery, variables: {lang: language} }]
    })
      .then(({data}) => {
        const {status, message} = data.addSilverSword;
        const {image, name_en} = postData; 
        if (status) {
          sendPhoto(image, createPhotoName(name_en), 'silver_swords')
            .then(res => setMessage({status, message}), (err) => setMessage({status: false, message: `${message}, но возникли проблемы с добавлением фото`}))
        }
        setTimeout(() => {
          setMessage({status: null, message: ''})
        }, 10000)
      })
      .catch(err => console.log(err, 'Проблема с запросом addSilverSwordMutation на стороне клиента'))
  }

  const handleChange = ({ target }) => {
    if (target.name === 'purchase' || target.name === 'sale' || target.name === 'weight') {
      setPostData({...postData, [target.name]: +target.value});
    } else if (target.name === 'image') {
      setPostData({...postData, [target.name]: target.files[0]});
    } else if (typeof target.value === 'string') {   
      setPostData({...postData, [target.name]: target.value});
    } else {
      setPostData({...postData, [target.name]: target.value});
    }
  }

  return (
    <div className="addNewItem wrapper">
      <Form onSubmit={handleDataPost} className="addNewItem__form">

        <MultiplyInputs components={components} setComponents={setComponents} />

        {
          allInputs.map(item => {
            if (item === 'purchase' || item === 'sale' || item === 'weight') {
              return <Input name={item} type="number" handleChange={handleChange} key={item} />
            } else if (item === 'image') {
              return <Input  name={item} type="file" handleChange={handleChange} key={item} />
            } else {
              return <Input name={item} handleChange={handleChange} value={postData[item] || ''} key={item} />
            }
          })
        }

        <Button type='submit'>{language === 'en' ? 'Send' : 'Отправить'}</Button>
      </Form>
      <div className="addNewItem__status">
        <div className={`addNewItem__submitInfo ${message.status === null ? null : message.status === true ? 'addNewItem__submitInfo-success' : 'addNewItem__submitInfo-error'}`}>{message.message}</div>
      </div>
    </div>
  )
}
