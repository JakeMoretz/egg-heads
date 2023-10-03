/* eslint-disable react/prop-types */


export default function Quiz(props) {
    return (
        <section className="page-2-container">
            <button onClick={props.turnPage} className="back-btn">
                Back
            </button>
            <h3>{props.question.question}</h3>
            {props.answers.map((answer, index) => (
                <button key={index}>{answer}</button>
            ))}
        </section>
    );
}
