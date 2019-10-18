import React from 'react'
import CategoryField from './CategoryField'
import species from './species'

const CategorySelector = (props) => {
// console.log(props)
  const categoryFields = species.map((species, i) => <CategoryField
      key={ i }
      checked={ species.toLowerCase() === props.filterTerm }
      species={ species }
      onChange={ props.handleRadio }
    />)

  return (
    <div className="masterShow" style={{display:"flex"}}>
          { categoryFields }
    </div>
  )
}

export default CategorySelector