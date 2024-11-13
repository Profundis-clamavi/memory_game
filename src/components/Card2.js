// Filename - App.js

import React, { useState } from "react";
import "./Card.css";
const Card2 = ({ front = "front", background = "red" }) => {
    const cardFront = front;
    const cardBack = "Computer Science Portal.";
    const [isFlipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!isFlipped);
    };

    return (
        <div className="container">
            <button
                className="flip-button"
                onClick={handleFlip}><div
                    className={`flip-card ${isFlipped ? "flipped" : ""
                        }`}
                >
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className="card-content">
                                {cardFront}
                            </div>

                        </div>
                        <div className="flip-card-back" style={{
                            backgroundColor: background
                        }}>
                            <div className="card-content">
                                {cardBack}
                            </div>

                        </div>
                    </div>
                </div>

            </button>

        </div>
    );
};

export default Card2;
