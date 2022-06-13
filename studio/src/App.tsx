import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MainGrid } from './components/mainGrid';
import { Button, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Box, Container } from '@mui/system';
import { EffectBox, i_Effect } from './components/effectBox';
import { Timeline } from './components/timeline';
import { QueItem } from './components/queItem';

function App() {

  const effects = [
    {
      name: 'Snow on Blue',
      id: 'A',
      speed: 100,
      loop: 1,
    },
    {
      name: 'One By One',
      id: 'B',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Random (Multiple)',
      id: 'C',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Shutter',
      id: 'D',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Rainbow',
      id: 'E',
      speed: null,
      loop: 1,
    },
    {
      name: 'Rainbow + Random flash',
      id: 'F',
      speed: null,
      loop: 1,
    },
    {
      name: 'Left Right',
      id: 'G',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Block',
      id: 'H',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Flash - Fade In',
      id: 'I',
      speed: 3,
      loop: 1,
    },
    {
      name: 'Flash - Fade Out',
      id: 'J',
      speed: 3,
      loop: 1,
    },
    {
      name: 'Every 2nd Switch',
      id: 'K',
      speed: 100,
      loop: 1,
    }
  ]

  const [que, updateQue] = useState<i_Effect[]>([]);
  const [aproxTime, setAproxTime] = useState(0.00);

  const [time, updateTime] = useState(0);

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

  const startShow = () => {
    console.log("STARTING QUE:");
    console.log(que)
    for (let i = 0; i < que.length; i++) {
      const queElement = que[i];
      
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
    }
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
      <Timeline startShow={startShow} aproxTime={aproxTime}>
        <>
          {que.length > 0 ?
            <>
              {que.map((effect, i)=>{
                return(
                  <QueItem index={i} remove={removeFromQue} data={{id: effect.id, name: effect.name, speed: effect.speed, loop: effect.loop, seconds: effect.seconds}} />
                )
              })}
            </>
          :
            <Typography color={'text.secondary'}>
              No Effects in Que.
            </Typography>
          }
        </>
      </Timeline>
      <Grid spacing={3} sx={{padding: '30px'}} container>
        {effects.map((effect)=>{
          return(
            <EffectBox addToQue={addEffectToQue} data={{id: effect.id, name: effect.name, speed: effect.speed, loop: effect.loop, seconds: 100}}/>
          )
        })}
      </Grid>
      
    </>
  );
}

export default App;
