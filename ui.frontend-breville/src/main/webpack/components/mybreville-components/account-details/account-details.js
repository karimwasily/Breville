import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectDerivedUserDetail, selectAddresses } from 'library/store/mybreville/selector';
import { Grid, Row, Col } from 'xps-react/core/layout';
import PersonalDetails from './components/personal-details';
import ContactPreferences from './components/contact-preferences';
import Security from './components/security';
import SavedAddressesView from './saved-addresses/saved-addresses-view';

const AccountDetails = () => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const userDetail = useSelector( selectDerivedUserDetail );
  const contactPointAddresses = useSelector( selectAddresses );
  const { FirstName, LastName, PersonEmail, Phone } = userDetail || {};

  return (
    <Grid fluid className='cmp-mybreville__account-details'>
      <Row>
        <Col lg={ 6 } className='cmp-mybreville__account-details-column'>
          <div className='cmp-mybreville__tile'>
            <PersonalDetails firstName={ FirstName } lastName={ LastName } email={ PersonEmail } phone={ Phone } pagePath={ `${ url }/edit-account-details` } />
          </div>
          <div className='cmp-mybreville__tile'>
            <ContactPreferences text={ t( 'eh-text-update-your-mailing-preference' ) } pagePath={ `${ url }/contact-preferences` } />
          </div>
          <div className='cmp-mybreville__tile'>
            <Security pagePath={ url } />
          </div>
        </Col>
        <Col lg={ 6 } className='cmp-mybreville__account-details-column'>
          <div className='cmp-mybreville__tile'>
            <SavedAddressesView addresses={ contactPointAddresses } pagePath={ `${ url }/saved-addresses` } />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

AccountDetails.propTypes = {};

export default AccountDetails;
