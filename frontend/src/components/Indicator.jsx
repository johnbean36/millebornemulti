import '../App.css'

function Indicator({playerCount}){
    return (
        <div>
            <span className="ind" id="haz">Hazards Played</span>  
            <div className="indacc">
                <div className="indN">Accident:</div>
                <div className="ind">Player 1</div>
                <div className="plight">
                    <img className="light" id="p1a" src="../../public/images/light.png" />
                </div>
                <div className="ind">Player 2</div>
                <div className="plight">
                    <img className="light" id="p2a" src="../../public/images/light.png" />
                </div>
                <div className="ind">Player 3</div>
                <div className="plight">
                    <img className="light" id="p2a" src="../../public/images/light.png" />
                </div>
                <div className="ind">Player 3</div>
                <div className="plight">
                    <img className="light" id="p2a" src="../../public/images/light.png" />
                </div>
            </div>
        </div>
    )
}

export default Indicator;