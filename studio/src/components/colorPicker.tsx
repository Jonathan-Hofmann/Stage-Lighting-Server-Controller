import { Box, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { PhotoshopPicker } from "react-color";

interface i_Color{
    id: string;
    name: string;
}

interface Effect{
    data: i_Color;
    addToQue: Function;
}

export const ColorPickerMain:React.FC<Effect> = (props) => {

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState<any>();

    return(
        <Grid item xs={2}>
            <Paper elevation={0} sx={{backgroundColor: '#fafafa', padding: '20px', marginBottom: 0}}>
                <Stack>
                    <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom: '0px'}}>
                        <Typography fontWeight={600}>
                            {props.data.name}
                        </Typography>
                        {/* <Chip size="small" sx={{backgroundColor: "rgb("+props.data.r+","+props.data.g+","+props.data.b+")"}} label="Vorschau"></Chip> */}
                        <PhotoshopPicker color={color} onChange={(c, e)=>setColor(c)} />
                    </Box>
                    <Button onClick={()=>{props.addToQue({name: props.data.name, speed: "Instant", id: props.data.id, loop: "loop", seconds: "aproxTime"})}} sx={{marginTop: '20px'}} variant="contained">
                        Farbe hinzufügen
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}