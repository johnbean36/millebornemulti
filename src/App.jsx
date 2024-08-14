import { useState } from 'react'
import Score from './components/Score';
import Indicator from './components/Indicator';
import io from 'socket.io-client';
const socket = io('localhost:3000');
import './App.css'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasName, sethasName] = useState(false);
  const [playerCount, setplayerCount] = useState(4);
  const [playerName, setplayerName ] = useState(['', '', '', '']);
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

    socket.on('connect', onConnect);
    socket.on('full', handleFull);
  },[]);

  function nHandleChange(e){
    setplayerName([e.target.value(), '', '', '']);
  }

  function nHandleSubmit(e){
    e.preventDefault();
    sethasName(true);
    socket.emit("name", playerName[0]);
  }

  return (
    <div className="body">
      { HasName ? <div></div> : 
      <div>
        <form onSubmit={nHandleSubmit}>
          <label htmlFor="enter">Enter a name to play</label>
          <input type="text" id="enter" />
        </form>
      </div>}
    </div>
  )
}

export default App
