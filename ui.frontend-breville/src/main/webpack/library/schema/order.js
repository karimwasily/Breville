export const CreateOrder = `mutation ($id: String!, $version: Long!, $locale: Locale!) {
     createMyOrderFromCart(draft: {id: $id, version: $version}) { ...OrderFields } 
    } 
    fragment OrderFields on Order { 
        id 
        orderNumber
        createdAt
        lineItems { 
            id 
            name(locale: $locale) 
            productSlug(locale: $locale) 
            quantity 
            price { value { ...MoneyFields } discounted { value { ...MoneyFields } } } 
            custom{ customFieldsRaw{ name value } } 
            totalPrice { ...MoneyFields } 
            variant {
                sku
                images { url }
                attributesRaw { 
                    name 
                    value
                    attributeDefinition { type { name } name label(locale: $locale) }
                }
            }
        } 
        totalPrice { ...MoneyFields }
        shippingInfo { 
            shippingMethod {
                name
                localizedDescription(locale: $locale) 
            } 
            price { ...MoneyFields }
        }
        taxedPrice { 
            totalGross { ...MoneyFields } 
            totalNet { ...MoneyFields }
        }
        discountCodes { 
            discountCode { id code name(locale: $locale) }
        }
        shippingAddress { ...AddressFields }
        billingAddress { ...AddressFields }
        paymentInfo { 
            payments { 
                paymentStatus { interfaceCode }
            }
        }
    }
    fragment MoneyFields on Money {
        centAmount
        currencyCode
        fractionDigits
    }
    fragment AddressFields on Address {
        firstName
        lastName
        streetName
        additionalStreetInfo
        postalCode
        city
        country
        phone
        email
    }`;