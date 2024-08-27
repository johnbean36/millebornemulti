import '../App.css';
import { useEffect } from 'react';

function Indicator({playerCount, hazard, light}){

    return (
        <div className="indacc">
            <div className="indN">{`${hazard}`}:</div>
            <div className="lights">
                <div className="ind">Player 1</div>
                <div className="plight">
                    <img className="light" id="p1a" src={`../../images/${light[0]}.png`} />
                </div>
            </div>
            <div className="lights">
                <div className="ind">Player 2</div>
                <div className="plight">
                    <img className="light" id="p2a" src={`../../images/${light[1]}.png`} />
                </div>
            </div>
            <div className="lights">
                {playerCount > 2 ? 
                    <div>
                        <div className="ind">Player 3</div>
                    </div>            
                    : <div></div>}
                    {playerCount > 2 ? 
                    <div>
                        <div className="plight">
                            <img className="light" id="p2a" src={`../../images/${light[2]}.png`} />
                        </div>
                    </div>            
                    : <div></div>}
            </div>
            <div className="lights">
                {playerCount > 3 ? 
                    <div className="ind">Player 3</div>
                    : <div></div>}
                {playerCount > 3 ? 
                    <div>
                        <div className="plight">
                            <img className="light" id="p2a" src={`../../images/${light[3]}.png`} />
                        </div>
                    </div>:<div></div>}
            </div>

        </div>
    )
}

export default Indicator;