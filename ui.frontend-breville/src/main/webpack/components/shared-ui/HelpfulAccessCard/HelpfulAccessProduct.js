import React from 'react';
import { string, number } from 'prop-types';
import Button from 'components/shared-ui/button';

const HelpfulAccessProduct = ({ name, imageThb, imageAlt, price }) =>    
    <div className="helpful-access-card__product">
        <div className="helpful-access-card__thumbnail">
            <img className="helpful-access-card__img" src={imageThb} alt={ imageAlt } />
        </div>
        <div className="helpful-access-card__content">
            <div>
                <h4 className="helpful-access-card__name">{name}</h4>
                <h4 className="helpful-access-card__price">${price.toFixed(2)}</h4>
            </div>
            <div>
                <Button 
                    colorScheme="black" 
                    size="small" 
                    textType="bold" 
                    className='helpful-access-card__btn'
                >
                    Add
                </Button>
            </div>
        </div>    
    </div>;

HelpfulAccessProduct.propTypes = {
    name: string,
    price: number,
    imageThb: string,
    imageAlt: string,
};
    
export default HelpfulAccessProduct;
