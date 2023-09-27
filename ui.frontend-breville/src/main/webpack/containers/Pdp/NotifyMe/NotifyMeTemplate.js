import React, { useEffect, useState } from 'react';
import { func, object, string, arrayOf, shape } from 'prop-types';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { useDispatch } from 'react-redux';
import { setIsValid, setIsDirty } from 'library/store/checkout/actions';
import { Image } from 'components/shared-ui/image';
import {
  Form,
  Checkbox,
  Input,
  Validation
} from 'xps-react/core/form';
import {
  FormButton
} from 'xps-react/core/form/breville';

import { submitNotifyMeSalesForce } from 'library/store/global/service-request';
import { pageLoading } from 'library/store/ui/actions';

export const SFNotifyMeFormModalContent = ( { productName, showRecaptcha = false, onCloseModal, aemData, productVariantSKU, language, variants, country, recaptchSiteKey, onResponseFromService, onKeyPressOpen } ) => {
  const [variantDetail, setVariantDetail] = useState( null );
  const dispatch = useDispatch();

  useEffect( ()=>{
    variants.find( ( v ) =>{
      if ( v.variantSku === productVariantSKU ) {
        setVariantDetail( v );
      }
    } );
  }, [] );

  const [ id ] = useState( `recaptcha-${ aemData.formType }` );

  // onload of template recaptcha display
  useEffect( ()=>{
    initRecaptcha();
  }, [] );

  const _cache = {};
  _cache.widgetIDs = [];

  function initRecaptcha(){
    const captchaDivID = id;
    if ( $( `#${ captchaDivID }` ).length && $( `#${ captchaDivID }` ).is( ':empty' ) ){
      _cache.widgetIDs.push( window.grecaptcha.render( `${ captchaDivID }`, { sitekey: `${ recaptchSiteKey }`,
        theme: 'light',
        callback: 'onSubmitRecaptchaCallback',
        size: 'invisible',
        badge: 'inline'
      } ) );
    }
  }

  function handleSubmit( data ) {
    const PDPUrl = window.location.origin + window.location.pathname;
    const SFData = {
      AX_Item_Number: productVariantSKU,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      PDPUrl: PDPUrl,
      language: language,
      SubscribeToNewsletter: data.userconsent,
      region: country
    };

    dispatch( pageLoading( true ) );

    submitNotifyMeSalesForce( SFData )
    .then( ( res ) => {
      if ( res === undefined ) {
        onResponseFromService( 'No rsponse from service' );
      }
      else if ( res.success ) {
        if ( res.errors ){
          onResponseFromService( 'error', res.errors[0] );
        }
        else {
          onResponseFromService( 'success', 'Success' );
        }
      }
      else {
        onResponseFromService( 'error', aemData.dataSubmissionErrorMsgDesc, aemData.dataSubmissionErrorMsgTitle );
      }
    } )
    .catch( ( error ) => {
      console.error( error );
      onResponseFromService( 'error', error.message );// cors error
    } )
    .finally( () => {
      dispatch( pageLoading( false ) );
    } );
  }


  function callback( isValid, isDirty ) {
    dispatch( setIsValid( isValid ) );
    dispatch( setIsDirty( isDirty ) );
  }

  return (
    <Form onSubmit={ handleSubmit } formName={ aemData.formType } callback={ callback }>
      <button className='notify__close-btn' onClick={ onCloseModal } />
      <div className='modal__container'>
        <div className='modal__header'>
          <div className='modal__title'>{ aemData.formTitle }</div>
        </div>
        <div className='modal__header--product-detail'>
          <div className='modal__header--variant-image'>
            <Image src={ variantDetail?.variantPdpImg } alt={ productName } />
          </div>
          <div className='modal__header--variant-detail'>
            <div className='modal__header--variant-color'>
              { variantDetail?.variantColorTitle }
            </div>
            <div className='modal__header--variant-swatch'>
              <Image src={ variantDetail?.variantSwatchImg } alt={ variantDetail?.variantColor } />
            </div>
          </div>
        </div>
        <div className='modal__content'>
          <div className='modal__row'>
            <Input
              type={ 'text' }
              name={ 'firstName' }
              label= { `${ aemData.firstNameLabel }* ` }
              validation={{ required: aemData.firstNameRequiredErrorMsg }}
            />

            <Input
              type={ 'text' }
              name={ 'lastName' }
              label={ `${ aemData.lastNameLabel }* ` }
              validation={{ required: aemData.lastNameRequiredErrorMsg }}
            />
          </div>
          <div className='modal__row'>
            <Input
              type={ 'email' }
              name={ 'email' }
              label={ `${ aemData.emailLabel }* ` }
              validation={{ required: aemData.emailFormatErrorMsg, pattern: {
                    value: Validation.email.pattern.value,
                    message: aemData.emailFormatErrorMsg
                  } }}
            />
          </div>
        </div>
        <div className='modal__confirm-section'>
          <div className='modal__row'>
            <div className='mb-25'>
              <Checkbox
                name={ 'userconsent' }
              />
              { aemData?.notifymeconfirm && <span dangerouslySetInnerHTML={{ __html: aemData?.notifymeconfirm }}></span> }

            </div>
            { showRecaptcha && <div id={ id } className='recaptcha' /> }
          </div>
        </div>

        <div className='modal__footer'>
          <div className='modal__confirm-content'>{ aemData.userConsent }</div>
          <div className='modal__confirm-action'>
            <div className='react-flex'>
              <FormButton label={ aemData.submitBtnLabel } disabled={ false } />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

SFNotifyMeFormModalContent.defaultProps = {
  aemData: {}
};

SFNotifyMeFormModalContent.propTypes = {
  aemData: object,
  onResponseFromService: func,
  onKeyPressOpen: func,
  onCloseModal: func,
  productVariantSKU: string,
  language: string,
  variants: arrayOf( shape( {
    variantColor: string,
    variantColorTitle: string,
    variantPdpImg: string,
    variantSku: string,
    variantSwatchImg: string
  } ) ),
  country: string,
  recaptchSiteKey: string,
  productName: string

};