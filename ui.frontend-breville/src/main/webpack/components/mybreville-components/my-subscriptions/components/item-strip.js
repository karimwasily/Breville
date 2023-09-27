import React from 'react';
import { string } from 'prop-types';
import { SUBSCRIPTION_STATUS } from '../../constants';
import { useTranslation } from 'react-i18next';

const ItemStrip = ( { title, status, date } ) => {
  const { t } = useTranslation();

  return (
    <div className='item-strip'>
      <div className='strip-start'>
        <p>
          <span className='label-font-weight-bold'>
            { title }
          </span>
        </p>
      </div>
      <div className='strip-end'>
        <p>
          <span className={ `label-font-weight-bold status--${ status }` }>
            { t( `eh-status-${ status }` ) }
          </span>
          {
            ( status === SUBSCRIPTION_STATUS.paused ) &&
            <span className='status--paused-date'>{ ` - ${ t( `eh-text-date-until` ) } ${ date }` }</span>
          }
        </p>
      </div>
    </div>
  );
};

ItemStrip.propTypes = {
  title: string,
  status: string,
  date: string
};

export default ItemStrip;