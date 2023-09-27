import React from 'react';
import { array, number, object } from 'prop-types';


const Result = ({ 
    products = [],
    limit = 1,
    ...props 
}) => {
  const updatedProducts = products.slice(0, limit);
  const handleClick = ( v )=>{
    if ( typeof ( v ) === 'string' ) {
      return v.toString().toLowerCase()
      .replace( /\s+/g, '-' ) // Replace spaces with -
      .replace( /[^\w\-]+/g, '' ) // Remove all non-word chars
      .replace( /\-\-+/g, '-' ) // Replace multiple - with single -
      .replace( /^-+/, '' ) // Trim - from start of text
      .replace( /-+$/, '' ); // Trim - from end of text
    } return '';
  };
  

  if (!updatedProducts || updatedProducts.length === 0) return null;
  document.querySelector(".spinner__dialog").classList.add('hidden');
    return (
        <div className='result' { ...props }>
            <div className='cmp-result'>
                { updatedProducts.map((product, idx) => {
                   return (
                    <section key={ idx }className="questionnaire-result__root">
                      <div className="cmp-container__questionnaire-result">
                        <div className="cmp-container__questionnaire-result--row">
                          <div className="cmp-container__questionnaire-result--column">
                            <p className="cmp-text__questionnaire-result--roast-category">{ product.Our_Roasters} | { product.Blend_or_Single_Origin}</p>
                            <h2 className="cmp-text__questionnaire-result--title">{ product.productName }</h2>
                            <p className="cmp-text__questionnaire-result--roast-details">{ product.productDescription }</p>
                              <div className="cmp-container__questionnaire-result--price-large-screen">
                                <div className="cmp-text__questionnaire-result--price">
                                  <h3 className="cmp-text__questionnaire-result--price-h3">{ product.displayPrice }</h3><span
                                    className="cmp-text__questionnaire-result--price-label">Per Bag Per Delivery</span>
                                </div>
                                <div className="cmp-container__questionnaire-result--btn-row">
                                  <div className="cmp-container__questionnaire-result--btn-column">
                                  <a href={ `/us/en/beans/product/${ handleClick( product.productName ) }.html` }><button type="button" className="cmp-button__questionnaire-result--buy-now">View</button></a>
                                  </div>
                              {/*    <!-- <div className="cmp-container__questionnaire-result--btn-column">
                                  <a href="/en/beans.html"><button type="button" className="cmp-button__questionnaire-result--find-out-more">Find out
                                      more</button></a>
                                  </div> --> */}
                                </div>
                              </div>
                          </div>
                          <div className="cmp-container__questionnaire-result--column">
                            <img
                              src={ product.pdp_image }
                              alt={ product.productName } className="cmp-image__questionnaire-result" />
                          </div>
                          <div className="cmp-container__questionnaire-result--column cmp-container__questionnaire-result--price-small-screen">
                            <div className="cmp-text__questionnaire-result--price">
                              <h3 className="cmp-text__questionnaire-result--price-h3">{ product.displayPrice }</h3><span
                                className="cmp-text__questionnaire-result--price-label">Per Bag Per Delivery</span>
                            </div>
                            <div className="cmp-container__questionnaire-result--btn-row">
                              <div className="cmp-container__questionnaire-result--btn-column">
                                <button type="button" className="cmp-button__questionnaire-result--buy-now">View</button>
                              </div>
                             {/* <!--  <div className="cmp-container__questionnaire-result--btn-column">
                                <button type="button" className="cmp-button__questionnaire-result--find-out-more">Find out
                                  more</button> 
                              </div>--> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                   )
                }) }
            </div>
        </div>
        
    );
 };

Result.propTypes = {
    products: array,
    limit: number,
    props: object
};

export default Result;
