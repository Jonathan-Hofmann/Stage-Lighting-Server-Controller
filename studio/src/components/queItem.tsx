import { Card, CardContent, CardHeader, Divider, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { i_Effect } from "./effectBox";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsController, BsTrash } from "react-icons/bs";
import { calcTime } from "../helper/calcTimes";

interface Props{
    data: i_Effect;
    remove: Function;
    index: number;
}

export const QueItem:React.FC<Props> = (props) => {
    const aproxTime = calcTime(props.data.id, props.data.speed as number ?? 100, props.data.loop ?? 1);
    return(
        <Tooltip placement="top" arrow title={"Gesamte Zeit: "+aproxTime+" sek. | Länge: "+props.data.speed +"ms | Wdh: "+props.data.loop}>
            <Card elevation={0} sx={{backgroundColor: '#ffffff', borderRadius: '100px'}}>
                <CardContent sx={{padding: '13px !important'}}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{padding:0}}>
                        <BsController size={20} style={{marginLeft: '10px'}}/>
                        <Divider orientation="vertical" sx={{margin: '0 15px', height: '20px', borderWidth: '0.5px'}} />
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                        <Divider orientation="vertical" sx={{margin: '0 10px', height: '20px', borderWidth: '1px'}} />
                        <IconButton onClick={()=>props.remove(props.index)} color="error" size="small">
                            <BsTrash/>
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
        </Tooltip>
    )
}