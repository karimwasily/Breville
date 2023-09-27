// TODO: this is just to mimic server API as for this current moment it is unknown

const defaultProduct = {
  title: 'Variety Coffee',
  origin: 'Brooklyn NY',
  logoImg: {
    url:
      '/content/dam/breville-brands/coffee-solution/logo_b75a27e8-5826-4ca0-995b-8717c062f851_170x%201.png'
  },
  descriptionImg: {
    url: 'content/dam/testimages/woman.png'
  },
  description:
    'Road House is a seasonally rotating coffee. In a word, our house blend. Instead of being a dumping ground for old coffees, however, Road House is driven by our high-integrity buying practice of sourcing the finest, rarest, freshest, and most delicious green coffees in the world. Also, very tasty.',
  products: [
    {
      objectID: 'MBZ31847CWA01012Z',
      productName: 'Bronson Blend',
      displayPrice: '$15.50',
      WEB_FLAVOURNOTES_en_US: 'Chocolate | Caramel | Smokey',
      WEB_ROASTLEVEL_en_US: 'Darker Roast',
      vendorNumber: 'VEN31847',
      vendorName: 'Verve',
      tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
    },
    {
      objectID: 'MBZ31828CWA01012Z',
      productName: 'The Retro',
      displayPrice: '$18',
      WEB_FLAVOURNOTES_en_US: 'Chocolate | Caramel | Candied Nuts',
      WEB_ROASTLEVEL_en_US: 'Darker Roast',
      vendorNumber: 'VEN31828',
      vendorName: 'Coffee-Project-NY',
      tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
    },
    {
      objectID: 'MBZ31327CWA03010Z',
      productName: 'Monarch',
      displayPrice: '$16.50',
      WEB_FLAVOURNOTES_en_US: 'Chocolate | Caramel | Blueberries',
      WEB_ROASTLEVEL_en_US: 'Dark Roast',
      vendorNumber: 'VEN31327',
      vendorName: 'Onyx',
      tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
    }
  ]
};

const brandProducts = {
  2: {
    title: 'Portola',
    origin: 'Brooklyn NY',
    logoImg: {
      url: '/content/dam/breville-brands/coffee-solution/image%2099.png'
    },
    descriptionImg: {
      url: 'content/dam/testimages/woman.png'
    },
    description:
      'Portola is a your daily coffee. In a word, our house blend. Instead of being a dumping ground for old coffees, however, Road House is driven by our high-integrity buying practice of sourcing the finest, rarest, freshest, and most delicious green coffees in the world. Also, very tasty.',
    products: [
      {
        objectID: '1001',
        productName: 'Portola 1',
        displayPrice: '$58',
        WEB_FLAVOURNOTES_en_US: 'Nutty | Flowers | Dark Chocolate',
        WEB_ROASTLEVEL_en_US: 'Dark Roast',
        vendorNumber: 'VEN31313',
        vendorName: 'Portola',
        tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
      },
      {
        objectID: '1002',
        productName: 'Portola 2',
        displayPrice: '$36',
        WEB_FLAVOURNOTES_en_US: 'Nutty | Spice | Milk Chocolate',
        WEB_ROASTLEVEL_en_US: 'Light Roast',
        vendorNumber: 'VEN31313',
        vendorName: 'Portola',
        tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
      },
      {
        objectID: '1003',
        productName: 'Portola 3',
        displayPrice: '$22',
        WEB_FLAVOURNOTES_en_US: 'Nutty | Spice | Milk Chocolate',
        WEB_ROASTLEVEL_en_US: 'Medium Roast',
        vendorNumber: 'VEN31313',
        vendorName: 'Portola',
        tile_image: '/content/dam/breville-brands/coffee-solution/beanz-page/benefit-subscription.png'
      }
    ]
  }
};

const fetchBrandDetailsAPI = ( brandId ) => {
  return brandProducts[brandId]
    ? { id: brandId, ...brandProducts[brandId] }
    : { id: brandId, ...defaultProduct };
};

export default fetchBrandDetailsAPI;
