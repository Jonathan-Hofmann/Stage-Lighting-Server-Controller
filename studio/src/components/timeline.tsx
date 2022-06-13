import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BiPlayCircle } from "react-icons/bi";
import { i_Effect } from "./effectBox";

interface Props{
    children: JSX.Element,
    aproxTime: number,
    startShow: Function,
}

export const Timeline:React.FC<Props> = (props) => {
    useEffect(()=>{
    }, [props.aproxTime]);
    return(
        <Box sx={{padding: '30px'}}>
            <Box sx={{borderRadius: '10px', backgroundColor: 'white', border: '2px solid #f4f4f4', padding: '20px', paddingBottom: '10px'}}>
                <Stack direction={"row"} sx={{marginBottom: '20px'}} justifyContent={"space-between"}>
                    <Typography variant="h5">
                        Timeline
                    </Typography>
                    <Typography>
                        Total {props.aproxTime.toPrecision(4)} sek.
                    </Typography>
                    <Button onClick={()=>props.startShow()} variant="contained" startIcon={<BiPlayCircle/>}>
                        Start Show
                    </Button>
                </Stack>
                <Stack direction={"row"} flexWrap={"nowrap"} sx={{overflowX: 'scroll', paddingBottom: '10px'}} spacing={2}>
                    {props.children}
                </Stack>
            </Box>
        </Box>
    )
}