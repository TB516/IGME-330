import './App.css'
import { useState, useEffect, useMemo } from "react";
import { loadXHR } from './ajax';
import { readFromLocalStorage, writeToLocalStorage } from "./storage"
import Footer from './Footer';

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const App = () => {
  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);  
  const [term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);

  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);

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

    <Footer name={"Thomas Berrios"} year={new Date().getFullYear()} />
  </>;
};

export default App;