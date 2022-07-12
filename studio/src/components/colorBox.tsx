import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Divider, Grid, Paper, Stack, TextField, Typography, Chip } from "@mui/material"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi";
import { calcTime } from "../helper/calcTimes";

interface i_Color{
    id: string;
    name: string;
    r: string;
    g: string;
    b: string;
}

interface Effect{
    data: i_Color;
    addToQue: Function;
}

export const ColorBox:React.FC<Effect> = (props) => {

    const playEffect = () => {

        axios.post("http://localhost:8000/effect/E"+props.data.id);
    }

    return(
        <Grid item xs={2}>
            <Paper elevation={0} sx={{backgroundColor: '#fafafa', padding: '20px', marginBottom: 0}}>
                <Stack>
                    <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom: '0px'}}>
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                        <Chip size="small" sx={{backgroundColor: "rgb("+props.data.r+","+props.data.g+","+props.data.b+")"}} label="Vorschau"></Chip>
                    </Box>
                    <Button onClick={()=>{props.addToQue({name: props.data.name, speed: "Instant", id: props.data.id, loop: "loop", seconds: "aproxTime"})}} sx={{marginTop: '20px'}} variant="contained">
                        Farbe hinzufügen
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}