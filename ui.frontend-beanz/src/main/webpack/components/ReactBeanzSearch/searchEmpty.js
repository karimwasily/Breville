import React from 'react';
import { array , string } from 'prop-types';
import ProductTile from './productTile'

const SearchEmpty = ({ 
  popularsearches,
  popularcoffees,
  initresult,
  initsuggestion,
  resultsroastersproducts,
  productpath,
  plppagepath
}) => {
  const constructUrl = (searchQuery)=>{
    return plppagepath+'.html?searchterm='+searchQuery
  }
  
  return (
    <div className="cmp-container-beanz-search__popular-row">
        <div className="cmp-container-beanz-search__popular-search">
          {initsuggestion.length !== 0 && resultsroastersproducts.length == 0 &&
            <div className="cmp-text-beanz-search__popular-search--title">{ popularsearches }</div>
          }
          {initsuggestion.length !== 0 && resultsroastersproducts.length == 0 && initsuggestion.map(suggestion => {
            return (
              <a href={constructUrl(suggestion.query)} className="cmp-text-beanz-search__popular-search--item-p">{suggestion.query}</a>
            )
          })}
        </div>
        <div className="cmp-container-beanz-search__popular-coffees">
          {initresult && resultsroastersproducts.length == 0 &&
            <div className="cmp-text-beanz-search__popular-coffees--title">{ popularcoffees }</div>
          }
          <div className="cmp-container-beanz-search__coffee">
            {initresult.length !== 0 && resultsroastersproducts.length == 0 && initresult.map(product => {
              return (
                <ProductTile
                    product={ product }
                    productpath={ productpath } 
                />
              )
            })}
          </div>
        </div>
      </div>
  );
};

SearchEmpty.propTypes = {
  popularsearches: string,
  popularcoffees: string,
  initresult: array,
  initsuggestion: array,
  resultsroastersproducts: array,
  productpath: string,
  plppagepath: string
};

export default SearchEmpty;
