import React, { useState } from 'react'
import { object } from 'prop-types'
import { withAem } from 'library/utils/withAem'
import algoliasearch from 'algoliasearch/lite';
import SearchEmpty from './searchEmpty'
import SearchKeyword from './searchKeyword'


const ReactBeanzSearch = ({ aemData }) => {
  const [resultsroastersproducts, setRoastersProducts] = useState([])
  const [resultscategories, setCategories] = useState([])
  const [initResult, setInitProd] = useState([])
  const [initSuggestion, setInitSuggestion] = useState([])
  const [roasterList, setRoasterList] = useState([])
  const client = algoliasearch(aemData.algoliaAppId, aemData.algoliaSearchApiKey);

  function handleClick(e) {
      let answer = e.target.value;
      if(answer){
        const queries = [{
          indexName: 'Beanz',
          query: answer,
          params: {
            hitsPerPage: 5
          }
        }];
        const getIndex = (index = 'Beanz_query_suggestions') =>
        client.initIndex(index)

        getIndex().search(answer, {
          highlightPreTag: '<strong>',
          highlightPostTag: '</strong>',
          attributesToHighlight: [
            'query'
          ]
        }).then(({ hits }) => {
          setCategories(hits);
        });

        client.multipleQueries(queries).then(({ results }) => {
          let roasterList1 = [];
          {results[0].hits && results[0].hits.map(result =>{
            roasterList1.push(result.Our_Roasters)
          })}
          const newArray = [...new Set(roasterList1)];
          setRoasterList(newArray)
          setRoastersProducts(results[0].hits);
        });
      }else{
        const queries = [{
          indexName: 'Beanz_query_suggestions',
          query: '',
          params: {
            hitsPerPage: 6
          }
        },
        {
        indexName: 'Beanz',
        query: '',
        params: {
          hitsPerPage: 5
        }
      }];
      client.multipleQueries(queries).then(({ results }) => {
        setInitSuggestion(results[0].hits)
        setInitProd(results[1].hits)
        setRoastersProducts([])
        setCategories([])
      });
    }
  }
  function addItem(e){
    window.location = aemData.plpPagePath+".html?searchterm="+document.getElementById('beanz-search-input').value;
    e.preventDefault();
  }

  // close search on event listener
  const searchBoxCloseBtn = document.querySelector(".cmp-experiencefragment--header .cmp-input-clear");
  const searchBoxContent = document.querySelector(".cmp-experiencefragment--header .beanzSearch");
  const searchHeaderIcon = document.querySelector(".cmp-experiencefragment--header .cmp-navigation__search");
  if (searchBoxCloseBtn) {
    searchBoxCloseBtn.addEventListener('click', () => {
      searchBoxContent.classList.remove('active');
      searchHeaderIcon.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    });
  }
 
  return (
    <div>
      {/* Search input field */}
      <div className="cmp-container-beanz-search__roasters--search-box">
        <div className="aa-input-container" id="aa-input-container">
          <form onSubmit={addItem.bind(this)}>
            <input id='beanz-search-input' className="cmp-input-beanz-search__roasters-input-search" onFocus={ handleClick } onChange={ handleClick.bind(event) } type='text' autoComplete='off' placeholder="Search for beanz or roasters..." name="search"/>
            <button className="cmp-input-clear" type="reset" title="Clear"></button>
          </form>
        </div>
      </div>
      {/** Onload of search component with no keyword */}
      <SearchEmpty
        popularsearches = { aemData.popularSearches }
        popularcoffees = { aemData.popularCoffees }
        productpath = { aemData.productPagePath }
        initresult = { initResult }
        initsuggestion = { initSuggestion }
        resultsroastersproducts = { resultsroastersproducts }
        plppagepath = { aemData.plpPagePath }
      />
      {/** Search using keyword. */}
      <SearchKeyword 
        categorieslbl = { aemData.categoriesLbl }
        roasterslbl = { aemData.roastersLbl }
        coffeeslbl = { aemData.coffeesLbl }
        productpath = { aemData.productPagePath }
        resultsroastersproducts = { resultsroastersproducts }
        resultscategories = { resultscategories }
        roasterlist = { roasterList }
        roasterpagepath = { aemData.roasterPagePath }
        plppagepath = { aemData.plpPagePath }
        allcoffees = { aemData.allCoffeesLbl }
      />
    </div>
  )
}

ReactBeanzSearch.propTypes = {
  aemData: object
}

export default withAem(ReactBeanzSearch)
