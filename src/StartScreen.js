import { switchGameStatus } from "./gameStatusSlice"
import { useDispatch } from "react-redux"


export default function StartScreen() {
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(switchGameStatus('get-questions'))
    }

    return (
        <div className='start-screen'>
            <h1>Quizzical</h1>
            <p>Ready for some Trivia?</p>
            <button onClick={handleClick}>Let's Go</button>
            <small>*This is a solo React-Redux project by Justin Zhao.</small>
        </div>
    )
}