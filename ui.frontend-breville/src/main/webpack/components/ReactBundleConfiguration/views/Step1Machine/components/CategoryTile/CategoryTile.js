import React from 'react'
import { string } from 'prop-types'

export const CategoryTile = ({ title, subheading, imageUrl }) => {
  return (
    <div className='category-tile'>
      <p className='category-tile__title'>{title}</p>
      <p className='category-tile__subheading'>{subheading}</p>
      <img
        src={imageUrl}
        className='category-tile__image'
      />
    </div>
  )
}

CategoryTile.propTypes = {
  title: string,
  subheading: string,
  imageUrl: string,
}
