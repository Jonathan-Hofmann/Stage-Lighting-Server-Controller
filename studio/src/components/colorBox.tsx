import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Divider, Grid, Paper, Stack, TextField, Typography, Chip, Tooltip } from "@mui/material"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi";
import { calcTime } from "../helper/calcTimes";

export interface i_Color{
    id: string;
    name: string;
    r1: string;
    g1: string;
    b1: string;
    r2: string;
    g2: string;
    b2: string;
}

interface Effect{
    data: i_Color;
    addToQue: Function;
}


export const ColorBox:React.FC<Effect> = (props) => {

    const correctZeros = (color: string) => {
        if(color.length === 1){
            return('00'+color);
        } else if(color.length === 2){
            return('0'+color);
        } else {
            return(color);
        }
    }

    const playEffect = () => {
        axios.post("http://localhost:8000/effect/C"+correctZeros(props.data.r1)+correctZeros(props.data.g1)+correctZeros(props.data.b1)+correctZeros(props.data.r2)+correctZeros(props.data.g2)+correctZeros(props.data.b2));
    }

    return(
        <Grid item xs={2}>
            <Paper elevation={0} sx={{backgroundColor: '#fafafa', padding: '20px', marginBottom: 0}}>
                <Stack>
                    <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom: '0px'}}>
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Tooltip title="Main Color">
                            <Box sx={{backgroundColor: 'rgb('+props.data.r1+", "+props.data.g1+", "+props.data.b1+")", height: '35px', width: '35px', borderRadius: '100px'}}></Box>
                        </Tooltip>
                        <Tooltip title="Special Color">
                            <Box sx={{backgroundColor: 'rgb('+props.data.r2+", "+props.data.g2+", "+props.data.b2+")", height: '35px', width: '35px', borderRadius: '100px', marginLeft: '10px'}}></Box>
                        </Tooltip>
                    </Box>
                    
                    <Button onClick={()=>{playEffect()}} sx={{marginTop: '20px'}} variant="outlined">
                        Ausf??hren
                    </Button>
                    <Button onClick={()=>{props.addToQue({name: props.data.name, speed: correctZeros(props.data.r1)+correctZeros(props.data.g1)+correctZeros(props.data.b1)+correctZeros(props.data.r2)+correctZeros(props.data.g2)+correctZeros(props.data.b2), id: "COLOR", loop: 1, seconds: 0})}} sx={{marginTop: '20px'}} variant="contained">
                        Farbe hinzuf??gen
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}