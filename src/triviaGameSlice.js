import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
    questionsArray: [],
    score: 0
}

const triviaGameSlice = createSlice({
    name: 'triviaGame',
    initialState,
    reducers: {
        addQuestions: (state, action) => {
            const newQuestions = action.payload.map(question => {
                let answersList = [...question.incorrect_answers, question.correct_answer]
                let randNum = Math.floor(Math.random() * answersList.length)
                let temp = answersList[randNum]
                answersList[randNum] = answersList[answersList.length - 1]
                answersList[answersList.length - 1] = temp
        
                return (
                    {
                        id: nanoid(),
                        userSelect: '',
                        question: question.question,
                        answers: answersList,
                        correct_answer: question.correct_answer
                    }
                )
            })
            for (let question of newQuestions) {
                state.questionsArray.push(question)
            }
        },
        selectAnswer: (state, action) => {
            const target = state.questionsArray
            for (let i = 0; i < target.length; i++) {
                if (target[i].id === action.payload.id) {
                    if (target[i].correct_answer === action.payload.answer) {
                        state.score++
                    }
                    target[i] = {
                        ...target[i],
                        userSelect: action.payload.answer
                    }
                } 
            }
        },

        // reset questions data for new game
        resetTrivia: () => {
            return initialState
        }
    }
})

export const triviaGameReducer = triviaGameSlice.reducer
export const { addQuestions, selectAnswer, resetTrivia } = triviaGameSlice.actions

export const selectQuestions = (state) => {
    return state.triviaGame.questionsArray
}

export const selectQuestionsById = (id) => (state) => {
    return state.triviaGame.questionsArray.find(question => question.id === id)
}

export const selectScore = (state) => {
    return state.triviaGame.score
}