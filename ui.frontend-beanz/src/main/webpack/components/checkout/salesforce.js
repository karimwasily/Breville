export const salesforce =
{
  totalSize: 1,
  done: true,
  records: [
    {
      attributes: {
        type: 'Account',
        url: '/services/data/v49.0/sobjects/Account/0011h00000lx4JCAAY'
      },
      Id: '0011h00000lx4JCAAY',
      Name: 'Aravind S',
      Shipping_Street_Line_1__c: 'k',
      Shipping_Street_Line_2__c: 'k',
      FirstName: 'Aravind',
      LastName: 'S',
      Phone: '1123456789',
      PersonEmail: 'aravind.nirman@yopmail.com',
      ShippingStreet: 'k\nk',
      ShippingCity: 'Chicago',
      ShippingPostalCode: '94089',
      ShippingStateCode: 'CA',
      ShippingCountryCode: 'US',
      ShippingState: 'CA',
      ShippingCountry: 'USA',
      ContactPointAddresses: {
        totalSize: 2,
        done: true,
        records: [
          {
            attributes: {
              type: 'ContactPointAddress',
              url: '/services/data/v49.0/sobjects/ContactPointAddress/8lW1h000000CaYhEAK'
            },
            Id: '8lW1h000000CaYhEAK',
            ParentId: '0011h00000lx4JCAAY',
            Name: 'shippingAltAddressOneForm',
            Street: 'YOGIRAJ\nk',
            City: 'k',
            PostalCode: '94089',
            State: 'CA',
            StateCode: 'CA',
            CountryCode: 'US',
            Country: 'USA',
            IsDefault: false,
            AddressType: 'Shipping',
            Shipping_Street_Line_1__c: 'YOGIRAJ',
            Shipping_Street_Line_2__c: 'k',
            CreatedDate: '2021-06-16T07:46:02.000+0000'
          },
          {
            attributes: {
              type: 'ContactPointAddress',
              url: '/services/data/v49.0/sobjects/ContactPointAddress/8lW1h000000CaYmEAK'
            },
            Id: '8lW1h000000CaYmEAK',
            ParentId: '0011h00000lx4JCAAY',
            Name: 'shippingAltAddressTwoForm',
            Street: 'Mahajan\nk',
            City: 'k',
            PostalCode: '94089',
            State: 'CA',
            StateCode: 'CA',
            CountryCode: 'US',
            Country: 'USA',
            IsDefault: false,
            AddressType: 'Shipping',
            Shipping_Street_Line_1__c: 'Mahajan',
            Shipping_Street_Line_2__c: 'k',
            CreatedDate: '2021-06-16T07:46:10.000+0000'
          }
        ]
      }
    }
  ]
};