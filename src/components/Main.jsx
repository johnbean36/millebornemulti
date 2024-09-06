import '../App.css';
import Score from './Score';
import Indicator from './Indicator';
import Card from './Card';
import Play from './Play';

function Main({deckNames, playerName, playerDistance, playerRScore, playerTScore, playerCount, aLight, oogLight, stopS, flatLight, limitLight, emergencyLight, aceLight, truckLight, punctureLight, goLight, cDeck}){
    return (
        <div id="main">
            <header>
            <h1>Kilometre Coupe</h1>
        </header>
        <main>
            <section id="a">
            <div id="board">
                <Score playerName={playerName[0]} distance={playerDistance[0]} rscore={playerRScore[0]} tscore={playerTScore[0]} />
                { playerCount > 1 ? 
                <Score playerName={playerName[1]} distance={playerDistance[1]} rscore={playerRScore[1]} tscore={playerTScore[1]} />
                :<div></div>}
                { playerCount > 2 ? 
                <Score playerName={playerName[2]} distance={playerDistance[2]} rscore={playerRScore[2]} tscore={playerTScore[2]} />
                :<div></div>}
                { playerCount > 3 ? 
                <Score playerName={playerName[3]} distance={playerDistance[3]} rscore={playerRScore[3]} tscore={playerTScore[3]} />
            :<div></div>}
            </div>
            </section>
            <section id="b">
                    <Play player={playerName[0]} />
                    <Play player={playerName[1]} />
                    <Play player={playerName[2]} />
                    <Play player={playerName[3]} />
            </section>
            <section id="c">
            <div className="indicators">
                <span className="ind">Hazards Played</span>
                <Indicator playerCount={playerCount} hazard={"Accident"} light={aLight}/>
                <Indicator playerCount={playerCount} hazard={"Out of Gas"} light={oogLight} />
                <Indicator playerCount={playerCount} hazard={"Stop"} light={stopS} />
                <Indicator playerCount={playerCount} hazard={"Flat Tire"} light={flatLight} />
                <Indicator playerCount={playerCount} hazard={"Speed Limit"} light={limitLight} />
                <span className="ind">Safeties Played</span>
                <Indicator playerCount={playerCount} hazard={"Emergency Vehicle"} light={emergencyLight} />
                <Indicator playerCount={playerCount} hazard={"Driving Ace"} light={aceLight} />
                <Indicator playerCount={playerCount} hazard={"Fuel Truck"} light={truckLight} />
                <Indicator playerCount={playerCount} hazard={"Fuel Truck"} light={punctureLight} />
                <div id="go">
                <Indicator playerCount={playerCount} hazard={"Go Card Played"} light={goLight} />
                </div>
            </div>
            </section>

        </main>
        <footer>
            <section className="hand" id="hand">
                <div id="card1"><Card deckName={deckNames[0]} cDeck={cDeck[0]} /></div>
                <div id="card2"><Card deckName={deckNames[1]} cDeck={cDeck[1]} /></div>
                <div id="card3"><Card deckName={deckNames[2]} cDeck={cDeck[2]} /></div>
                <div id="card4"><Card deckName={deckNames[3]} cDeck={cDeck[3]} /></div>
                <div id="card5"><Card deckName={deckNames[4]} cDeck={cDeck[4]} /></div>
                <div id="card6"><Card deckName={deckNames[5]} cDeck={cDeck[5]} /></div>
            </section>
            <section id="buttonS">
            </section>
        </footer>
    </div>
    )
}

export default Main;