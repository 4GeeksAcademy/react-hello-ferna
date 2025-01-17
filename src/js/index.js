//import react into the bundle
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import "../styles/index.css";
import PropTypes from "prop-types";

function SimpleCounter(props) {
    return (
        <div className="bigCounter">
            <div className="calendar">
                <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="four">{props.digitFour}</div>
            <div className="three">{props.digitThree}</div>
            <div className="two">{props.digitTwo}</div>
            <div className="one">{props.digitOne}</div>
            <button onClick={props.onReset}>Reiniciar</button>
            <button onClick={props.onTogglePause}>
                {props.isRunning ? "Pausar" : "Reanudar"}
            </button>
        </div>
    );
}

SimpleCounter.propTypes = {
    digitFour: PropTypes.number.isRequired,
    digitThree: PropTypes.number.isRequired,
    digitTwo: PropTypes.number.isRequired,
    digitOne: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
    onTogglePause: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
};

function App() {
    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1000);
            return () => clearInterval(interval); 
        }
    }, [isRunning]); 

    const resetCounter = () => setCounter(0);

    const togglePause = () => setIsRunning(!isRunning);

    const four = Math.floor(counter / 1000) % 10;
    const three = Math.floor(counter / 100) % 10;
    const two = Math.floor(counter / 10) % 10;
    const one = Math.floor(counter / 1) % 10;

    return (
        <SimpleCounter
            digitFour={four}
            digitThree={three}
            digitTwo={two}
            digitOne={one}
            onReset={resetCounter}
            onTogglePause={togglePause}
            isRunning={isRunning}
        />
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
