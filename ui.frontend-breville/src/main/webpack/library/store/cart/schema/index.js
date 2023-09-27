import { schema, normalize } from 'normalizr';

const processStrategy = ( current, parent )=> {
  // transform your data here
  return {
    ...current,
    type: 'prouduct'
  };
};

const product = new schema.Entity( 'products', {}, { processStrategy } );
const cartData = new schema.Entity( 'cart', { data: [product] }, { idAttribute: ()=>'cartData' } );

export default ( response )=>{
  const posts = response?.data?.posts;
  const normalized = normalize( posts, cartData );
  return normalized.entities;
};