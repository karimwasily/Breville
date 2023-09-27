import React from 'react';
import { ReactCart } from '../../components/ReactCart';
import { object } from "prop-types";
import { withAem } from "library/utils/withAem";

const Cart = ( { props, aemData } ) => {

  return (
    <div>
      <ReactCart aemData={aemData}/>
    </div>
  );

};

Cart.displayName = 'Cart';
Cart.propTypes = {
  aemData: object,
};
export default withAem(Cart);