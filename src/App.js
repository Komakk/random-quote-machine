import './App.scss';
import { FaFreeCodeCamp, FaTwitter } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];
const url =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [color, setColor] = useState('#16a085');
  const [quotes, setQuotes] = useState([]);
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        changeQuote(data.quotes);
      });
  }, []);

  const changeQuote = (arr) => {
    const randomQuote = arr[Math.floor(Math.random() * arr.length)];
    setAuthor(randomQuote.author);
    setQuoteText(randomQuote.quote);
    setQuotes(arr);
    
  };

  const changeColor = () => {
    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
  };

  const changeQuoteClick = () => {
    changeColor();
    changeQuote(quotes);
  };

  function Link({children, ...props}) {
    return (
        <a {...props} className='button' target='_blank' style={{backgroundColor: color}}>
            {children}
        </a>
    )
}

  function QuoteBox() {
  
    const twit = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + quoteText + '" ' + author);;
    return (
        <div id="quote-box" className="QuoteBox">
            <p className="text" id="text" style={{color: color}}>{quoteText}</p>
            <p className='author' id='author' style={{color: color}}>-{author}</p>
            <div className="buttons">
              <div>
              <Link href="https://forum.freecodecamp.org/u/sitek94/summary">
              <FaFreeCodeCamp />
              </Link>
              <Link href={twit} id='tweet-quote'>
              <FaTwitter />
              </Link>
              </div>
                         
              <button onClick={changeQuoteClick} className="button" id='new-quote' style={{backgroundColor: color}}>New Quote</button>
            </div>
            
        </div>
    )
}

  return (
    <div id="app" className="App" style={{backgroundColor: color}}>
      <QuoteBox />
    </div>
  );
}

export default App;
