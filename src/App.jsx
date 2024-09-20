import { useState, useEffect, useCallback, useRef } from 'react'
import Score from './components/Score';
import Indicator from './components/Indicator';
import io from 'socket.io-client';
const socket = io('localhost:3000');
import './App.css';
import Main from './components/Main';
import Welcome from './components/Welcome';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [turn, setTurn] = useState(false);
  const [hasName, sethasName] = useState(false);
  const [firstEmpty, setfirstEmpty] = useState(1);
  const [playerCount, setplayerCount] = useState(0);
  const [playerName, setplayerName ] = useState(['', '', '', '']);
  const [playerId, setplayerId] = useState(['', '', '', '']);
  const [playerDistance, setplayerDistance] = useState([0, 0, 0, 0]);
  const [playerRScore, setplayerRScore] = useState([0, 0, 0, 0]);
  const [playerTScore, setplayerTScore] = useState([0, 0, 0, 0])
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
  const [cDeck, setCDeck] = useState([]);
  const [serverNames, setserverNames] = useState([]);
  const [error, setError] = useState("");
  const [cardNames] = useState(['25kilo.png', '50kilo.png', '75kilo.png', '100kilo.png', '200k.png', 'accident.png', 'driving_ace.png',
                                 'emergency_vehicle.png', 'end_of_speedlimit.png', 'flattire.png', 'fueltruck.png', 'gasoline.png', 'greenlight.png',
                                 'out_of_gas.png', 'puncture_proof.png', 'repairs.png', 'spare-tire.png', 'speed_limit.png', 'stoplight.png'
                                ]);
  const [deckNames, setDeckNames] = useState([])
  const stateRef = useRef(playerId);
  const goRef = useRef(goLight);
  const distanceRef = useRef(playerDistance);
  const emergencyRef = useRef(emergencyLight);
  const limitRef = useRef(limitLight);
  const accRef = useRef(aLight);
  const oogRef = useRef(oogLight);
  const flatRef = useRef(flatLight);

  useEffect(()=>{
    stateRef.current = playerId;
    goRef.current = goLight;
    distanceRef.current = playerDistance;
    emergencyRef.current = emergencyLight;
    limitRef.current = limitLight
    accRef.current = aLight;
    oogRef.current = oogLight;
    flatRef.current = flatLight;
  },[playerId, goLight, playerDistance, emergencyLight, limitRef, aLight, oogLight, flatLight])

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
    let updatedId;
    updatedId = [...stateRef.current];
    updatedId[0] = id;
    setplayerId(updatedId);
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
    let updatedId = [...stateRef.current];
    let empty = 1;
    setfirstEmpty((e)=>{
      empty = e;
      return e;
    });
    setplayerCount(number);
    if(number === 1){
      return;
    }
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
    socket.emit('fdeal');
  }

  function handleSetTurn(value){
    setTurn(value);
  }

  function convert(index){
    if(index >= 0 && index <= 9){
      return '25';
    }
    else if(index >= 10 && index <= 19){
      return '50';
    }
    else if(index >= 20 && index <= 29){
      return '75';
    }
    else if(index >= 30 && index <= 41){
      return '100';
    }
    else if(index >= 42 && index <= 45){
      return '200';
    }
    else if(index >= 46 && index <= 48){
      return 'accident';
    }
    else if(index >= 49 && index <= 51){
      return 'out of gas';
    }
    else if(index >= 52 && index <= 54){
      return 'flat tire';
    }
    else if(index >= 55 && index <= 59){
      return 'stop light';
    }
    else if(index >= 60 && index <= 63){
      return 'speed limit';
    }
    else if(index >= 64 && index <= 69){
      return 'repairs';
    }
    else if(index >= 70 && index <= 75){
      return 'gasoline';
    }
    else if(index >= 76 && index <= 81){
      return 'spare tire';
    }
    else if(index >= 82 && index <= 95){
      return 'green light';
    }
    else if(index >= 96 && index <= 101){
      return 'end of limit';
    }
    else if(index === 102){
      return 'driving ace';
    }
    else if(index === 103){
      return 'fuel truck';
    }
    else if(index === 104){
      return 'emergency vehicle';
    }
    else if(index === 105){
      return 'puncture proof';
    }
  }

  function checkWin(){
    
  }

  function overDistance(distance, rDistance){
    if(distance + rDistance > 1000){
      setError("Distance cannot exceed 1000km in a round");
      return true;
    }
    else{
      return false;
    }
  }

  function playCard(player, index){
    const card = convert(index);
    const id = [...stateRef.current];
    const emergency = [...emergencyRef.current];
    const win = 0;
    const go = [...goRef.current];
    const flat = [...flatRef.current];
    if(id[0] === player){
      setError("");
      if(index >= 0 && index <= 45){
        if(goRef.current === 'lighton' || emergency[0] === 'lighton'){
          let distance = [...distanceRef.current];
          let limit = [...limitLight.current];
          if(limit[0] === 'lighton' && emergency[0] === 'light'){
            if(card === '25'){
              distance[0] += 25;
            }
            else if(card === '50'){
              distance[0] += 50;
            }
            else if(card === '75' || card === '100' || card === '200'){
              setError("Play an End of Limit or Emergency Vehicle card first");
            }
          }
          else if(limit[0] === 'light'){
            if(card  === '25'){
              distance[0] += 25;
            }
            else if(card === '50'){
              if(!overDistance(50, distance[0])){
                distance[0] += 50;
              }
            }
            else if(card === '75'){
              if(!overDistance(75, distance[0])){
                distance[0] += 75;
              }
            }
            else if(card === '100'){
              if(!overDistance(100, distance[0])){
                distance[0] += 100;
              }
            }
            else if(card === '200'){
              if(!overDistance(200, distance[0])){
                distance[0] += 200;
              }
            }
          }
          setplayerDistance(distance);
          win = checkWin();
          socket.emit("distance", distance);
          if(win > 0){
            // if win is equal to 1 they have won the round, if win is equal to 2 they have won the game
            socket.emit("win", win);
          }
        }
        else{
          setError("Go card not played");
          return;
        }
      }
      else if(card === 'emergency vehicle'){
        setEmergencyLight('lighton');
        socket.emit("safety", "emergency");
      }
      else if(card === 'fuel truck'){
        setTruckLight('lighton');
        socket.emit('safety', "fuel_truck");
      }
      else if(card === 'driving ace'){
        setAceLight('lighton');
        socket.emit('safety', 'dace')
      }
      else if(card === 'puncture proof'){
        setPunctureLight('lighton');
        socket.emit('safety', 'puncture');
      }
      else if(card === 'green light'){
        setGoLight('lighton');
        socket.emit('go');
      }
      else if(card === 'accident' || card === 'flat tire' || card === 'out of gas' || card === 'speed limit' || card === 'stop light'){
        setError("Cannot play this card on yourself");
      }
      else if(card === 'end of limit'){
        if(limitRef.current === 'lighton'){
          setLimitLight('light');
          socket.emit('hazard', {type: "limit end", id: id[0]})
        }
        else{
          setError('No speed limit present');
        }
      }
      else if(card === 'repairs'){
        if(accRef.current === 'lighton'){
          setALight('light');
          socket.emit('hazard', {type: "repairs", id: id[0]});
        }
        else{
          setError("No accident present");
        }
      }
      else if(card === 'spare tire'){
        if(flatRef.current === 'lighton'){
          setFlatLight('light');
          socket.emit('hazard', {type: "spare_tire", id: id[0]});
        }
        else{
          setError("No flat tire present");
        }
      }
      else if(card === 'gasoline'){
        if(oogRef.current === 'lighton'){
          setoogLight('light');
          socket.emit('hazard', {type: "gasoline", id: id[0]});
        }
        else{
          setError("No out of gas present");
        }
      }
      setTurn(false);
    }
    else if(id[1] === player || id[2] === player || id[3] === player){
      const pIndex = id.findIndex((value)=> value === player);
      if(index >= 0 && index <= 45){
        setError("Distance cards cannot be played on other players");
        return;
      }
      else if(card === 'emergency vehicle' || card === 'driving ace' || card === 'puncture proof' || card === 'fuel truck'){
        setError("Safeties cannot be played on other players");
        return
      }
      else if(card === 'repairs' || card === 'gasoline' || card === 'spare tire' || card === 'green light'){
        setError("Go card and remedies cannot be played on other players");
      }
      else if(card === 'stop light'){
        if(go[pIndex] === 'lighton'){
          go[pIndex] = 'light';
          setGoLight(go);
          socket.emit('hazard', {type: 'stop', id: id[pIndex]});
        }
        else{
          setError("Player does not have a go card");
        }
      }
      else if(card === 'flat tire'){
        if(go[pIndex] === 'lighton'){
          
        }
      }
    }
  }

  const handleNewDeck = useCallback((deck)=>{
    const cards = [];
    let cardId = '';
    for( let x = 0; x < 6; x++){
      //25kilo
      cardId = convert(deck[x]);
      if(cardId === '25'){
        cards.push(cardNames[0]);
      } //50kilo
      else if(cardId === '50'){
        cards.push(cardNames[1]);
      }  //75kilo
      else if(cardId === '75'){
        cards.push(cardNames[2]);
      }  //100kilo
      else if(cardId === '100'){
        cards.push(cardNames[3]);
      }  //200kilo
      else if(cardId === '200'){
        cards.push(cardNames[4]);
      } //accident
      else if(cardId === 'accident'){
        cards.push(cardNames[5]);
      }  //out of gas
      else if(cardId === 'out of gas'){
        cards.push(cardNames[13]);
      }  // flat tire
      else if(cardId === 'flat tire'){
        cards.push(cardNames[9]);
      }  //stop light
      else if(cardId === 'stop light'){
        cards.push(cardNames[18])
      }  //speed limit
      else if(cardId === 'speed limit'){
        cards.push(cardNames[17]);
      }  //repairs
      else if(cardId === 'repairs'){
        cards.push(cardNames[15]);
      }  //gasoline
      else if(cardId === 'gasoline'){
        cards.push(cardNames[11]);
      }  //spare tire
      else if(cardId === 'spare tire'){
        cards.push(cardNames[16]);
      }  //green light
      else if(cardId === 'green light'){
        cards.push(cardNames[12]);
      }
      else if(cardId === 'end of limit'){
        cards.push(cardNames[8]);
      }
      else if(cardId === 'driving ace'){
        cards.push(cardNames[6]);
      }
      else if(cardId === 'fuel truck'){
        cards.push(cardNames[10]);
      }
      else if(cardId === 'emergency vehicle'){
        cards.push(cardNames[7]);
      }
      else if(cardId === 'puncture proof'){
        cards.push(cardNames[14]);
      }
    }
    setDeckNames(cards);
    setCDeck(deck);
    let ids = [];
    setplayerId((id)=>{
      ids = [...id]
      return id;
    })
    setserverNames((names)=>{
      if(names[0] === ids[0]){
        handleSetTurn(true);
      }
      return names;
    })
  },[playerId])

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
          deckNames={deckNames}
          cDeck={cDeck}
          turn={turn}
          playCard={playCard}
          setTurn={setTurn}
          playerId={playerId}
          error={error}
        /></div> : 
      <div><Welcome nHandleChange={nHandleChange} nHandleSubmit={nHandleSubmit} /></div>}
    </div>

  )
}

export default App
