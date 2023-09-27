import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import { SwitchTransition } from 'react-transition-group';
import { CSSTransitionMod } from './CssTransitionMod';
import CmpContainer from './QuestionnaireCmpContainer';
import CmpTeaser from './QuestionnaireCmpTeaser';
import Result from './QuestionnaireResult';
import { withAem } from 'library/utils/withAem';
import algoliasearch from 'algoliasearch/lite';

const ReactQuestionnaire = ( { aemData } ) => {
    const [products, setProducts] = useState([])
    const [ question, setQuestion ] = useState( {
        question: '',
        imagePath: '',
        imageAltText: '',
        customClass: '',
        facet: '',
        serial: '',
        answers: [ { ansText: '', ansId: '', facet: '' } ]
    } );
    const [ answered, setAnswered ] = useState( [] );
    const [ isComplete, setIsComplete ] = useState( false );

    const searchClient = algoliasearch( aemData.algoliaAppId, aemData.algoliaSearchApiKey );
        

    const getIndex = (index = aemData.algoliaIndexName) =>
    searchClient.initIndex(index)


    const getFacetValues = async facetList => {
        const filterString = facetList.reduce((acc, ans) => {
            if (ans.facetAnswer !== 'any') {
              acc = [...acc, {facetName: ans.facet, facetValue: ans.facetAnswer}]
            }
            return acc
          }, [])
        return getIndex().search('', {
            facetFilters: filterString.map(result => `${result.facetName}:${result.facetValue}`),
        })
    }
    // on initial load
    useEffect( () => {

        if ( !aemData.questionAnswers ) return;
        // set first question when we have data
        const firstQuestion = aemData.questionAnswers[0];
        setQuestion( firstQuestion );

    }, [ aemData ] );

    const numOfQuestions = () => aemData.questionAnswers.length;

    const nextQuestion = ( updatedAnsweredState ) => {

        // grab the question via the serial number via the count
        // * so count of '2' would satisfy serial '2/5' or '2/2'
        const nextSerialNum = updatedAnsweredState.length + 1;
        const next = aemData.questionAnswers.filter(
            ( q ) => q.serial.indexOf( nextSerialNum ) === 0
        )[0];

        setQuestion( next );

    };

    function handleAnswer( answer ) {

        // store
        const updatedAnsweredState = [ ...answered, answer ];
        
        setAnswered( updatedAnsweredState );

        // logic
        if ( updatedAnsweredState.length !== numOfQuestions() ) {
            nextQuestion( updatedAnsweredState );

        }
        else {
            document.querySelector(".spinner__dialog").classList.remove('hidden');
            getFacetValues(updatedAnsweredState)
            .then(data => {
                data.hits = shuffle(data.hits);
                setProducts(data.hits)
            })
            setIsComplete( true );
            // utility( updatedAnsweredState );

        }

    }
    function shuffle (o){
        for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function startOver() {

        // reset state
        setIsComplete( false );
        setAnswered( [] );
        const firstQuestion = aemData.questionAnswers[0];
        setQuestion( firstQuestion );

    }

    if ( !aemData.questionAnswers ) return null;
    return (
        <div
            id={ aemData?.id ? aemData.id : 'cmp-reactquestionnaire' }
            className={ isComplete ? 'cmp-reactquestionnaire--complete' : '' }
        >
            <CmpContainer>
                <SwitchTransition>
                    <CSSTransitionMod key={ question.question }>
                        <CmpTeaser
                            handleAnswer={ handleAnswer }
                            answers={ question.answers }
                            title={ question.question }
                            description=''
                            imagePath={ question.imagePath }
                            imageAltText={ question.imageAltText }
                            className={ question.customClass || '' }
                            facet={ question.facet }
                            helpText={ question.helpText }
                            serial={ question.serial }
                            isComplete={ isComplete }
                            startOverMsg={ aemData.resultPageText || 'Your Perfect Match!' }
                            startOverBtnLabel={ aemData.startOver || 'Start over' }
                            startOver={ startOver }
                        />
                    </CSSTransitionMod>
                </SwitchTransition>
            </CmpContainer>

            <CSSTransitionMod in={ isComplete } >
                <Result 
                    products={ products } 
                />
            </CSSTransitionMod>
        </div>
    );

};

ReactQuestionnaire.propTypes = {
    aemData: object
};

export default withAem( ReactQuestionnaire );
