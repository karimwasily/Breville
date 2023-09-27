import React from 'react';
import { Button } from 'xps-react/core';
import { object } from 'prop-types';
import { withAem } from 'xps-utils/withAem';

const ButtonModalList = ( { aemData } ) => {

  const { buttonList, title,faqButtonLink } = aemData;

  const handleClick = () =>{
    window.open(faqButtonLink, "_blank", "noopener noreferrer" );
  }
  return (
    <div className='buttonmodallist-cmp'>
      <h2 className='buttonmodallist-cmp__header'>
        { title }
      </h2>
      <div className='buttonmodallist-cmp__wrapper'>
        { buttonList?.map( ( item, i ) =>
          <Button
            key={ i }
            className='buttonmodallist-cmp__button'
            size='medium'
            onClick={handleClick}
            colorScheme='black'
            textType='bold'
            icon='arrow-right'
          >
            { item?.buttonLabel }
          </Button>
          )
        }
      </div>
    </div>
  );
};

ButtonModalList.propTypes = {
  aemData: object
};

export default withAem( ButtonModalList );
