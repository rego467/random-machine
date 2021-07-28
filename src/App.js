import React, {useState, useEffect} from 'react';
import './App.css';
import ColorArray from './ColorsArray';

let quotesDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQoute] = useState("karoo");
  const [author, setAuthor] = useState("babi");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesData, setQuotesData] = useState(null);
  const [colors, setColors] = useState("#FF6633")

const fetchQuote = async (url) =>{
  const respone = await fetch(url)
  const parsedJSON = await respone.json()
  setQuotesData(parsedJSON.quotes)
  console.log(parsedJSON)   
} 
useEffect(()=>{
  fetchQuote(quotesDB)
},[quotesDB])

const clickNewQuote = ()=>{
  let randomMachine = Math.floor(Math.random() * quotesData.length);
  setRandomNumber(randomMachine)
  setColors(ColorArray[randomMachine]);
  setQoute(quotesData[randomMachine].quote);
  setAuthor(quotesData[randomMachine].author);
}
  return (
    <div className="App" id="quote-box" style={{backgroundColor: colors}}>
      <div className="test">
        <div id="text">
        <i className="fas fa-quote-right"></i>
        <p>{quote}</p>
        </div>
        <div id="author" style={{textAlign:'end'}}>
          <p>-{author}</p>
        </div>

        <div style={{justifyContent:'space-between', display:'flex'}}>
          
          <a type="button" className="btn btn-success" id="tweet-quote" href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote}-${author}`)}>
          <i class="bi bi-twitter"></i>
          </a>

          <button type="button" className="btn btn-primary" onClick={()=> clickNewQuote()} id="new-quote">
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
