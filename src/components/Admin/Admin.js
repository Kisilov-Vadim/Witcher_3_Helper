import React from 'react'
import {Link} from 'react-router-dom';
import './styles.scss';

export default function Admin() {
  return (
    <div className="wrapper admin">
      <Link to="/admin/add-new-component">Добавить новый компонент</Link>
      <Link to="/admin/add-new-silver-sword">Добавить серебряный меч</Link>
    </div>
  )
}
