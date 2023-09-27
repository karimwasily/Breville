import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { selectBundlePageUrl } from 'library/store/global/selector';
import Button from 'shared-ui/button';
import { useTranslation } from 'react-i18next';
import { Image } from 'shared-ui/image';

function CompleteBundleTile( { tile } ) {
  const { itemImgPath, itemImgAlt, itemTitle, itemDescription, itemPrice, itemPromotionPrice } = tile;

  return (
    <div className='complete-bundle__tile'>
      <img className='complete-bundle__tile-img' src={ itemImgPath } alt={ itemImgAlt } />
      <h6 className='complete-bundle__tile-title'>{ itemTitle }</h6>
      <p className='complete-bundle__tile-desc'>{ itemDescription }</p>
      <div className='complete-bundle__tile-price'>
        { itemPrice && <del>{ itemPrice }</del> }
        <span>{ itemPromotionPrice }</span>
      </div>
    </div>
  );
}

export function CompleteBundle( { productBundle, heroImgUrl } ) {
  const { t } = useTranslation();
  const bundlePageUrl = useSelector( selectBundlePageUrl );

  function handleGoToBundlePage() {
    window.location.href = bundlePageUrl;
  }

  if ( !productBundle ) return null;

  return (
    <div className='complete-bundle__wrapper'>
      <h2 className='complete-bundle__title'>{ t( 'pdp-make-complete-bundle' ) }</h2>
      <div className='complete-bundle__content'>
        <div className='complete-bundle__img-wrapper'>
          <Image src={ heroImgUrl } />
        </div>
        <div className='complete-bundle__plus-sign'>
          <Image src='/content/dam/breville-brands/coffee-solution/svg/plus.svg' />
        </div>
        <div className='complete-bundle__benefits-wrapper'>
          <div className='complete-bundle__tile-area'>
            { productBundle?.map( ( tile ) => <CompleteBundleTile key={ tile.itemTitle } tile={ tile } /> ) }
          </div>
          <Button className='complete-bundle__call-to-action-btn'
            textType='bold'
            colorScheme='purple-inverted'
            onClick={ handleGoToBundlePage }
          >
            { t( 'pdp-shopThisBundle' ) }
          </Button>
        </div>
      </div>
    </div>
  );
}

CompleteBundle.propType = {
  aemData: shape( {
    productBundle: arrayOf( shape( {
      itemTitle: string,
      itemImgPath: string,
      itemImgAlt: string,
      itemDescription: string,
      itemPrice: string,
      itemPromotionPrice: string
    } ) ),
    shopThisBundleLink: string
  } ),
  heroImgUrl: string
};