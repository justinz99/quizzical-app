import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuestions } from './triviaGameSlice'
import { switchGameStatus } from './gameStatusSlice'


export default function SelectTriviaForm() {

    const dispatch = useDispatch()

    const [questionFilter, setQuestionsFilter] = useState(
        {
            numQuestions: 10,
            category: 'any',
            difficulty: 'any',
            type: 'any'
        }
    )

    const [buttonText, setButtonText] = useState('Fetch Questions')

    function fillQuestionsFilter(e) {
        const {name, value} = e.target
        setQuestionsFilter(prevQuestionsFilter => ({
            ...prevQuestionsFilter,
            [name] : value
        }))
    }

    function handleClick(e) {
        e.preventDefault()
        setButtonText('Loading...')

        // make fetch URL
        let apiURL = 'https://opentdb.com/api.php?amount='+questionFilter.numQuestions
        if (questionFilter.category !== 'any') {
            apiURL = apiURL+'&category='+questionFilter.category
        }
        if (questionFilter.difficulty !== 'any') {
            apiURL = apiURL+'&difficulty='+questionFilter.difficulty
        }
        if (questionFilter.type !== 'any') {
            apiURL = apiURL+'&type='+questionFilter.type
        }
        

        async function fetchQuestions() {
            try {
                const response = await fetch(apiURL)
                const data = await response.json()
                if (data.response_code === '1') {
                    console.log('no questions fetched')
                }
                dispatch(addQuestions(data.results))
            } catch (err) {
                console.log(err)
            }
        }
        fetchQuestions()
        
        // start the game
        setTimeout(() => {
            dispatch(switchGameStatus('in-game'))
        }, 3000)
    }

    return (
        <form className='select-questions-form'>
            <label htmlFor='numQuestions'>Number of Questions</label>
            <input type='number' name='numQuestions' min='1' max='50' value={questionFilter.numQuestions} onChange={fillQuestionsFilter}/>
            <br />
            <label htmlFor='category'>Categories</label>
            <select name="category" value={questionFilter.category} onChange={fillQuestionsFilter}>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
            <br />
            <label htmlFor="difficulty">Select Difficulty</label>
            <select name="difficulty" value={questionFilter.difficulty} onChange={fillQuestionsFilter}>
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <br />
            <label htmlFor="type">Select Type</label>
            <select name="type" value={questionFilter.type} onChange={fillQuestionsFilter}>
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
            </select>
            <button onClick={handleClick}>{buttonText}</button>
        </form>
    )
}