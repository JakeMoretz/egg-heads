/* eslint-disable react/prop-types */
import React from 'react';
import he from 'he';
import classnames from 'classnames';

export default function Quiz(props) {
    const [selectedButton, setSelectedButton] = React.useState(null);

    React.useEffect(() => {
        setSelectedButton(null);
    }, [props.question]);

    const decodedQuestions = he.decode(props.question);
    const decodedAnswers = props.answers.map((answer) => he.decode(answer));

    function holdAnswer(index) {
        setSelectedButton(index);
    }

    return (
        <section className="page-2-container">
            <button onClick={props.turnPage} className="back-btn">
                Back
            </button>
            <h3>{decodedQuestions}</h3>
            <div className="answer-options">
                {decodedAnswers.map((answer, index) => {
                    const isSelected = selectedButton === index;
                    const isCorrect = props.correctAnswers.includes(answer);

                    const buttonClassNames = classnames({
                        'answer-btn': true,
                        'selected-btn': isSelected,
                        'correct-answer': isCorrect,
                    });

                    return (
                        <button
                            key={index}
                            className={buttonClassNames}
                            onClick={() => holdAnswer(index)}
                        >
                            {answer}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
