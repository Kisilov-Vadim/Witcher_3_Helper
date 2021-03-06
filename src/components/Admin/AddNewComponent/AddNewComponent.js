import React, {useState} from 'react'
import './styles.scss';
import {Button, Form} from 'semantic-ui-react';

//apollo utilits 
import { useMutation } from '@apollo/react-hooks';

//queries and mutations
import {addComponentMutation, getComponentsQuery} from '../../../queries/queries';

//utilits 
import {createPhotoName, sendPhoto} from '../../../modulesUtilits';

export default function AddNewComponent({language}) {
  const [name, setName] = useState(''); 
  const [name_en, setName_en] = useState('')
  const [purchase, setPurchase] = useState(''); 
  const [sale, setSale] = useState('');
  const [weight, setWeight] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [location_en, setLocation_en] = useState('');
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState({status: null, message: ''}); 

  const [addComponent] = useMutation(addComponentMutation);

  const getResponse = ({status, message}) => {
    if (status) {
      sendPhoto(image, createPhotoName(name_en), 'components')
        .then(res => {
          setMessage({status, message})
        })
        .catch(() => setMessage({status: false, message: `${message}, но возникли проблемы с добавлением фото`}))
    }
    setTimeout(() => {
      setMessage({status: null, message: ''})
    }, 10000)

    setName('');
    setName_en('')
    setPurchase('');
    setSale('');
    setWeight('');
    setLocation('');
    setLocation_en('')
    setImage('')
  }

  const handleDataPost = (e) => {
    e.preventDefault();
    addComponent({
      variables: {
        name, name_en, purchase, sale, weight, location, location_en, 
        image: `/images/components/${createPhotoName(name_en)}`
      }, 
      refetchQueries: [{ query: getComponentsQuery, variables: {lang: language} }]
    })
      .then(res => {
        getResponse(res.data.addComponent)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="addNewItem wrapper">
      <Form onSubmit={handleDataPost} className="addNewItem__form">
        <Form.Field>
          <label>{language === 'en' ? 'Name' : 'Название'}</label>
          <input 
            placeholder={language === 'en' ? 'Name' : 'Название компонента'}
            name='name' 
            value={name}
            required={true}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Name on english' : 'Название на английском'}</label>
          <input 
            placeholder={language === 'en' ? 'Name on english' : 'Название на английском'} 
            name='name_en' 
            value={name_en}
            required={true}
            onChange={(e) => setName_en(e.target.value.trim())}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Purchase' : 'Цена покупки'}</label>
          <input 
            type="number" 
            placeholder={language === 'en' ? 'Purchase' : 'Цена покупки'}
            name="purchase" 
            value={purchase}
            required={true}
            onChange={(e) => setPurchase(+e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Sale' : 'Цена продажи'}</label>
          <input 
            type="number" 
            placeholder={language === 'en' ? 'Sale' : 'Цена продажи'}
            name="sale" 
            value={sale}
            required={true}
            onChange={(e) => setSale(+e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Weight' : 'Вес'}</label>
          <input 
            type="number" 
            placeholder={language === 'en' ? 'Weight' : 'Вес'}
            name="weight" 
            required={true}
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}    
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Location' : 'Местоположение'}</label>
          <input 
            placeholder={language === 'en' ? 'Location' : 'Местоположение'}
            name="location" 
            required={true}
            value={location}
            onChange={(e) => setLocation(e.target.value.trim())}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Location on English' : 'Местоположение на английском'}</label>
          <input 
            placeholder={language === 'en' ? 'Location on English' : 'Местоположение на английском'}
            name="location_en" 
            required={true}
            value={location_en}
            onChange={(e) => setLocation_en(e.target.value.trim())}
          />
        </Form.Field>
        <Form.Field>
          <label>{language === 'en' ? 'Image' : 'Изображение'}</label>
          <input 
            type="file"
            name="image" 
            required={true}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Field>
        <Button type='submit'>{language === 'en' ? 'Send' : 'Отправить'}</Button>
      </Form>
      <div className="addNewItem__status">
        <div className={`addNewItem__submitInfo ${message.status === null ? null : message.status === true ? 'addNewItem__submitInfo-success' : 'addNewItem__submitInfo-error'}`}>{message.message}</div>
      </div>
    </div>
  )
}
