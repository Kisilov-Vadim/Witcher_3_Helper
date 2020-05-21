import React from 'react'
import './SelectLanguage.scss';

export default function SelectLanguage({language, setLanguage}) {

  const handleChange = (lang) => {
    if (language === lang) return
    setLanguage(lang)
  }

  return (
    <div className="select-language">
      <span 
        className={`select-language__lang ${language === 'ru' ? 'nonactive' : ''}`}
        onClick={() => handleChange('en')}
        >
        EN
      </span>
      <span 
        className={`select-language__lang ${language === 'en' ? 'nonactive' : ''}`}
        onClick={() => handleChange('ru')}
      >
        RU
      </span>
    </div>
  )
}
