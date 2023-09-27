export const mockData = [
  {
    imageURL: 'https://dev-new.breville.com/content/dam/breville-brands/coffee-solution/category-tiles/ovens.jpg',
    itemName: 'the Smart Oven Pro',
    serialNumber: '12345678910',
    isRegistered: true,
    isWarrantyItem: true,
    warrantyDate: '2021-08-16T08:52:43.000Z'
  },
  {
    imageURL: 'https://dev-new.breville.com/content/dam/breville-brands/coffee-solution/category-tiles/espresso.jpg',
    itemName: 'the Barista Touch',
    serialNumber: '12i1h00000327QDABY',
    isRegistered: true,
    isWarrantyItem: true,
    warrantyDate: '2021-08-25T08:52:43.000Z'
  }
];

export const mockProductData = [
  {
    attributes: {
      type: 'Asset',
      url: '/services/data/v52.0/sobjects/Asset/02i1h00000327QDAAY'
    },
    Id: '12i1h00000327QDABY',
    Product2: {
      attributes: {
        type: 'Product2',
        url: '/services/data/v52.0/sobjects/Product2/01t0L00000B3m8qQAB'
      },
      Name: 'BES500BTR',
      Product_Type__c: 'FG'
    },
    Product_AX_Item_Number__c: 'BES500BTR1BUS1',
    Item_Description__c: 'the Bambino Plus Black Truffle',
    EW_End__c: '2023-09-03',
    EW_Start__c: '2021-09-03',
    Warranty_In_Months__c: 24.0,
    Status: 'Registered',
    Hide_Asset__c: false,
    PurchaseDate: '2021-08-01',
    CustomerRegistrationDate__c: '2021-08-30'
  },
  {
    attributes: {
      type: 'Asset',
      url: '/services/data/v52.0/sobjects/Asset/02i1h00000327QIAAY'
    },
    Id: '02i1h00000327QIABY',
    Product2: {
      attributes: {
        type: 'Product2',
        url: '/services/data/v52.0/sobjects/Product2/01tE0000008ZbzAIAS'
      },
      Name: 'BCP600SIL',
      Product_Type__c: 'FG'
    },
    Product_AX_Item_Number__c: 'BCP600SILUSC',
    Item_Description__c: 'the Citrus Press Silver',
    EW_End__c: null,
    EW_Start__c: null,
    Warranty_In_Months__c: 12.0,
    Status: 'Registered',
    Hide_Asset__c: false,
    PurchaseDate: '2021-08-10',
    CustomerRegistrationDate__c: '2021-08-30'
  },
  {
    attributes: {
      type: 'Asset',
      url: '/services/data/v52.0/sobjects/Asset/02i1h00000327QDAAY'
    },
    Id: '12i1h00000327QDACY',
    Product2: {
      attributes: {
        type: 'Product2',
        url: '/services/data/v52.0/sobjects/Product2/01t0L00000B3m8qQAB'
      },
      Name: 'BES500BTR',
      Product_Type__c: 'FG'
    },
    Product_AX_Item_Number__c: 'BES500BTR1BUS1',
    Item_Description__c: 'the Bambino Plus Black Truffle 2',
    EW_End__c: '2023-09-03',
    EW_Start__c: '2021-09-03',
    Warranty_In_Months__c: 24.0,
    Status: 'Registered',
    Hide_Asset__c: false,
    PurchaseDate: '2021-08-01',
    CustomerRegistrationDate__c: '2021-08-30'
  },
  {
    attributes: {
      type: 'Asset',
      url: '/services/data/v52.0/sobjects/Asset/02i1h00000327QNAAY'
    },
    Id: '02i1h00000327QNAAY',
    Product2: {
      attributes: {
        type: 'Product2',
        url: '/services/data/v52.0/sobjects/Product2/01t0L00000AhIg9QAF'
      },
      Name: 'BMO850BSS',
      Product_Type__c: 'FG'
    },
    Product_AX_Item_Number__c: 'BMO850BSS1BUC1',
    Item_Description__c: 'The Smooth Wave',
    EW_End__c: null,
    EW_Start__c: null,
    Warranty_In_Months__c: null,
    Status: 'Registered',
    Hide_Asset__c: false,
    PurchaseDate: '2021-07-14',
    CustomerRegistrationDate__c: '2021-08-30'
  },
  {
    attributes: {
      type: 'Asset',
      url: '/services/data/v52.0/sobjects/Asset/02i1h00000327QIAAY'
    },
    Id: '02i1h00000327QIAAY',
    Product2: {
      attributes: {
        type: 'Product2',
        url: '/services/data/v52.0/sobjects/Product2/01tE0000008ZbzAIAS'
      },
      Name: 'BCP600SIL',
      Product_Type__c: 'FG'
    },
    Product_AX_Item_Number__c: 'BCP600SILUSC',
    Item_Description__c: 'the Citrus Press Silver 2',
    EW_End__c: null,
    EW_Start__c: null,
    Warranty_In_Months__c: 12.0,
    Status: 'Registered',
    Hide_Asset__c: false,
    PurchaseDate: '2021-08-10',
    CustomerRegistrationDate__c: '2021-08-30'
  }
];

// Not used old mock tuotial data. Existing purpose: provides reference on certain fields
export const _oldTutorialData = [
  {
    imageURL: 'https://uat.breville.com/content/dam/breville/us/mybreville/video-4.png',
    category: 'Barista Pro',
    productname: 'Setting up your Barista Pro',
    chef: 'Barista Brian',
    categoryColor: 'product-tutorial__category-cream',
    id: 1,
    playlistName: 'Unboxing & Setup',
    playlistDesc: 'Learn how to get your machine setup and running correctly.'
  },
  {
    imageURL: 'https://uat.breville.com/content/dam/breville/us/mybreville/video-6.png',
    category: 'Ovens',
    productname: 'Smart Oven Pro: Baking',
    chef: 'Barista Brian',
    categoryColor: 'product-tutorial__category-orange',
    id: 2,
    playlistName: 'First Use',
    playlistDesc: 'How to use your machine for the first time and pull your first espresso shot.'
  },
  {
    imageURL: 'https://uat.breville.com/content/dam/breville/us/mybreville/video-5.png',
    category: 'Juicers',
    productname: 'High vs low speed',
    chef: 'Barista Brian',
    categoryColor: 'product-tutorial__category-green',
    id: 3,
    playlistName: 'Unboxing & Setup',
    playlistDesc: 'Learn how to get your machine setup and running correctly.'
  }
];

export const tutorialData = {
  id: 1639,
  className: 'tipsGroup',
  title: 'The Oracle Touch Tutorials',
  locales: [
    'en_US'
  ],
  product: {
    id: 987,
    className: 'product',
    slug: 'BOV950',
    locales: [
      'en_US'
    ],
    firstUseRecipe: {
      id: 989,
      className: 'recipe'
    },
    upsellTitle: null,
    upsellText: null,
    upsellLink: null,
    ftux: null,
    version: '139',
    lastModified: '2021-09-06T06:53:01+0200'
  },
  items: [
    {
      id: 1638,
      className: 'tips',
      title: 'Machine Setup',
      locales: [
        'en_US'
      ],
      image: null,
      items: [
        {
          title: 'Machine Setup - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Machine Setup - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        }
      ],
      version: '30',
      lastModified: '2021-09-14T15:14:46+0200'
    },
    {
      id: 1638,
      className: 'tips',
      title: 'Interface Guide',
      locales: [
        'en_US'
      ],
      image: null,
      items: [
        {
          title: 'Interface Guide - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Interface Guide - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Interface Guide - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Interface Guide - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Interface Guide - How to prepare parts before use',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'EDmf_P04XFA',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        },
        {
          title: 'Interface Guide - How to install and fill water tank',
          subTitle: null,
          nextButtonLabel: null,
          showApplianceMonitor: null,
          showBackButton: null,
          showSkipButton: null,
          pageType: 'default',
          theme: 'light',
          link: null,
          image: null,
          video: [
            'KHv_0ugHhUQ',
            'youtube'
          ],
          defaultVideo: false,
          tags: [
            {
              id: 1636,
              className: 'tags',
              locales: [
                'en_US'
              ],
              tag: 'Coffee',
              tagColor: {},
              version: '11',
              lastModified: '2021-09-14T11:26:18+0200'
            }
          ],
          type: 'simplePage'
        }
      ],
      version: '30',
      lastModified: '2021-09-14T15:14:46+0200'
    }
  ],
  version: 3,
  lastModified: '2021-09-15T05:55:41+0200'
};
