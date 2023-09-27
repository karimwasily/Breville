import React from 'react';
// import Proptypes from 'prop-types';
import { addPropertyControls, ControlType } from "framer"


function Loader(props){
    // if(!props.isLoading) return null
    return(
        <div className='page-loader-wrapper'>
           <svg className="page-loader-spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
            </svg>
        </div>
    )
}

// Loader.propTypes = {
//     isLoading: Proptypes.bool.isRequired
// }
export default Loader;

Loader.defaultProps = {
    isLoading: false
}

  
addPropertyControls(Loader, {
    isLoading: {
        title: "isLoading",
        type: ControlType.Boolean,
    },
  })