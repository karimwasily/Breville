import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

export const TempProdCategoryList = ( { categories = [] } ) => (
  <div>
    <h4>Product Categories (temporary)</h4>
    <ul>
      { categories.map( ( category ) => (
        <li key={ category } style={{ textDecoration: 'underline' }}>
          <Link to={ `/${ category.replace( /\s/g, '_' ) }` }>{ category }</Link>
        </li>
      ) ) }
    </ul>
  </div>
);

TempProdCategoryList.defaultProps = {
  categories: []
};

TempProdCategoryList.propTypes = {
  categories: array
};
