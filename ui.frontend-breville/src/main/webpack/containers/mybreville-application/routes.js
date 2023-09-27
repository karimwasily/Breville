import { MyBreville } from 'components/mybreville-components/mybreville';
import { AccountDetails, EditAccountDetails, SavedAddressesList, ContactPreferences, ChangePassword, EditAddress } from 'components/mybreville-components/account-details';
import { MyOrders, OrderDetails } from 'components/mybreville-components/my-orders';
import { MySubscriptions, EditSubscription } from 'components/mybreville-components/my-subscriptions';
import { MyMachineDetails } from 'components/mybreville-components/my-machine-details';
import { Masterclasses } from 'components/mybreville-components/masterclasses';

const routes = [
  {
    path: `/`,
    name: 'eh-page-title-mybreville',
    component: ( MyBreville ),
    routes: [
      {
        path: '/account-details',
        name: 'eh-page-title-account-details',
        component: ( AccountDetails ),
        routes: [
          {
            path: '/edit-account-details',
            name: 'eh-page-title-edit-account-details',
            component: ( EditAccountDetails ),
            hideInNav: true
          },
          {
            path: '/saved-addresses',
            name: 'eh-page-title-saved-addresses',
            component: ( SavedAddressesList ),
            hideInNav: true,
            routes: [
              {
                path: '/new',
                name: 'eh-page-title-add-address',
                component: ( EditAddress ),
                hideInNav: true
              },
              {
                path: '/:addressId',
                name: 'eh-page-title-edit-address',
                component: ( EditAddress ),
                hideInNav: true
              }
            ]
          },
          {
            path: '/change-password',
            name: 'eh-page-title-change-password',
            component: ( ChangePassword ),
            hideInNav: true
          },
          {
            path: '/contact-preferences',
            name: 'eh-page-title-contact-preference',
            component: ( ContactPreferences ),
            hideInNav: true
          }
        ]
      },
      {
        path: '/my-orders',
        name: 'eh-page-title-my-orders',
        component: ( MyOrders ),
        routes: [
          {
            path: '/:orderId',
            name: 'eh-page-title-order-details',
            component: ( OrderDetails ),
            hideInNav: true
          }
        ]
      },
      {
        path: '/my-subscriptions',
        name: 'eh-page-title-my-subscriptions',
        component: ( MySubscriptions ),
        routes: [
          {
            path: '/:subscriptionId',
            name: 'eh-page-title-edit-subscription',
            component: ( EditSubscription ),
            hideInNav: true
          }
        ]
      },
      {
        path: '/my-machine-details',
        name: 'eh-page-title-my-machine-details',
        component: ( MyMachineDetails ),
        hideInNav: true
      },
      {
        path: '/masterclasses',
        name: 'eh-page-title-masterclasses',
        component: ( Masterclasses ),
        hideInNav: true
      }
    ]
  }
];

export { routes };
