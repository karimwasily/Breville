import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import { algoliaService, useAlgolia } from 'xps-utils/algolia';
import { getAEMGlobalConfig } from 'xps-utils/aemGlobalConfig';
import { kebabToSnakeCase } from 'xps-utils/format';

// * using default algoliasearch so we do not overwrite credentials of breville algolia index on the service utility

export const useQuestionnaire = ( data, baristaChoiceQuestion ) => {
  const [ baristaChoiceProductDetails, isLoading, error ] = useAlgolia( baristaChoiceQuestion.productsList );

  const [question,
    setQuestion] = useState( {
    question: '',
    imagePath: '',
    imageAltText: '',
    customClass: '',
    facet: '',
    serial: '',
    answers: [
      {
        ansText: '',
        ansId: ''
      }
    ]
  } );
  const [answered,
    setAnswered] = useState( [] );
  const [isComplete,
    setIsComplete] = useState( false );
  const [coffeeProducts,
    setCoffeeProducts] = useState( [] );
  const [baristaChoiceFacet,
    setBaristaChoiceFacet] = useState( 0 );


  // on initial load
  useEffect( () => {
    if ( data === null ) {
      return;
    }
    // set first question when we have data
    const firstQuestion = data.questionAnswers[0];
    setQuestion( firstQuestion );
  }, [] );

  // number of questions for coffee plus one for barista's choice
  const numOfQuestions = () => data.questionAnswers.length + 1;

  const nextQuestion = ( updatedAnsweredState ) => {
    // grab the question via the serial number via the count
    // * so count of '2' would satisfy serial '2/5' or '2/2'
    const nextSerialNum = updatedAnsweredState.length + 1;
    const next = data
    .questionAnswers
    .filter( ( q ) => q.serial.indexOf( nextSerialNum ) === 0 )[0];

    setQuestion( next );
  };


  const sendResults = async ( facetList, baristaFacetValue ) => {
    const filterString = facetList.slice( 0, facetList.length - 1 ).reduce( ( acc, ans, index ) => { // remove last answer - barista's choice
      if ( ans.facetAnswer !== 'any' ) { // answer is skip of any - dont add to array
        acc = [
          ...acc, {
            facetName: data.questionAnswers[index].facet,
            facetValue: ans.facetAnswer
          }
        ];
      }
      return acc;
    }, [] );

    if ( baristaFacetValue && baristaFacetValue === 'barista' ) {
      // TODO: Fetch data from Barista's choice API
      return new Promise( ( resolve, reject ) => {
        if ( error ) reject( error );
        if ( !isLoading ) resolve( { hits: baristaChoiceProductDetails } );
      } );
      // return baristaChoiceProductDetails;
    }

    const { locale } = getAEMGlobalConfig();

    /** @see https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/ */
    const questionnaireFacetFilters = filterString.map( ( result ) => `${ result.facetName }:${ result.facetValue }` );
    const longTermProductsFilter = `WEB_TERM_${ kebabToSnakeCase( locale ) }:Long`;

    return algoliaService.searchBeanzIndex( '', {
      facetFilters: [...questionnaireFacetFilters, longTermProductsFilter],
      offset: 0,
      length: 3
    } );
  };

  const handleAnswer = ( answer, qaIndex = null ) => {
    // store
    let updatedAnsweredState;
    // change answer
    if ( qaIndex !== null && qaIndex < answered.length ) {
      updatedAnsweredState = answered.map( ( a, idx ) => ( idx === qaIndex
        ? answer
        : a ) );
    }
    else {
      // add answer
      updatedAnsweredState = [
        ...answered,
        answer
      ];
    }
    setAnswered( updatedAnsweredState );

    // logic
    if ( updatedAnsweredState.length !== numOfQuestions() ) {
      nextQuestion( updatedAnsweredState );
    }
    else {
      const baristaFacetValue = answer.facetAnswer;
      setBaristaChoiceFacet( baristaFacetValue );
      sendResults( updatedAnsweredState, baristaFacetValue ).then( ( res ) => {
        setCoffeeProducts( res?.hits ? res.hits : [] );
        console.log( 'Product List---', res.hits );
      } );
      setIsComplete( true );
    }
  };

  const startOver = () => {
    // reset state
    setIsComplete( false );
    setAnswered( [] );
    const firstQuestion = data.questionAnswers[0];
    setQuestion( firstQuestion );
  };

  return { question, answered, isComplete, handleAnswer, coffeeProducts, startOver, baristaChoiceFacet };
};
