import Choice from './Choice'
import { nanoid } from 'nanoid'
import React from 'react';

export default function Question(props) {
    const { id, question, answers } = props
    const content = {__html: question}

    return (
        <div className='question-container'>
            <h3 className='question' dangerouslySetInnerHTML={content}/>
            <div className='choice-container'>
                {answers.map(choice => (
                    <Choice
                        key={nanoid()}
                        questionId={id}
                        answer={choice}
                    />
                ))}
            </div>
            <hr />
        </div>
    )
}