import { Card, CardContent, CardHeader, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { i_Effect } from "./effectBox";
import { BiPlus, BiTrash } from "react-icons/bi";

interface Props{
    data: i_Effect;
    remove: Function;
    index: number;
}

export const QueItem:React.FC<Props> = (props) => {
    return(
        <Card elevation={0} sx={{backgroundColor: '#f4f4f4', minWidth: '600px'}}>
            <CardContent sx={{padding: '24px'}}>
                <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography fontWeight={600}>
                        {props.data.name}
                    </Typography>
                    <Divider orientation="vertical" sx={{margin: '0 10px', height: '20px', borderWidth: '1px'}} />
                    <Typography>
                        Speed: {props.data.speed} ms
                    </Typography>
                    <Divider orientation="vertical" sx={{margin: '0 10px', height: '20px', borderWidth: '1px'}} />
                    <Typography>
                        {props.data.loop} Wiederholung(en)
                    </Typography>
                    <Divider orientation="vertical" sx={{margin: '0 10px', height: '20px', borderWidth: '1px'}} />
                    <IconButton onClick={()=>props.remove(props.index)} color="error" >
                        <BiTrash/>
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    )
}