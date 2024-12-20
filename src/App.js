// import logo from './logo.svg';
import './App.css';
import './components/Card.js';
// import Card from './components/Card.js';
import Card2 from './components/Card2.js';
import { useState, useEffect } from 'react';
import Stopwatch from './components/Stopwatch.js';

function App() {
  const cssColors = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure",
    "beige", "bisque", "blue",
    "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson",
    "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray",
    "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange",
    "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue",
    "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
    "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen",
    "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod",
    "gray", "green", "greenyellow", "honeydew", "hotpink",
    "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue",
    "lightyellow", "lime", "limegreen", "linen", "magenta",
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred",
    "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite",
    "navy", "oldlace", "olive", "olivedrab", "orange",
    "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise",
    "palevioletred", "papayawhip", "peachpuff", "peru", "pink",
    "plum", "powderblue", "purple", "rebeccapurple", "red",
    "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
    "seagreen", "seashell", "sienna", "silver", "skyblue",
    "slateblue", "slategray", "snow", "springgreen", "steelblue",
    "tan", "teal", "thistle", "tomato", "turquoise",
    "violet", "wheat", "white", "whitesmoke", "yellow",
    "yellowgreen"
  ];

  //selecting colours to use. also how we determine how many pairs
  const colorsToUse = cssColors.slice(0, 8);

  //creating the cards
  const cards1 = colorsToUse.map((color, index) => ({
    id: `card-${index}`,
    front: `Card ${index}`,
    pair: index,
    background: color,
  }));

  const cards2 = colorsToUse.map((color, index) => ({
    id: `card-${index + 8}`,
    front: `Card pair:${index}`,
    pair: index,
    background: color,
  }));
  const allCards = [...cards1, ...cards2]


  //shuffling the cards 
  const shuffleCards = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };


  const [cards, setCards] = useState(shuffleCards(allCards));
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);  // Track the currently flipped cards
  const [matches, setMatches] = useState(0);
  const [flippedState, setFlippedState] = useState({});
  const [matchedCards, setMatchedCards] = useState([]);
  const [stopwatchReset, setStopwatchReset] = useState();
  const [elapsedTime, setElapsedTime] = useState(0);


  // Load top 5 fastest runs from localStorage
  const [topRuns, setTopRuns] = useState(() => {
    const savedRuns = JSON.parse(localStorage.getItem('topRuns'));
    return savedRuns ? savedRuns : [];
  });

  // Handle the end of the game
  const handleGameEnd = () => {
    // Add the elapsed time to the list of top runs
    const newTopRuns = [...topRuns, elapsedTime].sort((a, b) => a - b).slice(0, 5); // Sort and keep only the top 5 times
    setTopRuns(newTopRuns);

    // Save the updated top 5 times to localStorage
    localStorage.setItem('topRuns', JSON.stringify(newTopRuns));
  };
  useEffect(() => {
    // Reset the game state when all matches are found
    if (matches === 8) {
      handleGameEnd();
    }
  }, [matches]);



  useEffect(() => {
    //only checks when two cards are flipped
    if (flippedCards.length === 2) {

      //getting the two cards from the flipped card array
      const [firstCard, secondCard] = flippedCards;

      // Check if the pairIds match
      if (firstCard.pair === secondCard.pair) {
        setMatches((prevMatches) => prevMatches + 1); // Increment matches

        //wait 0.5 seconds
        setTimeout(() => {
          //add to an array that holds cards that are matched
          setMatchedCards((prevMatchedCards) => [
            ...prevMatchedCards,
            firstCard.cardId,
            secondCard.cardId,
          ]);
        }, 1000);

      } else {
        setTimeout(() => {
          setFlippedState((prevState) => ({
            ...prevState,
            //sets the flippedState for the cards back
            [firstCard.cardId]: false,
            [secondCard.cardId]: false,
          }));
        }, 500); // Delay of 0.5 seconds to let users see the unmatched cards
      }
      // Reset flipped cards count
      setFlippedCards([]);
    }
  }, [flippedCards]);



  const handleCardFlip = (cardId, pairId) => {
    //ensures only 2 cards can be flipped and that you cannot flip them again
    if (flippedCards.length < 2 && !flippedCards.some(card => card.cardId === cardId)) {
      //visually flip the card
      setFlippedState((prevState) => ({
        ...prevState,
        [cardId]: true, // Mark the card as flipped
      }));

      //add the card to flippedCards array
      setFlippedCards((prevFlippedCards) => [
        ...prevFlippedCards,
        { cardId, pair: pairId },
      ]);
      setFlippedCount((prevCount) => prevCount + 1);
    }


  };
  const resetGame = () => {
    //reset states
    setFlippedCards([]);
    setMatches(0);
    setMatchedCards([]);
    setFlippedCount(0);

    // Reset flipped state for all cards
    const initialFlippedState = cards.reduce((acc, card) => {
      acc[card.id] = false; // Set each card's flipped state to false
      return acc;
    }, {});

    setFlippedState(initialFlippedState);
    setCards(shuffleCards(allCards)); // Reshuffle cards to start a new game
    setElapsedTime(0);



    setStopwatchReset(true);



    setTimeout(() => {
      setStopwatchReset(false);
    }, 200);
  };







  return (
    <>
      {/* <Stopwatch isRunning={flippedCount > 0 && matches !== 8}
        reset={stopwatchReset}
        setElapsedTime={setElapsedTime}
      /> */}
      <div style={{ display: "flex" }}>
        <div style={{
          width: "50%",
          height: "70%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gridColumnGap: "4px",
          gridRowGap: "4px"
        }}>


          {/* {shuffledCards} */}

          {cards.map((card) => (
            <Card2
              key={card.id}
              // front={card.front}
              background={card.background}
              isFlipped={flippedState[card.id]}
              onFlip={() => handleCardFlip(card.id, card.pair)} // Pass the callback to Card2
              isHidden={matchedCards.includes(card.id)} //checks to see if the card is in the matched array
            />
          ))}
          <div>number of cards flipped: {flippedCount}</div>
          <div>Matches found: {matches}</div>
          <button onClick={resetGame}>reset</button>



        </div >
        <div style={{ display: "flex" }}>
          <Stopwatch isRunning={flippedCount > 0 && matches !== 8}
            reset={stopwatchReset}
            setElapsedTime={setElapsedTime}
          />
          <h2>Top 5 Fastest Runs:</h2>
          <ol>
            {topRuns.map((time, index) => (
              <li key={index}>
                {new Date(time * 10).toISOString().slice(14, 22)} seconds
              </li>
            ))}
          </ol>
        </div>

      </div>

    </>
  );
}

export default App;
