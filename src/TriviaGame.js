import { useSelector, useDispatch } from 'react-redux'
import { resetTrivia } from './triviaGameSlice'
import { switchGameStatus } from './gameStatusSlice'
import Question from './Question'
import React from 'react'

export default function TriviaGame() {

    const appState = useSelector(state => state.gameStatus.status)
    const questionsData = useSelector(state => state.triviaGame.questionsArray)
    let score = useSelector(state => state.triviaGame.score)

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
        console.log(appState)
        if (appState === 'game-over') {
            dispatch(switchGameStatus('start'))
            dispatch(resetTrivia())
        } else {
            if (questionsData.length === 0) {
                dispatch(switchGameStatus('get-questions'))
            } else {
                dispatch(switchGameStatus('game-over'))
            }
        }
    }

    return (
        <div className='quizzical-game'>
            {questionsData.length === 0 ?
                <p className='noQuestionsMsg'>No questions within criteria found.</p>
                : questionComponents
            }
            {(appState === 'game-over') && <p>You scored {score} correct answers.</p>}
            <button className='checkAns-btn' onClick={handleClick}>
                {(appState === 'game-over') ? 
                    'New Game' 
                    : questionsData.length === 0 ? 'Update Criteria' : 'Check Answers'
                }
            </button>
        </div>
    )

}