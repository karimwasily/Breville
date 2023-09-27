import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object, func } from 'prop-types';
import { Grid, Row, Col, Button, ActionModal } from 'xps-react/core';
import { Form, Select, FormButton } from 'xps-react/core/form';
import AddressFormModal from 'components/mybreville-components/template/addresses/address-form-modal';
import { selectMySubscriptionsPauseDropdown, selectIsError } from 'library/store/mybreville/selector';
import { cancelASubscription, setNotificationText } from 'library/store/mybreville/actions';
import { useSelector } from 'react-redux';
import { formatDateLongMonth } from '../../../my-orders/helpers';
import { HARD_CODE_CREDIT_CARD } from '../../../constants';
import SelectModal from './select-modal';

const EditSubscriptionForm = ( props ) => {
  const dispatch = useDispatch();
  const { data: subscription, onFormSubmit, onFormCancel, onSubscriptionUpdated } = props,
    { t } = useTranslation(),
    isError = useSelector( selectIsError ),
    [openAddressFormModal, setOpenAddressFormModal] = useState( false ),
    [openCancelSubModal, setOpenCancelSubModal] = useState( false );

  const pauseSubscriptionDates = useSelector( selectMySubscriptionsPauseDropdown );
  let timeFrameOptions = [];
  const defaultDropdown = [].concat( { value: '', label: `${ t( 'eh-time-frame-label' ) }` } );
  if ( pauseSubscriptionDates?.length ){
    timeFrameOptions = defaultDropdown.concat( pauseSubscriptionDates?.map( ( data ) => {
      const formatedDate = formatDateLongMonth( data.date );
      return { value: `${ data.date }+${ data.iteration }`, label: `${ data.iteration } ${ t( 'eh-time-frame-dropdown' ) } ${ formatedDate }` };
    } ) );
  }
  let payType = '';
  if ( subscription?.paymenttype && subscription?.paymenttype !== '' ) {
    payType = t( `eh-${ subscription?.paymenttype.toLowerCase().split( ' ' )
    .join( '-' ) }` );
  }

  function showAddressFormModal( evt ) {
    // Prevents form from submitting.
    evt?.preventDefault();

    setOpenAddressFormModal( true );
  }

  function hideAddressFormModal() {
    setOpenAddressFormModal( false );
  }

  function showCancelSubscriptionModal( evt ) {
    // Prevents form from submitting.
    evt?.preventDefault();
    setOpenCancelSubModal( true );
  }

  function hideCancelSubscriptionModal() {
    setOpenCancelSubModal( false );
  }

  function doCancelSubscriptionModal() {
    dispatch( cancelASubscription( {
      standingOrderId: subscription?.standingorderid,
      successCallback: onSubscriptionUpdated
    } ) );
    dispatch( setNotificationText( t ( !isError ? 'eh-message-subsciption-cancelled' : 'eh-message-password-change-failure' ) ) );
  }

  function hidePaymentFormModal() {
    console.log( 'hidePaymentFormModal' );
  }

  return (
    <div className='edit-subscription-form'>
      <Form formName='editSubscriptionForm' onSubmit={ onFormSubmit }>
        <section>
          <h4 className='cmp-mybreville__section-header'>{ t( 'eh-page-title-edit-addresses' ) }</h4>
          <Grid className='cmp-edit-sub-grid'>
            <Row noGutters={ true } className='sub-row'>
              <Col>
                <Select name={ 'shippingAddress' } label={ `${ t( 'eh-order-details-heading-shipping-address' ) }` } options={ [] } defaultValue={ '' } />
              </Col>
              <Col>
                <Select name={ 'billingAddress' } label={ `${ t( 'eh-order-details-heading-billing-address' ) }` } options={ [] } defaultValue={ '' } />
              </Col>
            </Row>
            <Row>
              <Button
                href=''
                className='btn-cta-link'
                type='link'
                onClick={ showAddressFormModal }
              >{ `+ ${ t( 'eh-label-link-add-address' ) } ` }</Button>
            </Row>
          </Grid>
        </section>
        <section>
          <h4 className='cmp-mybreville__section-header'>{ t( 'eh-order-details-heading-payment-method' ) }</h4>
          <Grid className='cmp-edit-sub-grid'>
            <Row noGutters={ true } className='sub-row'>
              <Col>
                <span className='form-label'>
                  { payType }
                </span>
                {
                  ( subscription?.paymenttype === 'Credit Card' ) &&
                  // Hard coded because CT data is not available yet
                  <p>{ HARD_CODE_CREDIT_CARD }</p>
                }
              </Col>
            </Row>
          </Grid>
        </section>
        <section>
          <h4 className='cmp-mybreville__section-header'>{ t( 'eh-pause-subscription' ) }</h4>
          <Grid className='cmp-edit-sub-grid'>
            <Row noGutters={ true } className='sub-row'>
              <Col>
                <SelectModal name={ 'timeframe' } label={ `${ t( 'eh-text-timeframe' ) } *` } options={ timeFrameOptions } defaultValue={ '' } title={ t( 'eh-pause-subscription' ) } cancelText={ t( 'eh-button-cancel' ) } ctaText={ t( 'eh-button-confirm' ) } modelDescription={ t( 'eh-label-paused-until' ) } />
              </Col>
              <Col></Col>
            </Row>
            <Row noGutters={ true } className='sub-row mt-20'>
              <Button
                disabled={ false }
                href='#'
                className='btn-cta-link btn-big-cta'
                type='link'
                onClick={ showCancelSubscriptionModal }
              >
                { t( 'eh-cancel-subscription' ) }
              </Button>
            </Row>
          </Grid>
        </section>
        <section>
          <Grid className='cmp-edit-sub-grid'>
            <Row noGutters={ true } className='sub-row'>
              <Col className='cmp-form-buttons'>
                <Button label='Cancel' disabled={ false } className='cmp-button cancel' onClick={ onFormCancel }>
                  { t ( 'eh-button-cancel' ) }
                </Button>
                <FormButton className='cmp-button save' label='Save' />
              </Col>
              <Col></Col>
            </Row>
          </Grid>
        </section>
      </Form>
      <ActionModal isModalOpen= { openCancelSubModal }
        title={ t( 'eh-cancel-subscription' ) }
        cancelText={ t( 'eh-button-subscription-cancel' ) }
        onCancel={ hideCancelSubscriptionModal }
        ctaText={ t( 'eh-button-subscription-cta' ) }
        onCta={ doCancelSubscriptionModal }
        onModalClosed={ hideCancelSubscriptionModal }
      >
        { t( 'eh-cancel-subscription-body' ) }
      </ActionModal>
      <AddressFormModal isModalOpen={ openAddressFormModal } onModalClosed={ hideAddressFormModal } onCancelEdit={ hideAddressFormModal } />
    </div>
  );
};

EditSubscriptionForm.defaultProps = {
  data: {},
  onFormSubmit: () => void 0,
  onFormCancel: () => void 0
};

EditSubscriptionForm.propTypes = {
  data: object,
  onFormSubmit: func,
  onFormCancel: func
};

export default EditSubscriptionForm;