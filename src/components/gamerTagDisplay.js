import React from "react"

function gamerTagDisplay(props) {

    return(
        <div id='gamerProfile'>
            {props.athleteData.gamerTag ?
                <div id='playerCard'>
                    {props.athleteData.avatar ? <img id="gamerAvatar" src={props.athleteData.avatar} alt="Avatar"/> : ""}
                    <br/>
                <div id='knowForPlaying'>
                    {props.athleteData.autoCharacters.map(i => {
                        return (
                            <img className='characterPortrait' src={i.thumbnail} alt={i.name} key={i.smashggId}/>
                       )
                    })}
                </div>
                    <div id='gamerTag'>
                    <h3>{props.athleteData.gamerTag}</h3>
                </div>
                <div id="gamerAbout">{props.athleteData.about}</div>
                <br/>
                <div id='aggScore'>{props.athleteData.aggScore ? 
                    <div>
                        A.gg Score: {props.athleteData.aggScore}
                            <li>
                                Placing Score: {props.athleteData.aggScoreBreakdown.placing}
                            </li>
                            <li>
                                Twitch Score: {props.athleteData.aggScoreBreakdown.twitch}
                            </li>
                            <li>
                                Twitter Score: {props.athleteData.aggScoreBreakdown.twitter}
                            </li>
                            <li>
                                Youtube Score: {props.athleteData.aggScoreBreakdown.youtube}
                            </li>
                    </div>
                 : 'No data to see here...'}
                 <div id='gamesPlayerPlays'>
                     {props.athleteData.gamesCompetitorGames.map(i => {
                         return(
                         <div className='individualGames'>
                             <p>{i.name}</p>
                             <img className='gameBoxImg' src={i.box} alt={i.name}/>
                         </div>)
                     })}
                 </div>
                </div>
                {/* <div>{props.lastFive.id}</div> */}
            </div>
            : <div id='emptySearch'>"Search for a professional SSB Player!"</div>}
        </div>
    )
}

export default gamerTagDisplay;