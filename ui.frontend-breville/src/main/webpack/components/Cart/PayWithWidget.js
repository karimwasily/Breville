import React from 'react';
import VisaSvg from 'resources/svgs/visa.svg';
import AmexSvg from 'resources/svgs/amex.svg';
import MasterCardSvg from 'resources/svgs/mastercard.svg';
import DiscoverSvg from 'resources/svgs/discover.svg';
import ApplePaySvg from 'resources/svgs/apple-pay.svg';
import PayPalSvg from 'resources/svgs/pay-pal.svg';
import PayPalCreditSvg from 'resources/svgs/pay-pal-credit.svg';
import AffirmSvg from 'resources/svgs/affirm-card.svg';

export const payWithWidget = () => {

    return (
        <section className='cmp-cart-pay-with'>
            <h3 className='cmp-cart-pay-with__title'>You can pay with</h3>
            <section className='cmp-cart-pay-with__options'>
                <VisaSvg />
                <AmexSvg />
                <MasterCardSvg />
                <DiscoverSvg />
                <ApplePaySvg />
                <PayPalSvg />
                <PayPalCreditSvg />
                <AffirmSvg />
            </section>
        </section>
    );

};


export default payWithWidget;