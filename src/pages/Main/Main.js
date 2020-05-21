import React from 'react'
import './Main.scss';

import {Link} from 'react-router-dom';

export default function Main({language}) {
  return (
    <section className="main wrapper">
      <Link to="/components" className='card'>
        <div className='title'>{language === 'en' ? 'Components' : 'Компонеты'}</div>
      </Link>
      <Link to="/admin" className='card admin'>
        <div className='title'>{language === 'en' ? 'Admin' : 'Админ'}</div>
      </Link>
    </section>
  )
}
