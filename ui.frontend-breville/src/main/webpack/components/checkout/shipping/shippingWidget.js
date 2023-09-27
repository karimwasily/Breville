import React from 'react';
import { useSelector } from 'react-redux';
import { selectName } from 'library/store/user/selector';
import Shipping from './shipping';
import ShippingAuth from './shipping-auth';

const ShippingWidget = (props) => {
    const name = useSelector( selectName ); 
    return name ? <ShippingAuth { ...props } /> : <Shipping { ...props } />
}

export default ShippingWidget;
