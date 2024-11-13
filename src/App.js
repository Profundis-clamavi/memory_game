// import logo from './logo.svg';
import './App.css';
import './components/Card.js';
// import Card from './components/Card.js';
import Card2 from './components/Card2.js';

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

  // const cards = cssColors.map((color, index) => (
  //   <Card2 key={index} front={`Card ${index + 1}`} background={color} />
  // ));
  const colorsToUse = cssColors.slice(0, 8);

  const cards1 = colorsToUse.map((color, index) => (
    <>
      <Card2 key={index} front={`Card ${index}`} background={color} />
    </>
  ))
  const cards2 = colorsToUse.map((color, index) => (
    <>
      <Card2 key={index + 8} front={`Card pair:${index}`} background={color} />
    </>
  ))
  const cards = [...cards1, ...cards2]


  //function to shuffle cards
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = cards[i];
      cards[i] = cards[j];
      cards[j] = k;
    }
    return cards;
  }

  const shuffledCards = shuffleCards(cards);
  return (
    <>
      <div style={{
        width: "50%",
        height: "70%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gridColumnGap: "4px",
        gridRowGap: "4px"
      }}>


        {shuffledCards}

      </div >

    </>
  );
}

export default App;
