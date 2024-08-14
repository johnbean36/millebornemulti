function Main(){
    return (
        <div>
            <header>
            <h1>Mille Bornes</h1>
            <button type="button" id="bu">Play another game</button>
        </header>
        <main>
            <section id="a">
            <div id="board">
                <Score player={playerName[0]} distance={playerDistance[0]} rscore={playerRScore[0]} tscore={playerTScore[0]} />
                { playerCount > 2 ? 
                <Score player={playerName[1]} distance={playerDistance[1]} rscore={playerRScore[1]} tscore={playerTScore[1]} />
                :<div></div>}
                <Score player={playerName[2]} distance={playerDistance[2]} rscore={playerRScore[2]} tscore={playerTScore[2]} />
                { playerCount > 3 ? 
                <Score player={playerName[3]} distance={playerDistance[3]} rscore={playerRScore[3]} tscore={playerTScore[3]} />
            :<div></div>}
            </div>
            </section>
            <section id="b">

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