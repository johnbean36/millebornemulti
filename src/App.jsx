import { useState, useEffect } from 'react'
import Score from './components/Score';
import Indicator from './components/Indicator';
import io from 'socket.io-client';
const socket = io('localhost:3000');
import './App.css';
import Main from './components/Main';
import Welcome from './components/Welcome';

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasName, sethasName] = useState(false);
  const [playerCount, setplayerCount] = useState(0);
  const [playerName, setplayerName ] = useState(['', '', '', '']);
  const [playerId, setplayerId] = useState(['', '', '', '']);
  const [playerDistance, setplayerDistance] = useState([0, 0, 0, 0]);
  const [playerRScore, setplayerRScore] = useState([0, 0, 0, 0]);
  const [playerTScore, setplayerTScore] = useState([0, 0, 0, 0])
  const [accident, setAccident] = useState([false, false, false, false])
  const [aLight, setALight] = useState(['light', 'light', 'light', 'light']);
  const [oogLight, setoogLight] = useState(['light', 'light', 'light', 'light']);
  const [stopS, setStopS] = useState(['light', 'light', 'light', 'light']);
  const [flatLight, setFlatLight] = useState(['light', 'light', 'light', 'light']);
  const [limitLight, setLimitLight] = useState(['light', 'light', 'light', 'light']);
  const [emergencyLight, setEmergencyLight] = useState(['light', 'light', 'light', 'light']);
  const [aceLight, setAceLight] = useState(['light', 'light', 'light', 'light']);
  const [truckLight, setTruckLight] = useState(['light', 'light', 'light', 'light']);
  const [punctureLight, setPunctureLight] = useState(['light', 'light', 'light', 'light']);
  const [goLight, setGoLight] = useState(['light', 'light', 'light', 'light']);

  useEffect(()=>{
    function onConnect(){
      setIsConnected(true);
    }

    function handleFull(){
      console.log("The server is currently full");
    }

    function handleSize(size){
      setplayerCount(size);
    }

    socket.on('connect', onConnect);
    socket.on('full', handleFull);
    socket.on('size', handleSize);
    socket.on('new_user', (user)=>{
      setplayerName((name)=>{
        let updatedName = [...name];
        let updatedId;
        let index = -1;
        for(let i = 1; i < name.length; i++){
          if(name[i] === ''){
            index = i;
            break;
          }
        }
        updatedId = [...playerId];
        updatedName[index] = user.name;
        updatedId[index] = user.id;
        setplayerId(updatedId)
        return updatedName;
      })
    });

    socket.on('own_id', (id)=>{
      setplayerId(id);
    })
    socket.on("error", (msg)=>{
      console.log(msg);
    })

    return () =>{
      setIsConnected(false);
      socket.off('connect', onConnect);
      socket.off('full', handleFull);
      socket.off('size', handleSize);
    }
  },[]);

  function nHandleChange(e){
    setplayerName([e.target.value, '', '', '']);
  }

  function nHandleSubmit(e){
    e.preventDefault();
    sethasName(true);
    socket.emit("name", playerName[0]);
  }

  return (
    <div className="body">
      { hasName ? 
      <div>
        <Main 
          playerCount={playerCount} playerName={playerName} playerDistance={playerDistance} playerRScore={playerRScore}
          playerTScore={playerTScore} accident={accident} aLight={aLight} oogLight={oogLight} stopS={stopS}        
          flatLight={flatLight} limitLight={limitLight} emergencyLight={emergencyLight} aceLight={aceLight}
          truckLight={truckLight} punctureLight={punctureLight} goLight={goLight} setplayerDistance={setplayerDistance}
          setplayerRScore={setplayerRScore} setplayerTScore={setplayerTScore} setAccident={setAccident}
          setALight={setALight} setoogLight={setoogLight} setStopS={setStopS} setFlatLight={setFlatLight}
          setLimitLight={setLimitLight} setEmergencyLight={setEmergencyLight} setAceLight={setAceLight} setTruckLight={setTruckLight}
          setPunctureLight={setPunctureLight} setGoLight={setGoLight}
        /></div> : 
      <div><Welcome nHandleChange={nHandleChange} nHandleSubmit={nHandleSubmit} /></div>}
    </div>

  )
}

export default App
