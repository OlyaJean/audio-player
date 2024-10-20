import React, { useEffect, useRef, useState } from 'react'


const Player = () => {

    const songs = [
        {src:'../public/Jealous.mp3',
         songName: 'Jealous'},
         {src:'../public/Kill_for_your_love.mp3',
          songName: "Kill for your love"},
         {src:'../public/Mount_Everest.mp3',
           songName:'Mount Everest'},
        {src:'../public/Never_felt_so_alone.mp3',
           songName:"Never felt so alone"},
        {src:'../public/Still_dont_know_my_name.mp3',
            songName:"Still don't know my name"},
            {src:'../public/The_feels.mp3',
                songName:"The feels"}
        ]


        const currentSong = useRef();
      
        const [playPauseButton, setPlayPauseButton] = useState("fa-solid fa-play")

        const playSong = () =>{
     if(playPauseButton==="fa-solid fa-play"){
        currentSong.current.play();
        setPlayPauseButton("fa-solid fa-pause")
     }else{
        currentSong.current.pause();
        setPlayPauseButton("fa-solid fa-play")
     }
    }

    const [count,setCount] = useState(0);
  


    const  prevSong = () => {
           setCount(count - 1);
           if(count === 0){
            setCount(5)
           }
          }
    const nextSong = () => {
        setCount(count + 1);
       if(count >= 5){
        setCount(0)
       }
    } 
 
   useEffect(()=>{
    playPauseButton === "fa-solid fa-pause" ? currentSong.current.play(): currentSong.current.pause()
   },[count])
   const range = useRef();
   
   const [curTime,setCurTime] = useState(0)
   const [duration,setDuration] = useState(0)


   const timeData = () => {
    if(currentSong.current){
        setCurTime(currentSong.current.currentTime)
    }
   }
 const getData = () => {
     if(currentSong.current){
       setDuration(currentSong.current.duration);
       setCurTime(currentSong.current.currentTime)
     }
 }

 const rangeChange = (e) => {
   
    const newTime = Number(e.target.value);
    if(currentSong.current){
        currentSong.current.currentTime = newTime;
        setCurTime(newTime)
    }


 }
   
     
      
       
      
    
   
  
  return (
   
    <div className='player'>
        <audio controls src={songs[count].src} type="audio/mp3" ref={currentSong} onLoadedMetadata={getData} onTimeUpdate={timeData}>
      </audio>
      <h1>{songs[count].songName}</h1>
      <p>by Labrinth</p>
      <input type="range" min="0" max={duration} value={curTime} onChange={rangeChange}  ref={range} step="0.1"/>
      <div className="buttons">
      <i className="fa-solid fa-backward" onClick={()=>{prevSong()}}></i>
      <i className={playPauseButton} onClick={()=>{playSong()}}></i>
      <i className="fa-solid fa-forward" onClick={()=>{nextSong()}}></i>
      </div>
    </div>

  )
}

export default Player
