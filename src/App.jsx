import { useState, useEffect, useCallback } from 'react'
import Score from './components/Score';
import Indicator from './components/Indicator';
import io from 'socket.io-client';
const socket = io('localhost:3000');
import './App.css';
import Main from './components/Main';
import Welcome from './components/Welcome';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [hasName, sethasName] = useState(false);
  const [firstEmpty, setfirstEmpty] = useState(1);
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
  const [serverNames, setserverNames] = useState([]);
  const [cardNames] = useState(['25kilo.png', '50kilo.png', '75kilo.png', '100kilo.png', '200k.png', 'accident.png', 'driving_ace.png',
                                 'emergency_vehicle.png', 'end_of_speedlimit.png', 'flattire.png', 'fueltruck.png', 'gasoline.png', 'greenlight.png',
                                 'out_of_gas.png', 'puncture_proof.png', 'repairs.png', 'spare-tire.png', 'speed_limit.png', 'stoplight.png'
                                ]);

  function onConnect(){
    setIsConnected(true);
  }

  function handleFull(){
    console.log("The server is currently full");
  }

  function handleSize(size){
    setplayerCount(size);
  }

  function handleOwnId(id){
    setplayerId((ownid)=>{
      let updatedId = [...ownid];
      updatedId[0] = id;
      return updatedId;
    })
  }

  function handleError(msg){
    console.log(msg);
  }

  function handleSetEmpty(empty){
    setfirstEmpty(empty);
  }

  function handleSetPlayerId(id){
    setplayerId(id);
  }

  const handleNewUser = useCallback((user)=>{
    const playerNames = user.names;
    const playerIds = user.ids;
    let number = playerNames.length;
    let updated;
    let updatedId = [...playerId];
    let empty = 1;
    setfirstEmpty((e)=>{
      empty = e;
      return e;
    });
    setplayerCount(number);
    setplayerName((name)=>{
      updated = [...name];
      for(let x = 0; x < playerNames.length; x++){
        if(name.includes(playerNames[x])){
          continue;
        }
        updated[empty] = playerNames[x];
        updatedId[empty] = playerIds[x];
        empty = empty + 1;
      }
      handleSetEmpty(empty);
      handleSetPlayerId(updatedId);
      return updated;
    })

  },[firstEmpty, playerName, playerId]);

  function handleStart(){
    socket.emit('get_names');
    socket.emit('fdeal');
  }

  function nHandleChange(e){
    setplayerName([e.target.value, '', '', '']);
  }

  function nHandleSubmit(e){
    e.preventDefault();
    sethasName(true);
    socket.emit('name', playerName[0]);
  }

  function handleSNames(names){
    setserverNames(names);
  }

  function handleNewDeck(deck){
    console.log(deck);
  }

  useEffect(()=>{
    socket.on('connect', onConnect);
    socket.on('full', handleFull);
    socket.on('own_id', handleOwnId);
    socket.on('size', handleSize);
    socket.on('error', handleError);
    socket.on('new_user', handleNewUser);
    socket.on('start', handleStart);
    socket.on("snames", handleSNames);
    socket.on('new_deck', handleNewDeck);
    
    return ()=>{
      setIsConnected(false);
      socket.off('connect', onConnect);
      socket.off('size', handleSize);
      socket.off('full', handleFull);
      socket.off("error", handleError);
      socket.off("own_id", handleOwnId);
      socket.off('new_user', handleNewUser);
      socket.off('start', handleStart);
      socket.off('snames', handleSNames);
      socket.off('new_deck', handleNewDeck);
    }
  },[])



  return (
    <div className="body">
      { hasName ? 
      <div>
        <Main 
          playerCount={playerCount}
          playerName={playerName}
          playerDistance={playerDistance}
          playerRScore={playerRScore}
          playerTScore={playerTScore}
          accident={accident}
          aLight={aLight}
          oogLight={oogLight}
          stopS={stopS}        
          flatLight={flatLight}
          limitLight={limitLight}
          emergencyLight={emergencyLight}
          aceLight={aceLight}
          truckLight={truckLight}
          punctureLight={punctureLight}
          goLight={goLight}
          setplayerDistance={setplayerDistance}
          setplayerRScore={setplayerRScore}
          setplayerTScore={setplayerTScore}
          setAccident={setAccident}
          setALight={setALight}
          setoogLight={setoogLight}
          setStopS={setStopS}
          setFlatLight={setFlatLight}
          setLimitLight={setLimitLight}
          setEmergencyLight={setEmergencyLight}
          setAceLight={setAceLight}
          setTruckLight={setTruckLight}
          setPunctureLight={setPunctureLight}
          setGoLight={setGoLight}
          cardNames={cardNames}
        /></div> : 
      <div><Welcome nHandleChange={nHandleChange} nHandleSubmit={nHandleSubmit} /></div>}
    </div>

  )
}

export default App
