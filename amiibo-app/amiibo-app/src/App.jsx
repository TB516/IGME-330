import { useState } from "react";
import './App.css'

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callback(xhr);

  xhr.open("GET", url);
  xhr.send();
};

const App = () => {
  const [term, setTerm] = useState("toad");
  const [results, setResults] = useState([]);

  const searchAmiibo = (name, callback) => {
    loadXHR(`${baseurl}${name}`, callback);
  };

  const parseAmiiboResult = (xhr) => {
    // get the `.responseText` string
    const response = xhr.responseText;
   
    // declare a json variable
   let json;
  
    // try to parse the string into a json object
    try {
      json = JSON.parse(response);
    } catch (error) {
      console.error(error);
    }

    setResults(json.amiibo);
  };
  
  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>

    <hr />

    <main>
      <button onClick = {() => {searchAmiibo(term, parseAmiiboResult)}}>Search</button>

      <label>
        Name: 
        <input value={term} onChange={e => setTerm(e.target.value.trim())}/>
      </label>

      <section id="results">
        {results.map(amiibo => (
          <span key={amiibo.head + amiibo.tail} style={{color:"green"}}>
            <h4>{amiibo.name}</h4>
            <img 
              width="100" 
              alt={amiibo.character}
              src={amiibo.image}
            />
          </span>
        ))}
      </section>
    </main>

    <hr />

    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};

export default App;