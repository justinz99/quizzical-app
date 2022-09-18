import { useDispatch } from "react-redux"
import { selectAnswer } from "./triviaGameSlice"
import { selectQuestionsById } from "./triviaGameSlice"
import { useSelector } from "react-redux"

export default function Choice(props) {
    let { questionId, answer } = props
    const appState = useSelector(state => state.gameStatus.status)
    const questionNode = useSelector(selectQuestionsById(questionId))
    const content = {__html: answer}

    const bgColor = () => {
        if (appState === 'game-over') {
            return { 
                backgroundColor: answer === questionNode.correct_answer ? 
                    '#94D7A2' 
                    : 
                    (answer === questionNode.userSelect ? '#F8BCBC' : '') 
            }
        } else {
            return { 
                backgroundColor: answer === questionNode.userSelect ? 
                '#D6DBF5' 
                : 
                '' 
            }
        }
    }

    const dispatch = useDispatch()

    function handleClick() {
        if (appState !== 'game-over') {    
            dispatch(selectAnswer({ id: questionId, answer: answer }))
        }
    }

    return (
        <div className='choice-btn' style={bgColor()} onClick={handleClick} dangerouslySetInnerHTML={content}/>
    )
}