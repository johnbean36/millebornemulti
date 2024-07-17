import { useState } from 'react'
import './App.css'

function App() {
  const [playerCount, setplayerCount] = useState(0);
  const [playerName, setplayerName ] = useState('');
  const [player2Name, setplayer2Name] = useState('');
  const [player3Name, setplayer3Name] = useState('');
  const [player4Name, setplayer4Name] = useState('');

  return (
    <div className="body">
    <header>
        <h1>A Twist on the Classic Mille Bornes Game</h1>
        <a href="rules.html">Rules of the Road</a>
        <button type="button" id="bu">Play another game</button>
    </header>
      <main>
        <section id="a">
        <div className="score" id="p1d">
            <span>Player {`${playerName}`} Distance:</span>
            <div className="row2" id="p1rd"></div>
        </div>
        { playerCount > 1 ? <div className="score" id="p2d">
            <span>Player 2 Distance:</span>
            <div className="row2" id="p2rd"></div>
          </div>:<div></div>}
        { playerCount > 2 ? <div className="score" id="p3d">
            <span>Player 2 Distance:</span>
            <div class="row2" id="p3rd"></div>
          </div>:<div></div>}
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
