// import React from 'react';
import React, { Children, cloneElement, useEffect, useState } from 'react';
// import { array, number, func } from 'prop-types';
// import { register } from 'enquire.js';
import { addPropertyControls, ControlType } from "framer"
import {AccordionItem} from "./"

const Accordion = ( props ) => {
  const { initIndex } = props;
  const [curIndex, setCurIndex] = useState( 0 );

  const setIndex = ( index ) => {
    setCurIndex( index );
  };

  const content = props.content.map((content) => {
		return <AccordionItem initIndex={initIndex} key={content.item} label={content.label} index={content.index} />;
	});


  Accordion.callback = setIndex;

  useEffect( () => {
    setCurIndex( initIndex );
  }, [initIndex] );


  return ( <div className='accordion'>
    {content}
    {/* { Children.map( props.children, ( child ) => cloneElement( child, { curIndex, setIndex } ) ) } */}
  </div> );
};

// Accordion.propTypes = {
//   children: array,
//   initIndex: number
// };

export default Accordion;

Accordion.defaultProps = {
	initIndex: 0,
	index: 0,
	label: "label",
}

addPropertyControls(Accordion, {
  initIndex: {
    title: "Index",
    type: ControlType.Number,
    defaultValue: 0,
  },
  index: {
    title: "Index",
    type: ControlType.Number,
    defaultValue: 0,
  },
  label: {
    title: "label",
    type: ControlType.String,
  },
  	content: {
		type: ControlType.Array,
		control: {
			type: ControlType.Object,
			controls: {
				index: { type: ControlType.Number, defaultValue: 0 },
				label: { type: ControlType.String, defaultValue: "Label" },
			},
		},
		defaultValue: [
			{ index: 0, label: "a" },
			{ index: 1, label: "b" },
			{ index: 2, label: "c" },
			{ index: 3, label: "d" },
		],
	},


})