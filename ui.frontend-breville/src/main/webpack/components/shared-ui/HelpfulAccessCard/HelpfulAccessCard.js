import React from 'react';
import HelpfulAccessProduct from './HelpfulAccessProduct';

const AccessProduct = [
    {
        name: 'the Knock Box',
        imageThb: 'https://publish-p30002-e99017.adobeaemcloud.com/content/breville/language-masters/en/coffee-landing-page/_jcr_content/root/container/container/container_1619175835/teaser_copy_1350094821.coreimg.png/1619411538910/frame-372.png',
        imageAlt: 'the Knock Box',
        price: 29.95
    },
    {
      name: 'the Knock Box Mini',
      imageThb: 'https://publish-p30002-e99017.adobeaemcloud.com/content/breville/language-masters/en/coffee-landing-page/_jcr_content/root/container/container/container_1619175835/teaser_copy_1350094821.coreimg.png/1619411538910/frame-372.png',
      imageAlt: 'the Knock Box',
      price: 19.95
  }
]


const HelpfulAccessCard = () => {   
    return (       
        <div className="helpful-access-card">
          <h3 className="helpful-access-card__title">Helpful Accessories</h3>
          <p className="helpful-access-card__subtitle">
            These maintenance supplies will keep your coffee tasting fresh and your machine running smoothly.
          </p>
          {
            AccessProduct.map((props, index) => <HelpfulAccessProduct key={index} {...props}/>)
          }
        </div>
      )
}

export default HelpfulAccessCard;
