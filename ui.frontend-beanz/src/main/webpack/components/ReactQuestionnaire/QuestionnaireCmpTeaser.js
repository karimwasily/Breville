import React from 'react';
import { object, string, array, func, bool } from 'prop-types';

// * if extended then 'startover' view should be refactored away from 'question' views

const CmpTeaser = ( {
    title,
    description,
    imagePath,
    imageAltText,
    className = '',
    facet,
    helpText,
    serial,
    answers,
    handleAnswer,
    isComplete,
    startOverMsg = 'Your Perfect Match!',
    startOverBtnLabel = 'Start over',
    startOver,
    ...props
} ) => {

    function handleStartOver( e ) {

        e.preventDefault();
        startOver();

    }

    function handleClick( answer ) {
        return ( e ) => {
            e.preventDefault();
            answer.facet = facet;
            handleAnswer( answer );
        };
    }

    return (
        <div className={ `teaser cmp-teaser--reactquestionnaire ${ className }` } { ...props }>
            <div className='cmp-teaser'>
                <div className='cmp-teaser__image'>
                    <div className='cmp-image' itemType='http://schema.org/ImageObject'>
                        <img
                            src={ imagePath }
                            className='cmp-image__image'
                            itemProp='contentUrl'
                            alt={ imageAltText }
                        />
                    </div>
                </div>

                <div className='cmp-teaser__content'>
                    { !isComplete && serial ? (
                        <div className='cmp-teaser__pretitle'>{ serial }</div>
          ) : null }

                    <h1 className='cmp-teaser__title'>
                        { isComplete ? startOverMsg : title }
                    </h1>

                    { !isComplete && description ? (
                        <div className='cmp-teaser__description'>
                            <p className='cmp-text__description-p'>{ description }</p>
                        </div>
          ) : null }

                    <div className='cmp-teaser__action-container'>
                        { !isComplete ? (
              answers.map( ( answer, idx ) => {

                return (
                    <a
                        key={ answer.ansId }
                        onClick={ handleClick ( answer ) }
                        className='cmp-teaser__action-link'
                        href='#'
                        style={ /** @type {React.CSSProperties} */ ( { ['--index']: idx } ) }
                    >
                        { answer.ansText }
                    </a>
                );

} )
            ) : (
                <a
                    onClick={ handleStartOver }
                    className='cmp-teaser__action-link'
                    href='#'
                >
                    { startOverBtnLabel }
                </a>
            ) }
                    </div>
                </div>
            </div>
        </div>
    );

};

CmpTeaser.propTypes = {
    title: string.isRequired,
    description: string,
    imagePath: string.isRequired,
    imageAltText: string.isRequired,
    facet: string.isRequired,
    helpText: string,
    className: string,
    serial: string,
    answers: array.isRequired,
    handleAnswer: func.isRequired,
    isComplete: bool.isRequired,
    startOverMsg: string,
    startOverBtnLabel: string,
    startOver: func.isRequired,
    props: object
};

export default CmpTeaser;
