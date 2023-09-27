import React from 'react';
import { string } from 'prop-types';
import Button from 'shared-ui/button';
import { useTranslation } from 'react-i18next';

const OrderSummaryEmpty = () => {

    const productsPagePath = 'https://breville.com/';
    const { t } = useTranslation();

    return (
        <div className="ordersummary-empty">
            <p className="ordersummary-empty__label">{t('eh-label-ordersummary-no-orders')}</p>
            <div>
                <Button
                    label={ t( 'eh-button-orders-discover-products' ) }
                    disabled={ false }
                    className="react-button--color-scheme-green ordersummary-empty__button"
                    children="Discover Products"
                    onClick={ () => location.replace(productsPagePath) }
                />
            </div>
        </div>  
    );
}

OrderSummaryEmpty.propTypes = {
    productsPagePath: string,
};

export default OrderSummaryEmpty;
