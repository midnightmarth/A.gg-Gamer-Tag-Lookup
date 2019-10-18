import React from "react"

import { Card, ListItemIcon } from "@material-ui/core"
import { Avatar, Button, List, ListItem, ListItemSecondaryAction, Typography, Divider } from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import {MuiThemeProvider} from 'material-ui/styles'



function searchHistory(props) {
    return(
        <MuiThemeProvider>
            <Card id='searchHistoryCard'>
                <h2>History</h2>
                <List id='playerAvatarHistory' >
                    {props.history.map(i => {
                    return(
                        <ListItem className='historyItem' key={i.athleteData.id} button onClick={() => {
                            // console.log('Searching: ',i.athleteData.gamerTag)
                            props.searchName(i.athleteData.gamerTag)
                        }}> 
                            <ListItemIcon>
                                <Avatar src={i.athleteData.avatar}/>
                            </ListItemIcon>
                            <Typography>
                                {i.athleteData.gamerTag}
                            </Typography>
                            <ListItemSecondaryAction className='historyDeleteButton'>
                                <Button onClick={() => {
                                    // console.log("Deleting: ",i.athleteData.gamerTag)
                                    props.deleteHistory(i.athleteData.gamerTag)
                                    
                                    }}><DeleteOutlinedIcon />
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )})}
                </List>
            </Card>
        </MuiThemeProvider>
    )
}

export default searchHistory;