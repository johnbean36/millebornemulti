import '../App.css';

function Distance({playerName, distance, rscore, tscore}){
    return (
        <div className="player">
            { `Player ${playerName}`}
            <div className="score">
                <span>Distance:</span>
                <div className="row2">{`${distance}`}</div>
            </div>
            <div className="score">
                <span>Round Score: </span>
                <div className="row2">{`${rscore}`}</div>
            </div>
            <div className="score">
                <span>Total Score: </span>
                <div className="row2">
                    <div>
                        {`${tscore}`}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Distance;