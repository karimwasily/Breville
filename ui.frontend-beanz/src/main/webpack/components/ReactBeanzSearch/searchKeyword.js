import React from 'react';
import { array , string } from 'prop-types';
import ProductTile from './productTile'

const SearchKeyword = ({ 
  categorieslbl,
  roasterslbl,
  coffeeslbl,
  roasterlist,
  resultsroastersproducts,
  resultscategories,
  roasterpagepath,
  plppagepath,
  productpath,
  allcoffees
}) => {
  const createURL = (v)=>{
    if (typeof(v)==='string') {
      return v.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    } return ''
  }
  const constructUrl = (searchQuery)=>{
    return plppagepath+'.html?searchterm='+searchQuery
  }
  return (
    <div className="cmp-container-beanz-search__result-box">
        <div className="cmp-container-beanz-search__result-box--category-col">
          {resultscategories.length !== 0 &&
            <div className="cmp-container-beanz-search__categories">
              <div className="cmp-text-beanz-search__categories--title">
                { categorieslbl }
              </div>
              <div className="cmp-container-beanz-search__categories--result">
                {resultscategories.length !== 0 && resultscategories.map(product => {
                  return (
                    <a href = {constructUrl(product.objectID)} className="cmp-text-beanz-search__categories--item-p" dangerouslySetInnerHTML={{__html: product._highlightResult.query.value}}></a>
                  )
                })}
              </div>
            </div>
            }
            {resultsroastersproducts.length !== 0 &&
            <div className="cmp-container-beanz-search__roasters">
              <div className="cmp-text-beanz-search__roasters--title">
                {roasterslbl}
              </div>
              {resultsroastersproducts.length !== 0 && roasterlist.map(roasterName => {
                return (
                  <a href={roasterpagepath+createURL(roasterName)+'.html'} className="cmp-text-beanz-search__roasters--item-p">{ roasterName }</a>
                )
              })}
            </div>
            }
        </div>
        {resultsroastersproducts.length !== 0 &&
        <div className="cmp-container-beanz-search__coffee">
          <div className="cmp-text-beanz-search__coffees--title">
            {coffeeslbl}
          </div>
          {resultsroastersproducts.length !== 0 && resultsroastersproducts.map(product => {
            return (
              <ProductTile
                    product={ product }
                    productpath={ productpath } 
                />
            )
          })}
          {resultsroastersproducts.length !== 0 &&
            <a href={plppagepath+'.html?searchterm='+document.getElementById('beanz-search-input').value} className="cmp-text-beanz-search__coffee--all-coffee">
              { allcoffees }
            </a>
          }
        </div>
        }
      </div>
  );
};

SearchKeyword.propTypes = {
  categorieslbl: string,
  roasterslbl : string,
  coffeeslbl : string,
  roasterlist : array,
  resultsroastersproducts : array,
  resultscategories : array,
  roasterpagepath : string,
  plppagepath : string,
  productpath : string,
  allcoffees : string
};

export default SearchKeyword;
