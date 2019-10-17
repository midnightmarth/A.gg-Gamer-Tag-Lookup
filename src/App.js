import React from 'react';
import { useState } from 'react';
import './App.css';
import axios from "axios";

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import InputHolder from "./components/inputHolder";
import GamerTagDisplay from "./components/gamerTagDisplay";

//Issue: When I query for a gamerTag, the ID doesnt come with it so I cannot get their last 5 placings...


function transitionUp(props){
    return <Slide {...props} direction="up" />;
}

function App() {

  const [gamerTag, setGamerTag] = useState('');
  const [athleteData, setAthleteData] = useState({});
  const [lastFive, setLastFive] = useState([]);
  const [open, setOpen] = React.useState(false);
  
  let errorMessage = 'An error has occurred when contacting the server'

  function searchName(){
    axios.get('http://localhost:3030/users',
    {
      params: {
        user: gamerTag
      }
    })
    .then(data => {
      console.log("data:",data.data)
      setAthleteData(data.data.athleteData.data[0]);
      setLastFive(data.data.lastFive.data);
    })
    .catch(err => {
      console.log("error: ", err)
      setOpen(true)
    })
  }

  return (
    <div className="App">
      <div id="container">
        <div id="title">
          <h1>Gamer Tag Lookup</h1>
        </div>
        <div id='content'>
          <div id="userInput">
            <InputHolder searchName={searchName} setGamerTag={setGamerTag}/>
          </div>
          <div id="playerDisplay">
            <GamerTagDisplay athleteData={athleteData} lastFive={lastFive}/>
          </div>
        </div>
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
