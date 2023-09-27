import React from 'react';
import PhoneSvg from 'resources/svgs/phone.svg';
import EmailSvg from 'resources/svgs/email-web.svg';
import { useTranslation } from 'react-i18next';


const RemoveAccountContent = () => {
  const { t } = useTranslation();
  const email = t( 'eh-support-email-label', 'customerservice@mail.com' );
  const phoneLabel = t( 'eh-support-phone-number-label', '+1 866-273-8455' );
  const phone = phoneLabel?.replace( /\s+/g, '' );

  return (
    <div >
      <p>{ t( 'eh-text-remove-account' ) }</p>
      <div className='remove-account__actions'>
        <p>
          <EmailSvg className='remove-account__icon' />
          <a
            className='remove-account__email'
            href={ `mailto:${ email }` }
          >
            { email }
          </a>
        </p>
        <p>
          <PhoneSvg className='remove-account__icon' />
          <a
            href={ `tel:${ phone }` }
          >
            { phoneLabel }
          </a>
        </p>
      </div>
    </div>

  );
};

export default RemoveAccountContent;