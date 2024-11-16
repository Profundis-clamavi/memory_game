// Filename - App.js

import React, { useState } from "react";
import "./Card.css";
const Card2 = ({ front = "front", background = "red", onFlip, isFlipped, isHidden }) => {
    const cardFront = front;
    const cardBack = "Computer Science Portal.";
    // const cardVis = isHidden ? { visibility: 'hidden', transition: 'opacity 1s' } : {};
    const cardVis = isHidden
        ? { opacity: 0, pointerEvents: 'none', transition: 'opacity 0.5s' }
        : {};
    // const [isFlipped, setFlipped] = useState(false);

    // const handleFlip = () => {
    //     setFlipped(!isFlipped);
    //     if (onFlip) {
    //         onFlip();
    //     }
    // };
    // const handleFlip = () => {
    //     setFlipped(!isFlipped);
    //     if (onFlip) {
    //         onFlip(id);
    //     }
    // };


    return (
        <div className="container" style={cardVis}>
            <button
                className="flip-button"
                onClick={onFlip}><div
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
