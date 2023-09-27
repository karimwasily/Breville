import React, { useState } from 'react';
import { arrayOf, object, number } from 'prop-types';

const Selector = ( props ) => {
  const { options = [], selectedOption = 0 } = props;
  const [selected, setSelected ] = useState( selectedOption );

    const handleChange = (event) => {
        setSelected(Number(event.target.value));
    }
    
    return (   
        <div  className='selectitem'>
            <div className='selectitem__img-wrap'>
                <img src={options[selected].img} alt={options[selected].name}/>
            </div> 
            <select className='selectitem__input' onChange={handleChange} value={selected} title="Select">
                {
                    options.map(({ name }, index) =>  <option key={index} value={index} >{name}</option>)
                }
      </select>
    </div>
  );
};

Selector.propTypes = {
  options: arrayOf( object ),
  selectedOption: number
};

export default Selector;
