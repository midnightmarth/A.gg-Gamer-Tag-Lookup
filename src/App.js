import React from 'react';
import { useState } from 'react';
import './App.css';
import axios from "axios";

import { Slide, Snackbar, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

import InputHolder from "./components/inputHolder";
import GamerTagDisplay from "./components/gamerTagDisplay";
import SearchHistory from './components/searchHistory';

//Issue: When I query for a gamerTag, the ID doesnt come with it so I cannot get their last 5 placings...


function transitionUp(props){
    return <Slide {...props} direction="up" />;
}

function allStorage() {
  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])));
  }
  console.log("All localStorage",values)
  return values;
}

function App() {

  const [gamerTag, setGamerTag] = useState('');
  const [athleteData, setAthleteData] = useState({});
  const [lastFive, setLastFive] = useState([]);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(allStorage());
  const [cacheHit, setCacheHit] = useState(false);
  
  let errorMessage = 'An error has occurred when contacting the server'

  function searchName(gT = gamerTag){
    
    if(gT.length === 0){
      return''
    }
    if(localStorage.getItem(gT)){
      setCacheHit(true)
      // console.log(JSON.parse(localStorage.getItem(gT)).athleteData)
      const data = JSON.parse(localStorage.getItem(gT)).athleteData
      const lastFive = JSON.parse(localStorage.getItem(gT)).lastFive
      setAthleteData(data)
      setLastFive(lastFive)
    } else {
      setCacheHit(false);
      axios.get('https://agg-gamer-tag-lookup-server.herokuapp.com/users',
        {
        params: {
          user: gamerTag
        }
      })
      .then(data => {
        console.log("data:",data.data)
        localStorage.setItem(data.data.athleteData.data[0].gamerTag, JSON.stringify({athleteData: data.data.athleteData.data[0], lastFive: data.data.lastFive.data}))
        setAthleteData(data.data.athleteData.data[0]);
        setHistory([...history, {athleteData: data.data.athleteData.data[0], lastFive: data.data.lastFive.data}]);
        setLastFive(data.data.lastFive.data);
      })
      .catch(err => {
        console.log("error: ", err)
        setOpen(true)
      })
    }
  }

  function deleteHistory(gamerTag){
    localStorage.removeItem(gamerTag)
    setHistory(history.filter(i => i.athleteData.gamerTag !== gamerTag))
  }
  
  return (
    <div className="App">
      <div id="title">
        <h1>Gamer Tag Lookup</h1>
      </div>
      <div id='searchHistory'>
          <SearchHistory history={history} deleteHistory={deleteHistory} searchName={searchName}/>
      </div>
      <div id='content'>
        <div id="userInput">
          <InputHolder searchName={searchName} setGamerTag={setGamerTag}/>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox color='primary' checked={cacheHit} id='checkBoxIndicator'/>
            } label={<p id='checkBoxIndicator'> Cache Hit Indicator</p>}/>
          </FormGroup>
        </div>
      </div>
      <div id="playerDisplay">
        <GamerTagDisplay athleteData={athleteData} lastFive={lastFive}/>
      </div>
      <Snackbar
        open={open}
        onClose={() => {setOpen(false)}}
        TransitionComponent={transitionUp}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMessage}</span>}
      />
    </div>
  );
}

export default App;
