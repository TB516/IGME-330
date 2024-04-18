import './App.css'
import { useState, useEffect, useMemo } from "react";
import { loadXHR } from './ajax';
import { readFromLocalStorage, writeToLocalStorage } from "./storage"
import Footer from './Footer';
import Header from './Header';
import AmiiboList from "./AmiiboList";
import AmiiboSearchUi from "./AmiiboSearchUI";

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
    <Header title={"Amiibo Finder"}></Header>

    <hr />

    <main>
        <AmiiboSearchUi term={term} setTermFunc={setTerm} searchAmiiboFunc={searchAmiibo} parseAmiiboResultFunc={parseAmiiboResult}></AmiiboSearchUi>

      <section id="results">
        <AmiiboList results={results}></AmiiboList>
      </section>
    </main>

    <hr />

    <Footer name={"Thomas Berrios"} year={new Date().getFullYear()} />
  </>;
};

export default App;