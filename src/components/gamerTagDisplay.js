import React from "react"
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Table, TableCell, TableBody, TableHead, TableRow, Avatar} from '@material-ui/core'
function gamerTagDisplay(props) {

    return(
        <div id='gamerProfile'>
            {props.athleteData.gamerTag ?
                <div id='playerCard'>
                    {props.athleteData.avatar ? <Avatar id="gamerAvatar" src={props.athleteData.avatar} alt="Avatar"/> : 
                    <Avatar id="gamerAvatar">{props.athleteData.gamerTag[0]}</Avatar>}
                <div id='knowForPlaying'>
                    {props.athleteData.autoCharacters.map(i => {
                        return (
                            <Avatar className='characterPortrait' src={i.thumbnail} alt={i.name} key={i.smashggId}/>
                       )
                    })}
                </div>
                    <div id='gamerTag'>
                    <h3>{props.athleteData.gamerTag}</h3>
                    <h4>{props.athleteData.name}</h4>
                </div>
                {props.athleteData.about ? <div id="gamerAbout">{props.athleteData.about}</div> : <div id="gamerAbout"> No information </div>}
                <br/>
                {props.athleteData.aggScoreBreakdown ?
                <div id='aggScore'>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>Agg Score: {props.athleteData.aggScore}</ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type (Platform)</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Placing</TableCell>
                                        <TableCell>{props.athleteData.aggScoreBreakdown.placing}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Twitch</TableCell>
                                        <TableCell>{props.athleteData.aggScoreBreakdown.twitch}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Youtube</TableCell>
                                        <TableCell>{props.athleteData.aggScoreBreakdown.youtube}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Twitter</TableCell>
                                        <TableCell>{props.athleteData.aggScoreBreakdown.twitter}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel> 
                </div>
                 : <ExpansionPanel><ExpansionPanelSummary>Does not have A.gg Score</ExpansionPanelSummary></ExpansionPanel>}
                <ExpansionPanel>
                    <ExpansionPanelSummary>Games I'm Known For Playing</ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div id='gamesPlayerPlays'>
                            {props.athleteData.gamesCompetitorGames.map(i => {
                                return(
                                    <div key={i.id} className='individualGames'>
                                    <p>{i.name}</p>
                                    <img className='gameBoxImg' src={i.box} alt={i.name}/>
                                </div>)
                            })}
                        </div> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary>Last 5 Games Played</ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div id='lastFive'>
                        {props.lastFive.map(i => {
                            return(
                                <ExpansionPanel key={i.id}>
                                    <ExpansionPanelSummary>
                                        <img id='tourneyAvatar' src={i.event.avatar} />
                                        <p id='tourneyName'>{i.event.tournamentName}</p>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Event Name</TableCell>
                                                    <TableCell>Game</TableCell>
                                                    <TableCell>Location</TableCell>
                                                    <TableCell>Dates</TableCell>
                                                    <TableCell>Placed</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{i.event.name}</TableCell>
                                                    <TableCell>{i.game.name}</TableCell>
                                                    <TableCell>{i.event.location.city}, {i.event.location.state}</TableCell>
                                                    <TableCell>{new Date(i.event.start).toUTCString()} - {new Date(i.event.end).toUTCString()}</TableCell>
                                                    <TableCell>{i.place ? i.place : "Not concluded yet."}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>)
                        })}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            : <div id='emptySearch'>"Search for a professional SSB Player!"</div>}
        </div>
    )
}

export default gamerTagDisplay;