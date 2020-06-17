import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';

import Input from '../Input/Input';
import {MultiplyInputs} from '../MultiplyInputs/index';

import {addSwordMutation} from '../../../queries/queries';
import { useMutation } from 'react-apollo';
import {createPhotoName, sendPhoto} from '../../../modulesUtilits';

const allInputs = [
  'name', 'name_en', 'type', 'type_en', 'category', 
  'category_en', 'effect', 'effect_en', 'rune_slots', 
  'damage', 'purchase', 'sale', 'weight', 
  'location', 'location_en', 'image'  
]

export default function AddNewMetalSword({ language }) {
  const [components, setComponents] = useState([]); 
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
  const [addSword] = useMutation(addSwordMutation);

  const handleDataPost = (e) => {
    e.preventDefault();
    postData.components = components;
    addSword({
      variables: {input: {...postData, image: `/images/metal_swords/${createPhotoName(postData.name_en)}`}, sword: 'metal'}, 
      // refetchQueries: [{ query: getSilverSwordsQuery, variables: {lang: language} }]
    })
      .then(({data}) => {
        const {status, message} = data.addSword;
        const {image, name_en} = postData; 
        if (status) {
          sendPhoto(image, createPhotoName(name_en), 'metal_swords')
            .then(res => setMessage({status, message}), (err) => setMessage({status: false, message: `${message}, но возникли проблемы с добавлением фото`}))
          let newPostData = {...postData}; 
          for(let key in newPostData) {
            newPostData[`${key}`] = ''; 
          }
          setPostData(newPostData); 
        }
        setTimeout(() => {
          setMessage({status: null, message: ''})
        }, 10000)
      })
      .catch(err => {
        setMessage({status: false, message: 'Упс, возникла проблема на стороне клиента'})
        console.log(err, 'Проблема с запросом addSwordMutation на стороне клиента')
      })
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
