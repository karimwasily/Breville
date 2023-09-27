import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectGeneralAemData } from 'library/store/mybreville/selector';
import SvgIcon from 'xps-react/core/icon';

function MyMasterclassesEmpty() {
  const { t } = useTranslation();
  const generalAemData = useSelector( selectGeneralAemData );
  const eventBriteUrl = generalAemData?.eventBriteUrl;

  return (
    <div className='my-masterclasses-panel'>
      <div className='my-masterclasses-panel__wrapper'>
        <div className='my-masterclasses-panel__header'> { t( 'eh-my-masterclasses-panel-title' ) } </div>
        <div className='my-masterclasses-panel__content'> { t( 'eh-my-masterclasses-panel-coming-soon' ) } </div>
        <div className='my-masterclasses-panel__button-container'>
          <a className='my-masterclasses-panel__button-container--button'
            href={ eventBriteUrl || '#' }
            rel='noopener noreferrer'
            target='_blank'
          >
            { t( 'eh-my-masterclasses-panel-button' ) }
          </a>
        </div>
      </div>
      <span className='my-masterclasses-panel__right-chevron'>
        <SvgIcon size='12px' iconName='next12' theme='oneFillBlack' />
      </span>
    </div>
  );
}

MyMasterclassesEmpty.propTypes = {

};

export default MyMasterclassesEmpty;
