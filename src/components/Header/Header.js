import React from 'react'
import './Header.scss';

//react router
import {Switch, Route, Link} from 'react-router-dom';
import {SelectLanguage} from '../SelectLanguage/index';

export default function Header({language}) {
  return (
    <section className="header">
      <div className='wrapper'>
        <nav className='header__nav'>
          <Switch>
            <Route exact={true} path="/">
              <span>{language === 'en' ? 'Home' : 'Главная'}</span>
            </Route>
            <Link to="/">{language === 'en' ? 'Home' : 'Главная'}</Link>
          </Switch>
        </nav>
        <SelectLanguage />
      </div>
    </section>
  )
}
