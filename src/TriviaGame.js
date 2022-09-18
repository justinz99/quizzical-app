import { useSelector,useDispatch } from 'react-redux'
import { resetTrivia, selectQuestions, selectScore } from './triviaGameSlice'
import { switchGameStatus } from './gameStatusSlice'
import Question from './Question'
import React from 'react'

export default function TriviaGame() {

    const appState = useSelector(state => state.gameStatus.status)
    const questionsData = useSelector(selectQuestions)
    let score = useSelector(selectScore)

    console.log(questionsData)
    
    const dispatch = useDispatch()

    const questionComponents = questionsData.map(quizNode => (
        <Question
            key={quizNode.id}
            id={quizNode.id}
            question={quizNode.question}
            answers={quizNode.answers}
        />
    ))

    function handleClick() {
        if (appState === 'game-over') {
            dispatch(switchGameStatus('start'))
            dispatch(resetTrivia())
        } else {
            dispatch(switchGameStatus('game-over'))
        }
    }

    return (
        <div className='quizzical-game'>
            {questionsData.length === 0 ? 
                <p className='noQuestionsMsg'>No questions found, please adjust your criteria.</p> 
                : 
                questionComponents
            }
            {(appState === 'game-over') && <p>You scored {score} correct answers.</p>}
            <button className='checkAns-btn' onClick={handleClick}>
                {(appState === 'game-over') ? 'New Game' : 'Check Answers'}
            </button>
        </div>
    )

}