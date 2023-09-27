import { useEffect, useState } from 'react';

const categoriesMock = [
  {
    category: 'nespresso',
    amount: 59
  },
  {
    category: 'espresso',
    amount: 43
  },
  {
    category: 'blenders',
    amount: 25
  },
  {
    category: 'juicers',
    amount: 24
  },
  {
    category: 'ovens',
    amount: 24
  },
  {
    category: 'tea',
    amount: 19
  },
  {
    category: 'mixers',
    amount: 16
  },
  {
    category: 'toasters',
    amount: 16
  },
  {
    category: 'coffeegrinders',
    amount: 12
  },
  {
    category: 'coffee',
    amount: 8
  },
  {
    category: 'grillsandsandwichmakers',
    amount: 8
  },
  {
    category: 'cookers',
    amount: 7
  },
  {
    category: 'immersionblenders',
    amount: 6
  },
  {
    category: 'woksskilletsanddeepfryers',
    amount: 6
  },
  {
    category: 'foodprocessors',
    amount: 5
  },
  {
    category: 'microwaves',
    amount: 5
  },
  {
    category: 'wafflemakers',
    amount: 5
  },
  {
    category: 'commercial',
    amount: 4
  },
  {
    category: 'accessories',
    amount: 2
  },
  {
    category: 'bluicers',
    amount: 2
  },
  {
    category: 'smokinggun',
    amount: 2
  },
  {
    category: 'sousvide',
    amount: 2
  },
  {
    category: 'breadmakers',
    amount: 1
  },
  {
    category: 'icecreammakers',
    amount: 1
  },
  {
    category: 'wineproducts',
    amount: 1
  }
];

export const useCategories = ( algoliaService, categoryFacetName ) => {
  const [categories, setCategories] = useState( [] );

  useEffect( () => {
    algoliaService.getFacetValues( categoryFacetName ).then( ( values ) => {
      // create array of objects with { category, amount }
      const categoriesData = Object.entries( values ).map( ( [category, amount] ) => ( { category: category.toLowerCase(), amount } ) );
      console.log( categoriesData.map( ( c ) => c.category ) );
      setCategories( categoriesData );
    } );
  }, [] );

  return [categories, setCategories];
};

