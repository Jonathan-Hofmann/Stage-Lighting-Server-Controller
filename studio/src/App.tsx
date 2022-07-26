import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MainGrid } from './components/mainGrid';
import { Button, Divider, FormControlLabel, FormGroup, Grid, IconButton, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import { Box, Container } from '@mui/system';
import { EffectBox, i_Effect } from './components/effectBox';
import { Timeline } from './components/timeline';
import { QueItem } from './components/queItem';
import { effects, colors } from './constants/config';
import { ColorBox } from './components/colorBox';
import { PhotoshopPicker, SketchPicker } from 'react-color';
import { ColorPickerMain } from './components/colorPicker';
import { BsTrash, BsTrash2 } from 'react-icons/bs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {

  const [que, updateQue] = useState<i_Effect[]>([]);
  const [aproxTime, setAproxTime] = useState(0.00);

  const [time, updateTime] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let p_time = 0;
  let timer: NodeJS.Timeout | undefined;
  const callURL = (url:string) => {
    axios.get(url);
  }

  const updateTimeer = () => {
    console.log(p_time+" sek.");
    p_time = p_time+1;
    updateTime(p_time);
  }

  const addEffectToQue = (effect: i_Effect) => {
    let tmp_que = [...que];
    tmp_que.push(effect);
    updateQue(tmp_que);
  }

  const removeFromQue = (index: number) => {
    let tmp_que = [...que];
    tmp_que.splice(index, 1);
    updateQue(tmp_que);
  }

  const startTimer = () => {
    timer = setInterval(()=>{
     updateTimeer();
    }, 1000);
  }

  const cancelTimer = () => {
    clearInterval(timer)
    p_time = 0;
  }

  const playEffect = async (queElement: any) => {
    return new Promise<void>((resolve, reject)=>{
      if(queElement.id==="COLOR"){
        console.log("PLAYING COLOR.");
        axios.post("http://localhost:8000/color/C"+queElement.speed);
        setTimeout(()=>{
          resolve();
        }, 200)
      } else{
        let m_speed = "100";
        if(queElement.speed != null){
            if (queElement.speed > 9 && queElement.speed <= 99) {
                m_speed = "0"+queElement.speed.toString();
            } else if(queElement.speed > 99) {
                m_speed = queElement.speed.toString();
            } else{
                m_speed = "00"+queElement.speed.toString();
            }
        }

        let loops = "01";
        if(queElement.loop != null){
          if (queElement.loop > 9) {
            loops = queElement.loop.toString();
          } else{
            loops = "0"+queElement.loop.toString();
          }

        }
        axios.post("http://localhost:8000/effect/E"+queElement.id+m_speed+loops);

        let waitingTime = (queElement.speed * queElement.loop);

        if(queElement.id === "L" || queElement.id === "M"){
          waitingTime = waitingTime*4;
        }

        if(queElement.id === "I" || queElement.id === "J"){
          const t = queElement.speed as number / 100;
          const _t = t*80;
          waitingTime = _t;
        }

        if(queElement.id === "C" || queElement.id === "N"){
          waitingTime = waitingTime*2;
        }

        if(queElement.id === "E"){
          waitingTime = 6375 * queElement.loop;
        }

        if(queElement.id === "B"){
          waitingTime = queElement.speed * 65;
        }

        // if(queElement.id === "K"){
        //   waitingTime = (queElement.speed * queElement.loop) * 2;
        // }

        console.log("Wait: "+waitingTime+"ms für "+queElement.id);

        setTimeout(() => {
          // waiting for effect to be done...
          resolve()
        }, waitingTime);
      }     
    })
  }

  const startShow = async () => {
    console.log("STARTING QUE:");
    console.log(que);
    
    axios.post("http://localhost:8000/effect/I0");

    for (let i = 0; i < que.length; i++) {
      
      const queElement = que[i];

      await playEffect(queElement);
      
    }
  }


  const toggleIdleAnimation = (checked:boolean) => {
    let v = 0;
    if(checked=== true){
      v=1;
    } else {
      v=0;
    }
    axios.post("http://localhost:8000/effect/I"+v);
  }

  const handleFile = (e:any) => {
    const content = e.target.result;
    const tmp_JSON = JSON.parse(content);
    console.log(tmp_JSON);

    const uploaded_que = [];
    for (let i = 0; i < tmp_JSON.effects.length; i++) {
      const effect = tmp_JSON.effects[i];
      uploaded_que.push({
        speed: effect.speed,
        name: effect.name,
        loop: effect.loop,
        id: effect.id,
        seconds: 0
      })
    }

    updateQue(uploaded_que);

    console.log(que);

    // You can set content in state and show it in render.
  }
  
  const handleChangeFile = (file: Blob) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  useEffect(()=>{
    let seconds = 0;
    for (let i = 0; i < que.length; i++) {
      const queItem = que[i];
      seconds = parseFloat(seconds.toString())+parseFloat(queItem.seconds.toString());
    };
    console.info(seconds);
    setAproxTime(seconds);
  }, [que]);

  return (
    <>
    <Container sx={{paddingTop: '30px'}}>
      <Box display={'flex'} flexDirection="row" justifyContent={'space-between'} alignItems={"center"} sx={{marginBottom: '20px'}}>  
        <Typography variant='h4' fontWeight={700}>Stage-Timeline</Typography>
        <Button onClick={startShow} variant='contained'>
          Show starten
        </Button>
      </Box>
      <Box display={'flex'} flexDirection="row" justifyContent={'space-between'} alignItems={"center"}>  
        <Typography>Aktuell: {que.length} Keyframes</Typography>
        
        <input type="file" accept=".json" onInput={(e:any) => handleChangeFile(e.target.files[0])} onChange={(e:any) => handleChangeFile(e.target.files[0])} /> 
      </Box>
      <Divider sx={{margin: '30px 0'}}/>

      {que.length > 0 ?
      
        <TableContainer sx={{width: '100%'}}>
          <Table sx={{width: '100%'}}>
            <TableHead>
              <TableCell>
                Index
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Effekt-ID
              </TableCell>
              <TableCell>
                Wiederholungen
              </TableCell>
              <TableCell>
                Speed / Farb-Code
              </TableCell>
              <TableCell>
                Aktion
              </TableCell>
            </TableHead>
            <TableBody>
              {que.map((effect, i)=>{
                return(
                  // <QueItem index={i} remove={removeFromQue} data={{id: effect.id, name: effect.name, speed: effect.speed, loop: effect.loop, seconds: effect.seconds}} />
                  <TableRow>
                    <TableCell>
                        {i}
                    </TableCell>
                    <TableCell>
                        {effect.name}
                    </TableCell>
                    <TableCell>
                        {effect.id}
                    </TableCell>
                    <TableCell>
                        {effect.loop}
                    </TableCell>
                    <TableCell>
                        {effect.speed}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={()=>removeFromQue(i)} color="error">
                        <BsTrash size={'16px'}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
      :
        <Typography color={'text.secondary'}>
          No Effects in Que.
        </Typography>
      }
      
    </Container>
    
    
      {/* <Timeline startShow={startShow} aproxTime={aproxTime}>
        <>
          {que.length > 0 ?
            <Stack>
              {que.map((effect, i)=>{
                return(
                  <QueItem index={i} remove={removeFromQue} data={{id: effect.id, name: effect.name, speed: effect.speed, loop: effect.loop, seconds: effect.seconds}} />
                )
              })}
            </Stack>
          :
            <Typography color={'text.secondary'}>
              No Effects in Que.
            </Typography>
          }
        </>
      </Timeline> */}

      <FormGroup sx={{paddingLeft: '30px'}}>
        <FormControlLabel control={<Switch defaultChecked onChange={(e, checked)=>{toggleIdleAnimation(checked)}} />} label="Idle Animation anzeigen" />
      </FormGroup>


      <Box sx={{ padding: '30px' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#f4f4f4' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Effekte" {...a11yProps(0)} />
            <Tab label="Farben" {...a11yProps(1)} />
            {/* <Tab label="Andere" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid spacing={3} sx={{marginTop: '0px'}} container>
            {effects.map((effect)=>{
              return(
                <EffectBox addToQue={addEffectToQue} data={{id: effect.id, name: effect.name, speed: effect.speed, loop: effect.loop, seconds: 100}}/>
              )
            })}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant='h5' marginTop={"20px"}>Vordefinierte Farben</Typography>
          <Grid spacing={3} sx={{marginTop: '0px'}} container>
            {colors.map((effect)=>{
                return(
                  <ColorBox addToQue={addEffectToQue} data={{id: effect.id, name: effect.name, r1: effect.r1, g1: effect.g1, b1: effect.b1, r2: effect.r2, g2: effect.g2, b2: effect.b2}}/>
                )
            })}
          </Grid>
          {/* <Typography variant='h5' marginTop={"30px"}>Eigene Farbe</Typography> */}
          {/* <ColorPickerMain addToQue={addEffectToQue} data={{id: "C", name: "Custom"}}/> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
      
    </>
  );
}

export default App;
