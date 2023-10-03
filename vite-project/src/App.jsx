import './App.css';
import React from 'react';
import Quiz from './components/Quiz';

export default function App() {
    const [page2, setPage2] = React.useState(false);
    const [triviaData, setTriviaData] = React.useState({});
    const [questions, setQuestions] = React.useState([]);
    const [shuffledOptions, setShuffledOptions] = React.useState([]);

    // get all questions to display
    // React.useEffect(() => {
    //     fetch('https://opentdb.com/api.php?amount=5')
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const fetchedQuestions = data.results.map((question) => question.question);
    //         setQuestions(fetchedQuestions);
    //       })
    //       .catch(error => console.error('Error fetching questions:', error));
    //   }, []);

   
    
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
          .then((res) => res.json())
          .then((data) => {
            setQuestions(data.results);
            // Shuffle answer options whenever questions change
            const allOptions = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
            const shuffledOptions = shuffleOptions(allOptions);
            setShuffledOptions(shuffledOptions);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);
    
      const shuffleOptions = (options) => {
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
      };
    

    function turnPage() {
        setPage2((prevState) => !prevState);
    }

    return (
        <main>
            {page2 ? (
                questions.map((question, index) => (
                    <Quiz
                        key={index}
                        turnPage={turnPage}
                        triviaData={triviaData}
                        question={question}
                        answers = {shuffledOptions}
                    />
                ))
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
