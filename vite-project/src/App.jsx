import './App.css';
import React from 'react';
import Quiz from './components/Quiz';
import { nanoid } from 'nanoid';
import he from 'he';

export default function App() {
    const [page2, setPage2] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState([]);
    const [showNewButton, setShowNewButton] = React.useState(true);

    const shuffleOptions = (options) => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    };

    React.useEffect(() => {
        setCorrectAnswers([])
        fetch('https://opentdb.com/api.php?amount=5')
            .then((res) => res.json())
            .then((data) => {
                const shuffledQuestions = data.results.map((question) => {
                    const allOptions = [
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ];
                    const shuffledOptions = shuffleOptions(allOptions);
                    return {
                        ...question,
                        id: nanoid(),
                        answers: shuffledOptions,
                    };
                });
                setQuestions(shuffledQuestions);
            })
            .catch((error) =>
                console.error('Error fetching questions:', error)
            );
    }, []);

    React.useEffect(() => {
        console.log(correctAnswers);
    }, [correctAnswers]);

    function checkAnswers() {
        const correct = questions.map((question) => question.correct_answer);
        setCorrectAnswers(correct);
        setShowNewButton(false);
    }

    const handleReloadQuiz = () => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then((res) => res.json())
            .then((data) => {
                const shuffledQuestions = data.results.map((question) => {
                    const allOptions = [
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ];
                    const shuffledOptions = shuffleOptions(allOptions);
                    return {
                        ...question,
                        id: nanoid(),
                        answers: shuffledOptions,
                    };
                });
                setQuestions(shuffledQuestions);
                setCorrectAnswers([])
                setShowNewButton(true);
            })
            .catch((error) =>
                console.error('Error fetching questions:', error)
            );
    };

    function turnPage() {
        setPage2((prevState) => !prevState);
    }

    return (
        <main>
            {page2 ? (
                <div>
                    {questions.map((question, index) => (
                        <Quiz
                            key={index}
                            turnPage={turnPage}
                            question={question.question}
                            answers={question.answers}
                            correctAnswers={correctAnswers}
                        />
                    ))}

                    {showNewButton && (
                        <button onClick={checkAnswers}>Check Answers</button>
                    )}
                    {!showNewButton && <div>Answers checked!</div>}
                    {!showNewButton && (
                        <button onClick={handleReloadQuiz}>
                            New Questions
                        </button>
                    )}
                </div>
            ) : (
                <section className="page-1-container">
                    <h1 className="title">Egg Heads</h1>
                    <p className="description">
                        Dive into a world of diverse questions spanning various
                        categories, challenge your friends, and enjoy a fun and
                        educational experience anytime, anywhere.
                    </p>
                    <button onClick={turnPage} className="start-btn">
                        Start Quiz
                    </button>
                </section>
            )}
        </main>
    );
}
