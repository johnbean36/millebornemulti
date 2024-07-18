import { useState } from 'react'
import Score from './components/Score';
import './App.css'

function App() {
  const [playerCount, setplayerCount] = useState(4);
  const [playerName, setplayerName ] = useState(['', '', '', '']);
  const [playerDistance, setplayerDistance] = useState([0, 0, 0, 0]);
  const [playerRScore, setplayerRScore] = useState([0, 0, 0, 0]);
  const [playerTScore, setplayerTScore] = useState([0, 0, 0, 0])


  return (
    <div className="body">
    <header>
        <h1>A Twist on the Classic Mille Bornes Game</h1>
        <a href="rules.html">Rules of the Road</a>
        <button type="button" id="bu">Play another game</button>
    </header>
      <main>
        <section id="a">
          <div id="board">
            <Score player={playerName[0]} distance={playerDistance[0]} rscore={playerRScore[0]} tscore={playerTScore[0]} />
            { playerCount > 1 ? 
              <Score player={playerName[1]} distance={playerDistance[1]} rscore={playerRScore[1]} tscore={playerTScore[1]} />
            :<div></div>}
            { playerCount > 2 ? 
              <Score player={playerName[2]} distance={playerDistance[2]} rscore={playerRScore[2]} tscore={playerTScore[2]} />
            :<div></div>}
            { playerCount > 3 ? 
              <Score player={playerName[3]} distance={playerDistance[3]} rscore={playerRScore[3]} tscore={playerTScore[3]} />
          :<div></div>}
          </div>
        </section>
        <section id="b">

        </section>
        <section id="c">
          
        </section>

      </main>
      <footer>
        <section className="hand" id="hand">
            <div id="card1"></div>
            <div id="card2"></div>
            <div id="card3"></div>
            <div id="card4"></div>
            <div id="card5"></div>
            <div id="card6"></div>
        </section>
        <section id="buttonS">
        </section>
    </footer>
    </div>
  )
}

export default App
