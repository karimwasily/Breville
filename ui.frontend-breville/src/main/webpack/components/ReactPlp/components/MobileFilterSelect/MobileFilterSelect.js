import React from 'react'
import { bool, func, string } from 'prop-types'
import classNames from 'classnames'
import { ClearRefinements, RefinementList } from 'react-instantsearch-dom'
import Button from 'components/shared-ui/button'
import { CustomRangeSlider } from 'components/shared-ui/AlgoliaCustomWidgets'

/**
 * Mobile Filter Menu
 * @param {{isActive?: boolean, close: function, back: function, attribute: string, useRangeSlider: boolean, sortList: function}} param0
 * @returns {React.ReactElement}
 */
export const MobileFilterSelect = ({
  isActive = false,
  close,
  back,
  attribute,
  useRangeSlider,
  sortList,
}) => {
  return (
    <div className={classNames('mobile-filter-select', { hidden: !isActive })}>
      <div className='mobile-filter-select__header'>
        <div className='mobile-filter-select__left'>
          <button
            onClick={back}
            className='mobile-filter-select__back-btn'
          ></button>
          <h3 className='mobile-filter-select__title'>{attribute}</h3>
        </div>
        <ClearRefinements
          attribute={attribute}
          translations={{ reset: 'Clear' }}
        />
      </div>

      <div className='mobile-filter-select__body'>
        {useRangeSlider ? (
          <CustomRangeSlider attribute={attribute} />
        ) : (
          <RefinementList attribute={attribute} transformItems={sortList} />
        )}
      </div>

      <Button
        colorScheme='green'
        size='large'
        onClick={close}
        className='mobile-filter-select__apply-btn'
      >
        APPLY
      </Button>
    </div>
  )
}

MobileFilterSelect.defaultProps = {
  isActive: false,
}

MobileFilterSelect.propTypes = {
  isActive: bool,
  back: func,
  close: func,
  attribute: string,
  useRangeSlider: bool,
  sortList: func,
}
