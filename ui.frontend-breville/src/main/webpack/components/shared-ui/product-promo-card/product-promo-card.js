import React from 'react';
import Proptypes from 'prop-types';
import { Row, Col } from 'xps-react/core';
import { Image } from 'shared-ui/image';
// import './index.scss';

const ProductPromoCard = ( props ) => {
  const { thumbnail, imageAlt, title, subTitle, descriptionList, description, promoSummary } = props;
  function getDescriptionList() {
    const list = descriptionList.map( ( each, index ) => <li key={ index }>{ each }</li> );
    return (
      <ul className='free-bundle-promo-content__list'>{ list }</ul>
    );
  }
  const promoSummaryElement = (
    <div className='free-bundle-promo__summary'>
      <div className='free-bundle-promo__summary--title'>Free</div>
      <div className='free-bundle-promo__summary--desc'>{ promoSummary }</div>
    </div>
  );
  return (
    <div className='free-bundle-promo'>
      <Row noGutters>
        <Col className='display-flex' md='8' xs='12'>
          <Image isThumbnail src={ thumbnail } alt={ imageAlt } />
          <div className='free-bundle-promo-content'>
            <div className='free-bundle-promo-content__title mb-10'>{ title }</div>
            <div className='free-bundle-promo-content__summary--mobile'>
              { promoSummaryElement }
            </div>
            { subTitle && <div className='free-bundle-promo-content__subtitle mb-10'>{ subTitle }</div> }
            { description && <div className='free-bundle-promo-content__desc'> { description }</div> }
            { descriptionList && getDescriptionList() }
          </div>
        </Col>
        <Col md='4' smHide className='justify-content-flex-end'>
          { promoSummaryElement }
        </Col>
      </Row>
    </div >
  );
};

ProductPromoCard.propTypes = {
  thumbnail: Proptypes.string.isRequired,
  imageAlt: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  subTitle: Proptypes.string,
  descriptionList: Proptypes.array,
  description: Proptypes.string,
  promoSummary: Proptypes.string
};

export default ProductPromoCard;