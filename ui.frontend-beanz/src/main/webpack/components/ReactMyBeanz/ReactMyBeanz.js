import React from 'react';
import ArrowRight from '../../resources/svgs/arrow-right.svg';
import CallUs from '../../resources/svgs/callus_P_16.svg';
import ExternalLink from '../../resources/svgs/External-Link-Icon.svg';
import { NavLink, Link } from 'react-router-dom';
import { withAem } from 'library/utils/withAem';
import { object } from 'prop-types';
import { getauthemail } from 'xps-utils/authtokendatahandler';

const ReactMyBeanz = ( { aemData } ) => {
  const email = getauthemail();
  return (
    <div className='cmp-my-beanz__root'>
      <h1 className='cmp-text-my-beanz__header'>{ aemData.myBeanzHeading }</h1>
      <p className='cmp-text-my-beanz__email'>{ email }</p>
      <div className='cmp-container-my-beanz__contents'>
        <ul className='purchase-appliances cmp-container-my-beanz__content--ul'>
          <p className='cmp-text-my-beanz__content--header'>{ aemData.purchaseHeading }</p>
          <li className="cmp-container-my-beanz__content--li"><a href={ aemData.orderLink } className='cmp-text-my-beanz__content--a'>{ aemData.orderText }<span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
          <li className="cmp-container-my-beanz__content--li"><a href={ aemData.subscriptionLink } className='cmp-text-my-beanz__content--a'>{ aemData.subscriptionText }<span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
        </ul>
        <ul className='cmp-container-my-beanz__content--acc-details cmp-container-my-beanz__content--ul'>
          <p className='cmp-text-my-beanz__content--header'>{ aemData.accountSectionHeading }</p>
          <li className="cmp-container-my-beanz__content--li"><a href={ aemData.personalDetailsLink } className='cmp-text-my-beanz__content--a'>{ aemData.personalDetailsText }<span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
        </ul>
        <ul className='cmp-container-my-beanz__content--help-support cmp-container-my-beanz__content--ul'>
          <p className='cmp-text-my-beanz__content--header'>{ aemData.helpSupportHeading }</p>
          <li className="cmp-container-my-beanz__content--li"><a href= { `tel:${ aemData.contactNumber }` } className='cmp-text-my-beanz__content--a'><span>{ aemData.callUsText } <span className='cmp-text-my-beanz__content--a--call-now'>Call Now</span></span><span className='cmp-icon-my-beanz__content--icons'><CallUs /></span></a></li>
          <li className="cmp-container-my-beanz__content--li"><a rel='noopener noreferrer' href={ `${ aemData.createSupportLink }` } target='_blank' className='cmp-text-my-beanz__content--a'>{ aemData.createSupportText } <span className='cmp-icon-my-beanz__content--icons'><ExternalLink /></span></a></li>
          <li className="cmp-container-my-beanz__content--li"><a rel='noopener noreferrer' href={ `${ aemData.updateSupportLink }` } target='_blank' className='cmp-text-my-beanz__content--a'>{ aemData.updateSupportText } <span className='cmp-icon-my-beanz__content--icons'><ExternalLink /></span></a></li>
        </ul>
      </div>
    </div>
  );
};

ReactMyBeanz.propTypes = {
  aemData: object
};

export default withAem( ReactMyBeanz );
