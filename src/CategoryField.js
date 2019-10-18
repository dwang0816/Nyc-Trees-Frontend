import React from 'react'

const CategoryField = (props) => {
  const { species, checked } = props

  return (
    <div className=" four wide field">
      <div className="ui radio checkbox">
        <input
          type="radio"
          name={species}
          checked={checked}
          onChange={props.onChange}
          className="form-radio"
          
        />
        <label>{ species }</label>
      </div>
    </div>
  )
}

export default CategoryField
