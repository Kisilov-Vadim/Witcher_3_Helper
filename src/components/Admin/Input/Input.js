import React from 'react'
import {Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Input = ({name, type, handleChange, value}) => {
  
  return (
    <Form.Field>
      <label>{name}</label>
      <input 
        type={type}
        placeholder={name}
        name={name} 
        value={value}
        required={true}
        onChange={handleChange}
      />
    </Form.Field>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired, 
  type: PropTypes.string, 
  handleChange: PropTypes.func.isRequired, 
  value: PropTypes.string
}

Input.defaultProps = {
  type: 'text'
}

export default React.memo(Input)