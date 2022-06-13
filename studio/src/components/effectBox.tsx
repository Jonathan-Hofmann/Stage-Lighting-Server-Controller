import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Divider, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi";
import { calcTime } from "../helper/calcTimes";

export interface i_Effect{
    speed: number | null;
    name: string;
    loop: number | null;
    id: string;
    seconds: number;
}

interface Effect{
    data: i_Effect;
    addToQue: Function;
}

export const EffectBox:React.FC<Effect> = (props) => {

    const [speed, setSpeed] = useState(props.data.speed);
    const [loop, setLoop] = useState(props.data.loop);

    const [aproxTime, setAproxTime] = useState("0");


    const playEffect = () => {

        let m_speed = "100";
        if(speed != null){
            if (speed > 9 && speed <= 99) {
                m_speed = "0"+speed.toString();
            } else if(speed > 99) {
                m_speed = speed.toString();
            } else{
                m_speed = "00"+speed.toString();
            }
        }

        let loops = "01";
        if(loop != null){
            if (loop > 9) {
                loops = loop.toString();
            } else{
                loops = "0"+loop.toString();
            }
        }

        axios.post("http://localhost:8000/effect/E"+props.data.id+m_speed+loops);
    }

    useEffect(()=>{
        const aproxTime = calcTime(props.data.id, speed ?? 100, loop ?? 1);
        setAproxTime(aproxTime.toString());
    }, [speed, loop]);

    return(
        <Grid item xs={2}>
            <Paper elevation={0} sx={{backgroundColor: '#f4f4f4', padding: '20px'}}>
                <Stack>
                    <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom: '20px'}}>
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                        <Typography variant="body2">{aproxTime} sek.</Typography>
                    </Box>
                    <Accordion elevation={0} sx={{backgroundColor: '#f4f4f4'}}>
                        <AccordionSummary
                            expandIcon={<BiChevronDown size={20} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                        <Typography>Einstellungen</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                <TextField size="small" value={loop} onChange={(e)=>{setLoop(parseInt(e.target.value))}} sx={{marginBottom: '15px', marginTop: '5px'}} type="number" id="outlined-basic" label="Wiederholungen" variant="outlined" />
                                {props.data.speed != null ? <TextField size="small" value={speed} onChange={(e)=>{setSpeed(parseInt(e.target.value))}} sx={{marginBottom: '15px', marginTop: '5px'}} type="number" id="outlined-basic" label="Speed" variant="outlined" /> : <></>}
                                <Button onClick={()=>{playEffect()}} sx={{marginBottom: '15px'}} variant="outlined">
                                    abspielen
                                </Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Button onClick={()=>{props.addToQue({name: props.data.name, speed: speed, id: props.data.id, loop: loop, seconds: aproxTime})}} sx={{marginTop: '20px'}} variant="contained">
                        EFFEKT HINZUFÜGEN
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}