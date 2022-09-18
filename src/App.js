import React from 'react'
import SelectTriviaForm from './SelectTriviaForm'
import StartScreen from './StartScreen'
import TriviaGame from './TriviaGame'
import { useSelector } from 'react-redux'


export default function App() {

    const appState = useSelector(state => state.gameStatus.status)

    return (
        <div>
            {
                appState === 'start' ?
                    <StartScreen />
                    :
                    appState === 'get-questions' ?
                        <SelectTriviaForm />
                        :
                        <TriviaGame />
            }
        </div>
    )
}