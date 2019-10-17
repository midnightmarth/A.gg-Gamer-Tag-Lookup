import React from "react"

import { TextField, Button } from "@material-ui/core"

function inputHolder(props) {
    return(
        <div id= 'inputHolder'>
            <TextField
            onChange={(value) => {props.setGamerTag(value.target.value)}}
            onKeyPress={(event) => {
                if(event.key === "Enter"){
                    props.searchName();
                }
            }}
            label="Type to Search"
            />
            <Button
            id='submitButton'
            onClick={() => {
                props.searchName()
            }}
            >Search</Button>
        </div>
    )
}

export default inputHolder;