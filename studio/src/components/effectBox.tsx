import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Divider, Grid, Paper, Stack, TextField, Typography, Skeleton } from "@mui/material"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi";
import { calcTime } from "../helper/calcTimes";

export interface i_Effect{
    speed: number | null | string;
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

        axios.post("http://localhost:8000/effect/E"+props.data.id+m_speed+loops+"1");
    }

    useEffect(()=>{
        const aproxTime = calcTime(props.data.id, speed as number ?? 100, loop ?? 1);
        setAproxTime(aproxTime.toString());
    }, [speed, loop]);

    return(
        <Grid item xs={12} md={6} lg={4} xl={2}>
            <Paper elevation={0} sx={{backgroundColor: '#fafafa', padding: '20px', marginBottom: 0}}>
                <Stack>
                    <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom: '20px'}}>
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                        {aproxTime === "0" ? <Skeleton width={'60px'}/> : <Typography variant="body2">{aproxTime} sek.</Typography>}
                    </Box>
                    <Accordion elevation={0} sx={{backgroundColor: '#fafafa'}}>
                        <AccordionSummary
                            expandIcon={<BiChevronDown size={20} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{padding: 0}}
                            >
                        <Typography>Einstellungen</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{padding: 0}}>
                            <Stack sx={{marginBottom: '15px'}} >
                                <TextField size="small" value={loop} onChange={(e)=>{setLoop(parseInt(e.target.value))}} sx={{marginBottom: '15px', marginTop: '5px'}} type="number" id="outlined-basic" label="Wiederholungen" variant="outlined" />
                                {props.data.speed != null ? <TextField size="small" value={speed} onChange={(e)=>{setSpeed(parseInt(e.target.value))}} sx={{marginBottom: '15px', marginTop: '5px'}} type="number" id="outlined-basic" label="Speed" variant="outlined" /> : <></>}
                                
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Button onClick={()=>{playEffect()}} variant="outlined">
                        Abspielen
                    </Button>
                    <Button onClick={()=>{props.addToQue({name: props.data.name, speed: speed, id: props.data.id, loop: loop, seconds: aproxTime})}} sx={{marginTop: '20px'}} variant="contained">
                        EFFEKT HINZUFÜGEN
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}