import React, { useEffect, useState } from 'react'
import { object, any } from 'prop-types'
import Slider from 'react-slick';
import { withAem } from 'library/utils/withAem'
import algoliasearch from 'algoliasearch/lite';

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  accessibility: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 766,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }]
};


const ReactBeanzRelatedProducts = ({ aemData, appRef }) => {

  const searchClient = algoliasearch( aemData.algoliaAppId, aemData.algoliaSearchApiKey );
  /**
   * get algolia index
   * @param {string?} index - algolia index name
   * @returns
   */
  const getIndex = (index = aemData.algoliaIndexName) =>
   searchClient.initIndex(index)
  
  /**
   * get objects via facet list
   * @param {[facetName: string, facetValue: string][]} facetList array of facet names and values
   * @returns {Promise}
   */
   let sorted_filter = aemData.facets;
  const getFacetValues = async facetList => {
    return getIndex().search('', {
      facetFilters: facetList.map(([facetName, facetValue]) => `${facetName}:${facetValue}`),
    })
  }

  function getFacetSelected(facetList, removableFacet) {
    let filter =  [];
    filter = facetList.map(([facetName, facetValue]) => {
      if(facetName === removableFacet){
        delete sorted_filter[facetName];
      }
    })
    let sorted_filterObj = Object.entries(sorted_filter)
    return getFacetValues(sorted_filterObj)
  }

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!aemData.facets) return

    setIsLoading(true)
    let facetList = Object.entries(aemData.facets)
    getFacetValues(facetList)
      .then(data => {
        if(data.hits.length < 2){
          getFacetSelected(facetList,"The_Roast").then(sorted_data => {
            if(sorted_data.hits.length < 2){
              getFacetSelected(facetList,"Blend_or_Single_Origin").then(sorted_data => {
                if(sorted_data.hits.length < 2){
                  getFacetSelected(facetList,"Coffee_Flavors").then(sorted_data => {
                    sorted_data.hits = shuffle(sorted_data.hits);
                    setProducts(sorted_data.hits)
                  })
                }else{
                  sorted_data.hits = shuffle(sorted_data.hits);
                  setProducts(sorted_data.hits)
                }
              })
            }else{
              sorted_data.hits = shuffle(sorted_data.hits);
              setProducts(sorted_data.hits)
            }
          })
        }else{
          data.hits = shuffle(data.hits);
          setProducts(data.hits)
        }
      })
      .catch(error => {
        console.error(error)
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  function shuffle (o){
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

  const handleClick = (v)=>{
    if (typeof(v)==='string') {
      return v.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    } return ''
  }

  return (
    <section className="related-products__root">
      { products.length !== 0 && <div className="cmp-container__related-products">
        <div className="cmp-container">
          <div className="related-products__heading">
            <h2 className="cmp-text__related-products--title">{aemData.relatedProductsHeading}</h2>
          </div>
        </div>
      </div> }
      <div className="cmp-container__related-products--items">
        <div className="cmp-container">
          <div className="related-products__items--row">
            {/* {isLoading && <p>Loading...</p>} */}
            {/* <Slider {...settings}> */}
            {products.length !== 0 &&
              products.slice(0,4).map(product => {
                return(
                    <div className="related-products__item--column" key={product.objectID}>
                      <pre key={product.objectID}>
                          <div className="related-products__item--card">
                            <a href={aemData.productPagePath+handleClick(product.productName)+'.html'} className="related-products__item-gotocart"></a>
                            <div className="related-products__item--card-image">
                            <img src={product.tile_image} className="related-products__item--card-image-img" />
                            </div>
                            <div className="related-products__item--card-body">
                              <div className="related-products__item--roaster-name">
                                {product.Our_Roasters}
                              </div>
                              <h3 className="related-products__item--coffee-name">{product.productName}</h3>
                              <p className="related-products__item--darkroast">{product.Coffee_Flavors}</p>
                              <p className="related-products__item--price-from-oz">{product.displayPrice}</p>
                              <div className="cmp-container-related-products__item--btn">
                              <a href={aemData.productPagePath+handleClick(product.productName)+'.html'}><button className="related-products__item--coffee-buy-now-btn">{aemData.buyNowBtn}</button></a>
                              </div>
                              <p className="related-products__item--subscribe-save-note">{aemData.subscriptionMsg}</p>
                            </div>
                          </div>
                      </pre>
                    </div>
                  )
                })}
                {/* </Slider> */}
            </div>
        </div>
      </div>
    </section>
  )
}

ReactBeanzRelatedProducts.propTypes = {
  aemData: object,
  appRef: any
}

export default withAem(ReactBeanzRelatedProducts)
